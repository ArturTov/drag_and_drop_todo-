import { actions_types } from "../constants/action_type";

export const setAddTodo = (payload) => {
  return {
    type: actions_types.ADD_TODO,
    payload,
  };
};
export const setEditTodo = (payload) => {
  return {
    type: actions_types.EDIT_TODO,
    payload,
  };
};
export const setChangeStatus = (payload) => {
  return {
    type: actions_types.CHANGE_STATUS,
    payload,
  };
};
export const setDeleteTodo = (payload) => {
  return {
    type: actions_types.DELETE_TODO,
    payload,
  };
};
