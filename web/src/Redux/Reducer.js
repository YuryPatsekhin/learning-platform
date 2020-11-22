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
      const { currentPupil, lessons } = action.payload;
      const user = state.lessons.find(user => user.pupil === action.payload.currentPupil)

      if (user) {
        user.lessons = lessons
        return { ...state };
      } else {
        const lessonsOfNewPupil = {
          pupil: currentPupil,
          lessons,
        }
        return { ...state, lessons: [...state.lessons, lessonsOfNewPupil] }
      }
    }

    case CONSTANTS.SET_USER: {
      return { ...state, user: action.payload }
    }

    case CONSTANTS.SET_THEACHER: {
      return { ...state, theacher: action.payload }
    }

    case CONSTANTS.SET_CURRENT_PUPIL: {
      return { ...state, currentPupil: action.payload }
    }

    default:
      return state;
  }
}

export default rootReducer;
