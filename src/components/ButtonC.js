import React from "react";

import Button from "antd/es/button";
import { useDispatch } from "react-redux";
import { addDraggingItem } from "../actions/draggingActions";

const ButtonC = ({ listItem, onDragEnd, ...props }) => {
  const dispatch = useDispatch();

  const onDragStart = (e) => {
    dispatch(addDraggingItem(listItem));
  };

  return (
    <Button
      type="primary"
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="draggable"
      id={listItem.id}
      {...props}
    >
      {listItem.text}
    </Button>
  );
};

export default ButtonC;
