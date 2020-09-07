import React from "react";
import { useDispatch } from "react-redux";
import { addDraggingItem } from "../actions/draggingActions";

const TextC = ({ listItem, onDragEnd, ...props }) => {
  const dispatch = useDispatch();

  const onDragStart = () => {
    dispatch(addDraggingItem(listItem));
  };

  return (
    <h4
      id={listItem.id}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="draggable"
      {...props}
    >
      {listItem.text}
    </h4>
  );
};

export default TextC;
