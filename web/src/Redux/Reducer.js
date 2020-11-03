import * as CONSTANTS from "./Constants";

const rootReducer = (state, action) => {

  switch (action.type) {
    case CONSTANTS.OPEN_LOGIN_DIALOG: {
      return { ...state, isLoginDialogOpen: true }
    }

    case CONSTANTS.CLOSE_LOGIN_DIALOG: {
      return { ...state, isLoginDialogOpen: false }
    }

    case CONSTANTS.OPEN_REGISTRATION_DIALOG: {
      return { ...state, isRegistrationDialogOpen: true }
    }

    case CONSTANTS.CLOSE_REGISTRATION_DIALOG: {
      return { ...state, isRegistrationDialogOpen: false }
    }

    case CONSTANTS.UPDATE_LESSONS: {
      return { ...state, lessons: action.payload}
    }

    default:
      return state;
  }
}

export default rootReducer;
