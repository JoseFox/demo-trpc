import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "world" }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return <div className="text-2xl">{hello.data.greeting}</div>;
};

export default Home;
