import React, { useState } from "react";

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

// {
//   value: "Cat 1",
//   id: "Cat 1",
//   children: [
//     {
//       value: "Cat 1-1",
//       id: "Cat 1-1",
//       children: [],
//     },
//     {
//       value: "Cat 1-2",
//       id: "Cat 1-2",
//       children: [
//         {
//           value: "Cat 1-2-1",
//           id: "Cat 1-2-1",
//           children: [],
//         },
//       ],
//     },
//   ],
// },
// {
//   value: "Cat 2",
//   id: "Cat 2",
//   children: [
//     {
//       value: "Cat 2-1",
//       id: "Cat 2-1",
//       children: [],
//     },
//   ],
// },
