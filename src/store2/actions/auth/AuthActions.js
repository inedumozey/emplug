import routes from "../../../routes";
import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../../services/AuthService";

import AuthConstantTypes from "./AuthConstantTypes";

export function signupAction(data, history) {
  return (dispatch) => {
    signUp(data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data)
        // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history)
        console.log(response);
        dispatch(confirmedSignupAction(response.data));
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          dispatch(signupFailedAction(error.message));
          return;
        }
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout() {
  localStorage.removeItem("userDetails");
  return {
    type: AuthConstantTypes.LOGOUT_ACTION,
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          saveTokenInLocalStorage(response.data);
          dispatch(loginConfirmedAction(response.data));
          if (response.data.user.role !== "employer") {
            window.location.href = routes.home;
          } else {
            window.location.href = "/organization/628d42f7120955974018ebea";
          }
          console.log("Redirecting");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Network Error") {
          return dispatch(loginFailedAction(error.message));
        }
        try {
          const errorMessage = formatError(error.response.data);
          dispatch(loginFailedAction(errorMessage));
        } catch (error) {
          dispatch(
            loginFailedAction("Something went wrong. Please Try Again!")
          );
        }
      });
  };
}


export function loginFailedAction(data) {
  return {
    type: AuthConstantTypes.LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: AuthConstantTypes.LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}
export function updateConfirmedAction(data) {
  // console.log('------------------------>>>>>>>>',data)m,

return {
  type: AuthConstantTypes.UPDATE_CONFIRMED_ACTION,
  payload: data,
}
}
export function loadUserDetails(data) {
  return {
    type: AuthConstantTypes.LOAD_USER,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: AuthConstantTypes.SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: AuthConstantTypes.SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: AuthConstantTypes.LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function updatePersonalProfile(data) {
  return {
    type: AuthConstantTypes.UPDATE_PERSONAL_PROFILE,
    payload: data,
  };
}

export const viewUserDetails = (details) => ({
  type: AuthConstantTypes.VIEW_USER_PROFILE,
  payload: details,
});
