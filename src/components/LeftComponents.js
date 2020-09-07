import React, { useState } from "react";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import { BUTTON, TEXT, CREATETYPES } from "../constants";
import { v4 } from "uuid";
import ButtonC from "./ButtonC";
import TextC from "./TextC";
import InputC from "./InputC";
import ModalBody from "./ModalBody";

const LeftComponents = () => {
  const [showModal, setshowModal] = useState(false);
  const [modalType, setModalType] = useState(BUTTON);
  const [list, setList] = useState([]);
  const [text, settext] = useState("TEXT");
  const [pos, setPos] = useState("static");

  const createComponent = (type) => {
    setModalType(type);
    setshowModal(true);
  };

  const clearData = () => {
    settext("TEXT");
    setPos("static");
    setshowModal(false);
  };

  const handleOk = () => {
    const newData = {
      id: v4(),
      modalType,
      text,
      pos,
      index: list.length,
    };
    if (pos === "absolute") {
      newData.top = 1;
    }
    let listData = [...list, newData];
    setList(listData);
    clearData();
  };

  const onDragEnd = (item) => {
    const newList = list.filter((curItem) => curItem.id !== item.id);
    setList(newList);
  };

  return (
    <div className="left__container">
      <div className="create__container">
        {CREATETYPES.map((create) => (
          <Button
            type="primary"
            className="create__btn"
            onClick={() => createComponent(create)}
            key={create}
          >
            {`CREATE ${create}`}
          </Button>
        ))}
      </div>

      <Modal
        title={`Create ${modalType}`}
        visible={showModal}
        onOk={handleOk}
        onCancel={() => setshowModal(false)}
      >
        <ModalBody
          type={modalType}
          text={text}
          pos={pos}
          settext={settext}
          setPos={setPos}
        />
      </Modal>
      <h2 className="heading">Drag</h2>
      <div className="list__container">
        {list.map((listItem) => {
          if (listItem.modalType === BUTTON) {
            return (
              <ButtonC
                key={listItem.id}
                listItem={listItem}
                onDragEnd={() => onDragEnd(listItem)}
              />
            );
          } else if (listItem.modalType === TEXT) {
            return (
              <TextC
                key={listItem.id}
                listItem={listItem}
                onDragEnd={() => onDragEnd(listItem)}
              />
            );
          }
          return (
            <InputC
              key={listItem.id}
              listItem={listItem}
              onDragEnd={() => onDragEnd(listItem)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeftComponents;
