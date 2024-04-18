import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Page(): JSX.Element {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
