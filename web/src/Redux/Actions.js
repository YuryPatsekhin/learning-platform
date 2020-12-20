import * as CONSTANTS from "./Constants";

export const openLoginDialog = () => ({
  type: CONSTANTS.OPEN_LOGIN_DIALOG,
});

export const closeLoginDialog = () => ({
  type: CONSTANTS.CLOSE_LOGIN_DIALOG,
});

export const openRegistrationDialog = () => ({
  type: CONSTANTS.OPEN_REGISTRATION_DIALOG,
})

export const closeRegistrationDialog = () => ({
  type: CONSTANTS.CLOSE_REGISTRATION_DIALOG,
})

export const updateLessons = (lessons) => ({
  type: CONSTANTS.UPDATE_LESSONS,
  payload: lessons,
});

export const setUser = (user) => ({
  type: CONSTANTS.SET_USER,
  payload: user,
});

export const setTheacher = (theacher) => ({
  type: CONSTANTS.SET_THEACHER,
  payload: theacher,
});

export const setPupilForSchedule = (pupil) => ({
  type: CONSTANTS.SET_PUPIL_FOR_SCHEDULE,
  payload: pupil,
});

export const deleteLesson = ({ pupil, lessonId }) => ({
  type: CONSTANTS.DELETE_LESSON,
  payload: { pupil, lessonId },
})
