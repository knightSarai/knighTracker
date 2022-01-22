import { UserActionTypes } from './action-types';
import User from '@models/User';

interface SetUserAction {
  type: UserActionTypes.SET_USER;
  payload: User;
}

export type UserAction = SetUserAction;
