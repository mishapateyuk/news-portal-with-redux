import {checkAuthorizationData} from '../models/authorizationModel';
const logIn = (user) => (dispatch) => {
  localStorage.setItem('username', user);
  dispatch({
    type: 'LOG_IN',
    user,
  });
};

const logOut = () => (dispatch) => {
  localStorage.setItem('username', 'Guest');
  dispatch({
    type: 'LOG_OUT',
  });
};

const auth = (login, pass) => (dispatch) => {
    return checkAuthorizationData(login, pass)
        .then((response) => {
            if (response) {
                dispatch(logIn(login));
            } else {
                dispatch(authError('Incorrect login or password'));
            };
        });
};

const authError = (message) => ({
  type: 'AUTH_ERROR',
  message,
});

export {auth, logIn, logOut};
