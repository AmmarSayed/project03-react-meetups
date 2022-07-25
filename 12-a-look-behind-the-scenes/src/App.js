import React, { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/demo/DemoOutput";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("App Running");

  const toggleParagraph = useCallback(
    () => setShowParagraph((prev) => !prev),
    []
  );

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <Button onClick={toggleParagraph}>Toggle Paragraph</Button>
      <DemoOutput show={false} />
    </div>
  );
}

export default App;
