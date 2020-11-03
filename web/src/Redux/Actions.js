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
