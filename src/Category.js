import React, { useState } from "react";

const Category = (props) => {
  const categoryValue = props.data.value;
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
      <p>{categoryValue}</p>
      <ul>{childrenData}</ul>
    </div>
  );
};

export default Category;
