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

  const [count, setCount] = useState(1);

  const [changeName, setChangeName] = useState(false);

  const [showSubcategoryInput, setShowSubcategoryInput] = useState(false);

  const [showChildren, setShowChildren] = useState(false);

  const hasChildren = category.children.length > 0;
  let subCategories;

  if (hasChildren) {
    subCategories = category.children.map((child) => {
      return (
        showChildren && (
          <li key={child.id}>
            <Category data={child} deleteChild={deleteChild} />
          </li>
        )
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
    const parentLevel = category.id.split("_")[1];
    const myLevel = Number(parentLevel) + 1;

    setSubCategory({
      ...subCategory,
      value: event.target.value,
      id: `level_${myLevel}_${count}`,
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

    setShowChildren(true);

    setCount((prevState) => {
      return prevState + 1;
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

  const showSubCategories = () => {
    setShowChildren((prevState) => !prevState);
  };

  const showSubCategoriesButton = (
    <button onClick={showSubCategories}>{showChildren ? "-" : "+"}</button>
  );

  return (
    <div>
      {!props.isRoot && (
        <button onClick={() => props.deleteChild(category.id)}>Delete</button>
      )}
      {changeName ? (
        <input
          type="text"
          value={category.value}
          onChange={updateValueHandler}
          onKeyDown={(e) => {
            e.key === "Enter" && setChangeName((prevState) => !prevState);
          }}
        />
      ) : (
        <div>
          {hasChildren && showSubCategoriesButton}
          <span onClick={() => setChangeName((prevState) => !prevState)}>
            {category.value}
          </span>
        </div>
      )}
      {showSubcategoryInput && (
        <input
          type="text"
          value={subCategory.value}
          onChange={updateSubValueHandler}
          onKeyDown={(e) => {
            e.key === "Enter" && addSubCategoryHandler();
          }}
        />
      )}
      <button
        onClick={() => setShowSubcategoryInput((prevState) => !prevState)}
      >
        + subcategory
      </button>
      <ul>{subCategories}</ul>
    </div>
  );
};

export default Category;
