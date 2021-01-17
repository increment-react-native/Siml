import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import {Helper, Color} from 'common';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
};

export const actions = {
  login: (user, token) => {
    return {type: types.LOGIN, user, token};
  },
  logout() {
    return {type: types.LOGOUT};
  },
  updateUser: user => {
    return {type: types.UPDATE_USER, user};
  },
};

const initialState = {
  token: null,
  user: null,
};

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${Helper.APP_NAME}${key}`, value);
  } catch (e) {
    // saving error
  }
};

const reducer = (state = initialState, action) => {
  const { type, user, token } = action;
  const { unread } = action;
  const { notification } = action;
  const { theme } = action;
  const { productFilter } = action;
  const { cartItems, location } = action;
  const { messages, message } = action;
  const { messengerGroup, messagesOnGroup } = action;
  const { selectedOrder } = action;
  const { task, setting, paddock } = action;
  const { product } = action;
  switch (type) {
    case types.LOGOUT:
      AsyncStorage.clear();
      return Object.assign({}, initialState);
    case types.LOGIN:
      storeData('token', token);
      console.log('LOGIN', true);
      Data.setToken(token);
      return {...state, user, token};
    case types.UPDATE_USER:
      return {
        ...state,
        user,
      };
    default:
      return {...state, nav: state.nav};
  }
};
export default reducer;
