import React, { useState, useEffect } from "react";

import Category from "./Category";

function App() {
  const [collectData, setCollectData] = useState(false);
  const [totalData, setTotalData] = useState(null);
  const [deleteChildren, setDeleteChildren] = useState(false);
  const [dataToRender, setDataToRender] = useState({
    name: "Categories",
    id: "level_0",
    children: [],
  });

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

  async function downloadTree() {
    setDeleteChildren(false);
    const response = await fetch(
      "https://category-tree-7bd78-default-rtdb.firebaseio.com/categories.json"
    );
    const fetchedData = await response.json();
    
    for (let tree in fetchedData) {
      setDataToRender({
        ...fetchedData[tree],
      });
    }
  }

  return (
    <div className="App">
      <Category
        data={dataToRender}
        isRoot
        collectData={collectData}
        uploadTree={uploadTree}
        deleteChildren={deleteChildren}
      />
      <button onClick={() => setCollectData(true)}>Upload tree</button>
      <button onClick={downloadTree}>Download tree</button>
    </div>
  );
}

export default App;
