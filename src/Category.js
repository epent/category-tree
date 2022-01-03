import React, { useState } from "react";

const Category = (props) => {
  const categoryValue = props.data.value;
  const hasChildren = props.data.children;
  let childrenData;

  if (hasChildren) {
    childrenData = props.data.children.map((child) => {
      return (
        <ul>
          <Category data={child} />
        </ul>
      );
    });
  }

  return (
    <div>
      <li>
        <p>{categoryValue}</p>
        {childrenData}
      </li>
    </div>
  );
};

export default Category;
