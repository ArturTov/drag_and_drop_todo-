import { actions_types } from "../constants/action_type";
const id = () => {
  return Math.random().toString();
};
const initialState = {
  items: [],
};
const status = ["todo", "inprocess", "complited"];
export const toDoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions_types.ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: id(),
            name: payload,
            editable: true,
            status: "todo",
          },
        ],
      };
    case actions_types.EDIT_TODO:
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.id === payload.id) {
            return {
              ...el,
              name: payload.name,
            };
          }
          return el;
        }),
      };
    case actions_types.CHANGE_STATUS:
      return {
        ...state,
        items: state.items.map((el) => {
          if (el.id === payload.id && payload.status === "todo") {
            return {
              ...el,
              status: payload.status,
              editable: true,
            };
          } else if (el.id === payload.id) {
            return {
              ...el,
              status: payload.status,
              editable: false,
            };
          }
          return el;
        }),
      };
    case actions_types.DELETE_TODO:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== payload),
      };
    default:
      return state;
  }
};
