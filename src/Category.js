import React, { useState } from "react";

const Category = (props) => {
  const [category, setCategory] = useState({
    value: props.data.value,
    id: props.data.id,
    children: [],
  });

  const hasChildren = props.data.children;
  let childrenData;

  if (hasChildren) {
    childrenData = props.data.children.map((child) => {
      return (
        <li key={child.id}>
          <Category data={child} />
        </li>
      );
    });
  }

  return (
    <div>
      <p>{category.value}</p>
      <ul>{childrenData}</ul>
    </div>
  );
};

export default Category;
