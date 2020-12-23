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
      const { pupil, lessons } = action.payload;

      const newState = Object.assign({}, state);
      const schedule = newState.lessons.schedules.find(schedule => schedule.pupil === pupil);

      if (schedule) {
        schedule.lessons = lessons;
        return { ...newState };

      } else {
        const newSchedule = {
          pupil,
          lessons,
        }
        newState.lessons.schedules.push(newSchedule);

        return { ...newState }
      }
    }

    case CONSTANTS.DELETE_LESSON: {
      const { pupil, lessonId } = action.payload;
      const newState = Object.assign({}, state);
      const schedule = newState.lessons.schedules.find(schedule => schedule.pupil === pupil);

      if (schedule) {
        const lesson = schedule.lessons.find(el => el.id === lessonId);
        const indexOfLesson = schedule.lessons.indexOf(lesson);
        const newLessons = [...schedule.lessons];

        newLessons.splice(indexOfLesson, 1);
        schedule.lessons = newLessons;

        return { ...newState };

      }
      return { ...newState };
    }

    case CONSTANTS.MOVE_LESSON: {
      const { pupil, newDate, lessonId } = action.payload;
      const newState = Object.assign({}, state);
      const schedule = newState.lessons.schedules.find(schedule => schedule.pupil === pupil);
      const lesson = schedule.lessons.find(lesson => lesson.id === lessonId);

      lesson.start = newDate;

      return { ...newState };
    }

    case CONSTANTS.SET_USER: {
      return { ...state, user: action.payload };
    }

    case CONSTANTS.SET_THEACHER: {
      return { ...state, theacher: action.payload };
    }

    case CONSTANTS.SET_PUPIL_FOR_SCHEDULE: {
      const newState = Object.assign({}, state);
      newState.lessons.currentPupil = action.payload;

      return { ...newState };
    }

    default:
      return state;
  };
};

export default rootReducer;
