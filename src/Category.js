import React, { useState, useRef, useEffect } from "react";

const Category = (props) => {
  // state related to category (myself)
  const [category, setCategory] = useState({
    name: props.data.name,
    id: props.data.id,
    children: props.data.children,
  });

  const [changeCategoryName, setChangeCategoryName] = useState(false);

  const [showChildren, setShowChildren] = useState(false);

  const [showInputField, setShowInputField] = useState(false);

  // focus input on showing input field
  const inputElement = useRef();
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    if (focusInput) {
      inputElement.current.focus();
    }
  }, [focusInput]);

  //state related to subcategory (my child)
  const [subCategory, setSubCategory] = useState({
    name: "",
    id: "",
    children: [],
  });

  const [count, setCount] = useState(1);

  // render subcategories (my children) recursively
  const hasChildren = category.children.length > 0;
  let subCategories;

  if (hasChildren) {
    subCategories = category.children.map((child) => {
      return (
        <div key={child.id} style={!showChildren ? { display: "none" } : null}>
          <li>
            <Category
              data={child}
              deleteChild={deleteChild}
              updateChildName={updateChildName}
              collectData={props.collectData}
              passData={passData}
            />
          </li>
        </div>
      );
    });
  }

  //collect data for the final object
  const [meAndChildren, setMeAndChildren] = useState({
    name: category.name,
    id: category.id,
    children: [],
  });

  function passData(childData) {
    const updatedChildren = [...meAndChildren.children];

    const alreadyExists = updatedChildren.find((child) => {
      return child.id === childData.id;
    });

    if (!alreadyExists) {
      updatedChildren.push(childData);
      updatedChildren.sort((a, b) => {
        const lastdigitA = a.id.split("").pop();
        const lastdigitB = b.id.split("").pop();
        return lastdigitA - lastdigitB;
      });

      setMeAndChildren({
        ...meAndChildren,
        children: updatedChildren,
      });
    }
  }

  if (props.collectData) {
    if (!hasChildren) {
      props.passData(category);
    }

    if (
      hasChildren &&
      meAndChildren.children.length === category.children.length
    ) {
      if (props.isRoot) {
        console.log("uploadTree");
        props.uploadTree(meAndChildren);
      } else {
        props.passData(meAndChildren);
      }
    }
  }

  //actions related to category (myself)
  const updateCategoryName = (event) => {
    setCategory({
      ...category,
      name: event.target.value,
    });
  };

  //actions related to subcategory (my child)
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

  // constants used in return statement
  const showChildrenButton = (
    <button onClick={() => setShowChildren((prevState) => !prevState)}>
      {showChildren ? "-" : "+"}
    </button>
  );

  let categoryName;
  changeCategoryName && !props.isRoot
    ? (categoryName = (
        <input
          type="text"
          value={category.name}
          onChange={updateCategoryName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setChangeCategoryName((prevState) => !prevState);
              props.updateChildName(category);
            }
          }}
        />
      ))
    : (categoryName = (
        <span onClick={() => setChangeCategoryName((prevState) => !prevState)}>
          {category.name}
        </span>
      ));

  const inputField = (
    <input
      ref={inputElement}
      type="text"
      value={subCategory.name}
      onChange={createSubCategoryName}
      onKeyDown={(e) => {
        e.key === "Enter" && createSubCategory();
      }}
    />
  );

  const inputFieldButton = (
    <button
      onClick={() => {
        setShowInputField((prevState) => !prevState);
        setFocusInput((prevState) => !prevState);
      }}
    >
      + subcategory
    </button>
  );

  return (
    <div>
      {hasChildren && showChildrenButton}
      {categoryName}
      {showInputField && inputField}
      {inputFieldButton}
      {!props.isRoot && (
        <button onClick={() => props.deleteChild(category.id)}>Delete</button>
      )}
      <ul style={{ listStyle: "none" }}>{subCategories}</ul>
    </div>
  );
};

export default Category;
