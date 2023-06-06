// Import các action types cần thiết
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_USER } from "../types";

// Trạng thái mặc định của authentication
const initialState = {
  token: localStorage.getItem("token"), // Lấy token từ localStorage khi khởi tạo
  error: null,
  user: null,
};

// Reducer xử lý action liên quan đến xác thực
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
        user: null,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
