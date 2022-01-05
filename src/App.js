import React, { useState, useEffect } from "react";

import Category from "./Category";

function App() {
  const [collectData, setCollectData] = useState(false);
  const [totalData, setTotalData] = useState(null);
  const [deleteChildren, setDeleteChildren] = useState(false);

  useEffect(() => {
    if (totalData) {
      fetch(
        "https://category-tree-7bd78-default-rtdb.firebaseio.com/categories.json",
        {
          method: "POST",
          body: JSON.stringify(totalData),
        }
      )
        .then(() => {
          console.log("posted");
          setCollectData(false);
          setDeleteChildren(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [totalData]);

  const uploadTree = (data) => {
    setTotalData(data);
  };

  return (
    <div className="App">
      <Category
        data={{ name: "Categories", id: "level_0", children: [] }}
        isRoot
        collectData={collectData}
        uploadTree={uploadTree}
        deleteChildren={deleteChildren}
      />
      <button onClick={() => setCollectData(true)}>Upload tree</button>
    </div>
  );
}

export default App;
