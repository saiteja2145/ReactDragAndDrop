import React from "react";
import Select from "antd/es/select";
import Button from "antd/es/button";
import { INPUT, TEXT } from "../constants";

const { Option } = Select;
const ModalBody = ({ type, text, settext, setPos, pos }) => {
  let render = <Button type="primary txt__center">{text}</Button>;
  if (type === TEXT) {
    render = <p>{text}</p>;
  } else if (type === INPUT) {
    render = <input type="text" placeholder="Enter Text" value={text} />;
  }

  const data = (
    <div className="modal__container">
      <div className="input__grid">
        <label>Preview</label>
        {render}
        <label htmlFor="text">Text</label>
        <div className="input__data">
          <input
            type="text"
            id="text"
            placeholder="Full Name"
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
        </div>
        <label htmlFor="fullName">Position</label>
        <Select
          defaultValue="static"
          value={pos}
          onChange={(val) => setPos(val)}
        >
          <Option value="static">Static</Option>
          <Option value="absolute">Absolute</Option>
        </Select>
      </div>
    </div>
  );
  return data;
};

export default ModalBody;
