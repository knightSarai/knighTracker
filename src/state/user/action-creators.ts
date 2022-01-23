import { Dispatch } from 'redux';
import { UserActionTypes as types } from './action-types';

import { Api } from '@global/';

export const getUser = () => async (dispatch: Dispatch) => {
  const api = Api.getInstance();

  try {
    const { data } = await api.get('/auth/user/');
    dispatch({
      type: types.SET_USER,
      payload: {
        ...data.user,
        traineeID: data.trainee_id,
        isAuthenticated: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
