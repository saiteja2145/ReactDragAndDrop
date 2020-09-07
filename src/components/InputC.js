import React from "react";
import { useDispatch } from "react-redux";
import { addDraggingItem } from "../actions/draggingActions";

const InputC = ({ listItem, onDragEnd, ...props }) => {
  const dispatch = useDispatch();

  const onDragStart = () => {
    dispatch(addDraggingItem(listItem));
  };

  return (
    <input
      type="text"
      placeholder="Enter Text"
      value={listItem.text}
      id={listItem.id}
      className="input__field draggable"
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      {...props}
    />
  );
};

export default InputC;
