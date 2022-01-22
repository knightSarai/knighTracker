import { useApi } from '@hooks/';
import { Dispatch } from 'redux';
import { UserActionTypes as types } from './action-types';

export const getUser = () => async (dispatch: Dispatch) => {
  const api = useApi();
  try {
    const { data } = await api.get('/auth/user/');
    dispatch({
      type: types.SET_USER,
      payload: {
        ...data.user,
        traineeID: data.trainee_id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
