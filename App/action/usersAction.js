import {GET_USERS, USERS_ERROR} from '../type';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'http://54.91.214.122:4000/api/category/userProfile',
      {
        params: {
          userId: '1',
        },
      },
    );
    dispatch({
      type: GET_USERS,
      payload: res.data.result,
    });
  } catch (e) {
    dispatch({
      type: USERS_ERROR,
      payload: console.log(e),
    });
  }
};
