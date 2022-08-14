import { useRouter } from "next/router";

const somethingImportant = () => {
  const router = useRouter();
  console.log(router.query.newsId);

  return <h1>Detailed Page</h1>;
};

export default somethingImportant;
