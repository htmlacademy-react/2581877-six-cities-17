import {AuthorizationStatus, NameSpace} from '../../const';
import { State, User } from '../../types';


export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): User | null => state[NameSpace.User].user;
