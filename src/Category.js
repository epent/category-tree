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

  const hasChildren = category.children.length > 0;
  let childrenData;

  if (hasChildren) {
    childrenData = category.children.map((child) => {
      return (
        <li key={child.id}>
          <Category data={child} deleteChild={deleteChild} />
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

  function deleteChild(childId) {
    const children = [...category.children];
    const updatedChildren = children.filter((child) => {
      return child.id !== childId;
    });

    setCategory({
      ...category,
      children: [...updatedChildren],
    });
  }

  return (
    <div>
      <button onClick={() => props.deleteChild(category.id)}>Delete</button>
      <p>{category.value}</p>
      <input
        type="text"
        value={subCategory.value}
        onChange={updateValueHandler}
      />
      <button onClick={addSubCategoryHandler}>+ subcategory</button>
      <ul>{childrenData}</ul>
    </div>
  );
};

export default Category;
