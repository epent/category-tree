import React from "react";

import Category from "./Category";

function App() {
  const data = {
    value: "Cat 1",
    children: [
      {
        value: "Cat 1-1",
        children: [],
      },
      {
        value: "Cat 1-2",
        children: [
          {
            value: "Cat 1-2-1",
            children: [],
          },
        ],
      },
    ],
  };
  return (
    <div className="App">
      <ul>
        <Category data={data} />
      </ul>
    </div>
  );
}

export default App;
