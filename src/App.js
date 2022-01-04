import React, { useState } from "react";

import Category from "./Category";

function App() {
  const [collectData, setCollectData] = useState(false);

  const uploadTree = (data) => {
    console.log(data);
    setCollectData(false);

    fetch(
      "https://category-tree-7bd78-default-rtdb.firebaseio.com/categories.json",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then(() => {
      console.log("posted");
    });
  };
  return (
    <div className="App">
      <Category
        data={{ name: "Categories", id: "level_0", children: [] }}
        isRoot
        collectData={collectData}
        uploadTree={uploadTree}
      />
      <button onClick={() => setCollectData(true)}>Save category tree</button>
    </div>
  );
}

export default App;
