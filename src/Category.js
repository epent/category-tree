import React, { useState } from "react";

const Category = (props) => {
  const [category, setCategory] = useState({
    value: props.data.value,
    id: props.data.id,
    children: [],
  });

  const [subCategory, setSubCategory] = useState({
    value: "",
    id: "",
    children: [],
  });

  const hasChildren = category.children;
  let childrenData;

  if (hasChildren) {
    childrenData = category.children.map((child) => {
      return (
        <li key={child.id}>
          <Category data={child} />
        </li>
      );
    });
  }

  const updateValueHandler = (event) => {
    setSubCategory({
      value: event.target.value,
      id: event.target.value,
      children: [],
    });
  };

  const addSubCategoryHandler = () => {
    setCategory({
      ...category,
      children: [...category.children, { ...subCategory }],
    });

    setSubCategory({
      value: "",
      id: "",
      children: [],
    });
  };

  return (
    <div>
      <p>{category.value}</p>
      <input type="text" value={subCategory.value} onChange={updateValueHandler} />
      <button onClick={addSubCategoryHandler}>+ subcategory</button>
      <ul>{childrenData}</ul>
    </div>
  );
};

export default Category;
