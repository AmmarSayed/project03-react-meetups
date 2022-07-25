import React from "react";

const MyParagraph = (props) => {
  console.log("demo paragraph");
  return <p>{props.children}</p>;
};

export default MyParagraph;
