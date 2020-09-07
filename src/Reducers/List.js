import {
  ADD__LIST__ITEM,
  UPDATA__LIST__FROM_STROAGE,
  UPDATE__CLIENTY__FOR__ABS,
} from "../actions/actionTypes";

const initialState = {
  items: [],
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD__LIST__ITEM:
      let newItem = { ...action.payload.item };
      const newItems = state.items.filter(
        (listItem) => listItem.id !== newItem.id
      );
      newItems.splice(action.payload.index, 0, newItem);
      return { items: newItems };
    case UPDATA__LIST__FROM_STROAGE:
      const newList = action.payload.newList;
      return { items: [...newList] };
    case UPDATE__CLIENTY__FOR__ABS:
      const newItemsList = [...state.items];
      const index = newItemsList.findIndex(
        (listItem) => listItem.id === action.payload.id
      );
      newItemsList[index] = {
        ...newItemsList[index],
        top: action.payload.clientY,
      };
      return { items: [...newItemsList] };
    default:
      return state;
  }
};

export default ListReducer;
