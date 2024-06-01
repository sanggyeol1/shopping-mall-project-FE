// import * as types from "../constants/user.constants";
// const initialState = {};

// function userReducer(state = initialState, action) {
//   const { type, payload } = action;
//   return state;
// }

// export default userReducer;
import { type } from "@testing-library/user-event/dist/type";
import * as types from "../constants/user.constants";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (action.type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, loading: true }
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload.user }
    case types.LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload }
    default : 
      return state
  }
};

export default userReducer;
