import React, { useRef, useEffect } from "react";
import { BUTTON, TEXT } from "../constants";

import ButtonC from "./ButtonC";
import TextC from "./TextC";
import InputC from "./InputC";
import { removeDraggingItem } from "../actions/draggingActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addListItem,
  updateListFromStorage,
  updateClientYForAbs,
} from "../actions/dropActions";

const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll(".draggable")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

const RightComponents = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.items);
  const draggingItem = useSelector((state) => state.draggingItem);
  const continerRef = useRef();

  const onDragOver = (e) => {
    e.preventDefault();
    let nextEl = getDragAfterElement(continerRef.current, e.clientY);
    let nextIndex;
    if (nextEl) {
      nextIndex = list.findIndex((listI) => listI.id === nextEl.id);
    } else {
      nextIndex = list.length;
    }
    dispatch(addListItem({ ...draggingItem }, nextIndex));
  };

  const onDrop = (e) => {
    if (draggingItem.pos === "absolute") {
      dispatch(updateClientYForAbs(draggingItem, e.clientY));
    }
    dispatch(removeDraggingItem());
  };

  useEffect(() => {
    let newList = localStorage.getItem("list");
    if (newList) {
      dispatch(updateListFromStorage(JSON.parse(newList)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div
      className="right__container"
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={continerRef}
    >
      <div className="list__container">
        <h2 className="heading">Drag And Drop</h2>

        {list.map((listItem) => {
          let style = {};
          if (listItem.pos === "absolute") {
            style = {
              position: listItem.pos,
              top: `${listItem.top - 50}px`,
              zIndex: 1,
            };
          }
          if (listItem.modalType === BUTTON) {
            return (
              <ButtonC
                key={listItem.id}
                listItem={listItem}
                onDragOver={onDragOver}
                style={style}
              />
            );
          } else if (listItem.modalType === TEXT) {
            return (
              <TextC key={listItem.id} listItem={listItem} style={style} />
            );
          }

          return (
            <InputC
              key={listItem.id}
              listItem={listItem}
              className={listItem.pos === "absolute" ? "itemAbs" : ""}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RightComponents;
