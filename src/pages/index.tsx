import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const posts = trpc.useQuery(["posts"]);
  const createPost = trpc.useMutation(["createPost"]);
  const client = trpc.useContext();
  console.log(posts);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const post = await createPost.mutate({ title, content });
    client.invalidateQueries(["posts"]);
  };

  if (!posts.data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="text-2xl">Posts: </div>
      {posts.data.map((post) => (
        <div key={post.id}>
          <div className="text-xl">{post.title}</div>
          <div className="text-sm">{post.content}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="text" name="content" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
