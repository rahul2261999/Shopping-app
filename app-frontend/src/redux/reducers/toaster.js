import { MOUNT_TOASTER, UNMOUNT_TOASTER } from '../actionTypes';

const initialState = {
  title: '',
  msg: '',
  mount: false
};

const toasterReducer = (state = initialState, action) => {
  switch (action.type) {
  case MOUNT_TOASTER:
    return {
      ...state,
      title: action.payload.title,
      msg: action.payload.msg,
      mount: action.payload.mount
    };

  case UNMOUNT_TOASTER:
    return {
      ...initialState
    };

  default:
    return state;
  }
};

export default toasterReducer;
