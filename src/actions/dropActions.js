import {
  ADD__LIST__ITEM,
  UPDATA__LIST__FROM_STROAGE,
  UPDATE__CLIENTY__FOR__ABS,
} from "./actionTypes";

export const addListItem = (item, index) => {
  return { type: ADD__LIST__ITEM, payload: { item, index } };
};

export const updateListFromStorage = (list) => {
  return { type: UPDATA__LIST__FROM_STROAGE, payload: { newList: list } };
};

export const updateClientYForAbs = (listItem, clientY) => {
  return {
    type: UPDATE__CLIENTY__FOR__ABS,
    payload: { id: listItem.id, clientY },
  };
};
