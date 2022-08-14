import Link from "next/link";
const news = () => {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="/news/next-js-is-great">NextJS is a great Framework</Link>{" "}
        </li>
        <li>
          <Link href="/news/something-else">Somthing else</Link>
        </li>
      </ul>
    </>
  );
};

export default news;
