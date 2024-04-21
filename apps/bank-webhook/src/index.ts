import express from "express"
import db from "@repo/db/client"

const app = express();

app.use(express.json())


//Bank will let know BE that money was transfered
//tod check zod and if req coming from hdfc server or not
// Check if this onRampTxn is processing or not
app.post("/hdfcWebhook", async (req,res)=>{

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token || "",
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([db.balance.updateMany({
            where : {
                userId: Number(paymentInformation.userId)
            },
            data: {
                amount : {
                    //you can also get this from your DB
                    increment: Number(paymentInformation.amount)
                }
            }
        }),
        db.onRampTransaction.updateMany({
            where : {
                token: paymentInformation.token
            },
            data : {
                status: "Success"
            }
        })
    ])

    res.json({
        message: "Captured"
    })
        
    } catch (e) {
        console.log(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
        
    }
})

app.listen(3003,()=>{console.log("Express working on 3003")});

// need change in schema balances and onRampTransactions