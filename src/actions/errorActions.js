import {CLEAR_ERRORS, GET_ERRORS} from "./types";

export const setErrors = err => {
  return {
      type: GET_ERRORS,
      payload: err,
  }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
};
