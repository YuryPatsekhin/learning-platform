import * as CONSTANTS from "./Constants";

export const openLoginDialog = () => ({
  type: CONSTANTS.OPEN_LOGIN_DIALOG,
});

export const closeLoginDialog = () => ({
  type: CONSTANTS.CLOSE_LOGIN_DIALOG,
});