import React from "react";

import Category from "./Category";

function App() {
  const data = [
    {
      value: "Cat 1",
      id: "Cat 1",
      children: [
        {
          value: "Cat 1-1",
          id: "Cat 1-1",
          children: [],
        },
        {
          value: "Cat 1-2",
          id: "Cat 1-2",
          children: [
            {
              value: "Cat 1-2-1",
              id: "Cat 1-2-1",
              children: [],
            },
          ],
        },
      ],
    },
    {
      value: "Cat 2",
      id: "Cat 2",
      children: [
        {
          value: "Cat 2-1",
          id: "Cat 2-1",
          children: [],
        },
      ],
    },
  ];

  const rootCategories = data.map((rootCategory) => {
    return (
      <li key={rootCategory.id}>
        <Category data={rootCategory} />
      </li>
    );
  });

  return (
    <div className="App">
      <ul>{rootCategories}</ul>
    </div>
  );
}

export default App;
