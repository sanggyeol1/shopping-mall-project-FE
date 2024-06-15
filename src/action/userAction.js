import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => { 
  try{
    dispatch({type:types.LOGIN_WITH_TOKEN_REQUEST})
    const response = await api.get("/user/me")
    dispatch({
      type:types.LOGIN_WITH_TOKEN_SUCCESS,
      payload:response.data
    })
  }catch(error){
    dispatch({type:types.LOGIN_WITH_TOKEN_FAIL })//토큰로그인은 에러를 굳이 띄울 필요가 없다
    dispatch(logout())
  }
};
const loginWithEmail = ({email, password}) => async (dispatch) => { 
  try{
    dispatch({type:types.LOGIN_REQUEST})
    const response = await api.post('/auth/login', {email, password})
    sessionStorage.setItem('token', response.data.token)
    dispatch({type:types.LOGIN_SUCCESS, payload:response.data})
  }catch(err){
    dispatch({type:types.LOGIN_FAIL, payload:err.error})
  }
 };
const logout = () => async (dispatch) => {
  //user정보를 지우고
  dispatch({type:types.LOGOUT})
  //session토큰을 지운다
  sessionStorage.removeItem("token")
};

const loginWithGoogle = (token) => async (dispatch) => {
  try{
    dispatch({type:types.GOOGLE_LOGIN_REQUEST})
    const response = await api.post("/auth/google",{token})
    sessionStorage.setItem('token', response.data.token)
    dispatch({type:types.GOOGLE_LOGIN_SUCCESS, payload:response.data})
  }catch(err){
    dispatch({type:types.GOOGLE_LOGIN_FAIL, payload:err.error})
    dispatch(commonUiActions.showToastMessage(err.error,"error"))
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.REGISTER_USER_REQUEST })
        const response = await api.post("/user", { email, name, password })
        if (response.status !== 200) throw new Error(response.error)
        dispatch({ type: types.REGISTER_USER_SUCCESS })
        dispatch(
          commonUiActions.showToastMessage("회원가입을 완료하였습니다.", "success")
        )
        navigate('/login')
      } catch (error) {
        const errrorMessage = error.response?.data?.message
        dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error })
      }
    };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
