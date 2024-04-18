// import { PrismaClient } from "@repo/db/client";

import UseBalance from "./useBalance";

// const client = new PrismaClient();

export default function Page(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <UseBalance />
    </>
  );
}
