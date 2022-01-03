import React, { useState } from "react";

import Category from "./Category";

function App() {
  const [data, setData] = useState([]);

  const [category, setCategory] = useState({
    value: "",
    id: "",
    children: [],
  });

  const updateValueHandler = (event) => {
    setCategory({
      value: event.target.value,
      id: event.target.value,
      children: [],
    });
  };

  const addCategoryHandler = () => {
    setData([...data, { ...category }]);

    setCategory({
      value: "",
      id: "",
      children: [],
    });
  };

  const deleteCategoryHandler = (categoryId) => {
    const updatedData = data.filter((category) => {
      return category.id !== categoryId;
    });

    setData([...updatedData]);
  };

  const rootCategories = data.map((rootCategory) => {
    return (
      <li key={rootCategory.id}>
        <Category data={rootCategory} deleteSelf={deleteCategoryHandler} />
      </li>
    );
  });

  return (
    <div className="App">
      <input type="text" value={category.value} onChange={updateValueHandler} />
      <button onClick={addCategoryHandler}>Add new category</button>
      <ul>{rootCategories}</ul>
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
