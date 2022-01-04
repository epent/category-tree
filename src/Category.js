import React, { useState } from "react";

const Category = (props) => {
  const [category, setCategory] = useState({
    name: props.data.name,
    id: props.data.id,
    children: [],
  });

  const [subCategory, setSubCategory] = useState({
    name: "",
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
            <Category
              data={child}
              deleteChild={deleteChild}
              updateChildName={updateChildName}
            />
          </li>
        )
      );
    });
  }

  const createSubCategoryName = (event) => {
    const parentLevel = category.id.split("_")[1];
    const myLevel = Number(parentLevel) + 1;

    setSubCategory({
      ...subCategory,
      name: event.target.value,
      id: `level_${myLevel}_${count}`,
    });
  };

  const createSubCategory = () => {
    setCategory({
      ...category,
      children: [...category.children, { ...subCategory }],
    });

    setSubCategory({
      name: "",
      id: "",
      children: [],
    });

    setShowChildren(true);

    setCount((prevState) => {
      return prevState + 1;
    });
  };

  const updateCategoryName = (event) => {
    setCategory({
      ...category,
      name: event.target.value,
    });
  };

  function updateChildName(childCategory) {
    const childrenList = [...category.children];
    const childIndex = childrenList.findIndex((child) => {
      return child.id === childCategory.id;
    });
    childrenList[childIndex] = childCategory;

    setCategory({
      ...category,
      children: [...childrenList],
    });
  }

  function deleteChild(childId) {
    const childrenList = [...category.children];
    const updatedChildren = childrenList.filter((child) => {
      return child.id !== childId;
    });

    setCategory({
      ...category,
      children: [...updatedChildren],
    });
  }

  const subCategoriesButton = (
    <button onClick={() => setShowChildren((prevState) => !prevState)}>
      {showChildren ? "-" : "+"}
    </button>
  );

  return (
    <div>
      {hasChildren && subCategoriesButton}
      {changeName ? (
        <input
          type="text"
          value={category.name}
          onChange={updateCategoryName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setChangeName((prevState) => !prevState);
              props.updateChildName(category);
            }
          }}
        />
      ) : (
        <span onClick={() => setChangeName((prevState) => !prevState)}>
          {category.name}
        </span>
      )}
      {showSubcategoryInput && (
        <input
          type="text"
          value={subCategory.name}
          onChange={createSubCategoryName}
          onKeyDown={(e) => {
            e.key === "Enter" && createSubCategory();
          }}
        />
      )}
      <button
        onClick={() => setShowSubcategoryInput((prevState) => !prevState)}
      >
        + subcategory
      </button>
      {!props.isRoot && (
        <button onClick={() => props.deleteChild(category.id)}>Delete</button>
      )}
      <ul>{subCategories}</ul>
    </div>
  );
};

export default Category;
