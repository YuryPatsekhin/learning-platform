import * as CONSTANTS from "./Constants";

const initialState = {
  menuIsOpen: false,
  menuIsOpenTwo: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.OPEN_MENU: {
      return { ...state, menuIsOpen: true };
    }
    case CONSTANTS.CLOSE_MENU: {
      return { ...state, menuIsOpen: false };
    }
    default:
      return state;
  }
}

export default rootReducer;
