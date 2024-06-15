import api from "../utils/api";
import * as types from "../constants/comment.constants";
import { commonUiActions } from "./commonUiAction";

const createComment = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_COMMENT_REQUEST });
    const response = await api.post("/comments", payload);
    dispatch({ type: types.CREATE_COMMENT_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage("Comment added successfully!", "success"));
  } catch (err) {
    dispatch({ type: types.CREATE_COMMENT_FAIL, payload: err.message });
    dispatch(commonUiActions.showToastMessage(err.message, "error"));
  }
};

const getCommentsByProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COMMENT_LIST_REQUEST });
    const response = await api.get(`/comments/product/${productId}`);
    dispatch({
      type: types.GET_COMMENT_LIST_SUCCESS,
      payload: response.data.data, // 서버에서 받은 댓글 데이터
    });
  } catch (error) {
    dispatch({ type: types.GET_COMMENT_LIST_FAIL, payload: error.message });
  }
};

const deleteComment = (commentId, productId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COMMENT_REQUEST });
    await api.delete(`/comments/${commentId}`);
    dispatch({ type: types.DELETE_COMMENT_SUCCESS, payload: commentId });
    dispatch(getCommentsByProduct(productId)); // 댓글 삭제 후 목록 갱신
  } catch (error) {
    dispatch({ type: types.DELETE_COMMENT_FAIL, payload: error.message });
  }
};

export const commentActions = {
  createComment,
  getCommentsByProduct,
  deleteComment,
};
