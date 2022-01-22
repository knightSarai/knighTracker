import { UserActionTypes as types } from './action-types';
import { UserAction } from './actions';
import { User } from '@models/';

const initialUserState = {
  id: NaN,
  traineeID: NaN,
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  isAuthenticated: false,
};

export const userReducer = (
  state: User = initialUserState,
  action: UserAction
) => {
  switch (action.type) {
    case types.SET_USER:
      return { isAuthenticated: true, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
