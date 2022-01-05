import React, { useState, useEffect } from "react";

import Category from "./Category";

function MyTrees() {
  const [categoryTrees, setCategoryTrees] = useState([]);

  useEffect(() => {
    async function downloadTrees() {
      const response = await fetch(
        "https://category-tree-7bd78-default-rtdb.firebaseio.com/categories.json"
      );
      const fetchedData = await response.json();

      const dataToRender = [];

      Object.keys(fetchedData).map((key) => {
        return dataToRender.push({
          tree: fetchedData[key],
          treeId: key,
        });
      });

      setCategoryTrees([...dataToRender]);
    }
    downloadTrees();
  }, []);

  let trees;
  if (categoryTrees.length > 0) {
    trees = categoryTrees.map((tree) => {
      return (
        <div key={tree.treeId}>
          <Category data={tree.tree} isRoot />
        </div>
      );
    });
  } else {
    trees = "You have no saved trees yet";
  }

  return <div>{trees}</div>;
}

export default MyTrees;
