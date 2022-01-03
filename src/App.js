import React from "react";

import Category from "./Category";

function App() {
  return (
    <div className="App">
      <Category
        data={{ value: "Categories", id: "Categories", children: [] }}
        isRoot
      />
    </div>
  );
}

export default App;
