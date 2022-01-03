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

  const [changeName, setChangeName] = useState(false);

  const hasChildren = category.children.length > 0;
  let subCategories;

  if (hasChildren) {
    subCategories = category.children.map((child) => {
      return (
        <li key={child.id}>
          <Category data={child} deleteChild={deleteChild} />
        </li>
      );
    });
  }

  const updateValueHandler = (event) => {
    setCategory({
      ...category,
      value: event.target.value,
    });
  };

  const updateSubValueHandler = (event) => {
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
      {!props.isRoot && (
        <button onClick={() => props.deleteChild(category.id)}>Delete</button>
      )}
      {changeName ? (
        <form onSubmit={() => setChangeName((prevState) => !prevState)}>
          <input
            type="text"
            value={category.value}
            onChange={updateValueHandler}
          />
        </form>
      ) : (
        <p onClick={() => setChangeName((prevState) => !prevState)}>
          {category.value}
        </p>
      )}
      <input
        type="text"
        value={subCategory.value}
        onChange={updateSubValueHandler}
      />
      <button onClick={addSubCategoryHandler}>+ subcategory</button>
      <ul>{subCategories}</ul>
    </div>
  );
};

export default Category;
