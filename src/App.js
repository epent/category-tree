import React, { useState, useEffect } from "react";

import Category from "./Category";

function App() {
  const [collectData, setCollectData] = useState(false);
  const [totalData, setTotalData] = useState({});

  useEffect(() => {
    fetch(
      "https://category-tree-7bd78-default-rtdb.firebaseio.com/categories.json",
      {
        method: "POST",
        body: JSON.stringify(totalData),
      }
    )
      .then(() => {
        console.log("posted");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [totalData]);

  const uploadTree = (data) => {
    setCollectData(false);
    setTotalData(data);
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
