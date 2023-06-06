// actions/authActions.js

// Import các action types cần thiết
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_USER  } from '../types';

// Action creator cho thành công đăng nhập
export const loginSuccess = (token) => {
  // Lưu token vào localStorage
  localStorage.setItem('token', token);

  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

// Action creator cho đăng nhập thất bại
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// Action creator cho việc đăng xuất
export const logout = () => {
  // Xóa token khỏi localStorage
  localStorage.removeItem('token');

  return {
    type: LOGOUT,
  };
};

export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user
  };
};