import React, { memo } from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("demo output");
  return <MyParagraph>{props.show ? "This is New!" : ""}</MyParagraph>;
};

export default memo(DemoOutput);
