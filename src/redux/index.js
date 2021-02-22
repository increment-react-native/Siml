import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import {Helper, Color} from 'common';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
  SET_THEME: 'SET_THEME',
  SET_LAYER: 'SET_LAYER',
  VIEW_MENU: 'VIEW_MENU',
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
  setTheme(theme) {
    return {type: types.SET_THEME, theme};
  },
  setLayer(layer) {
    return {type: types.SET_LAYER, layer};
  },
  viewMenu(isViewing){
    return {type: types.VIEW_MENU, isViewing}
  }
};

const initialState = {
  token: null,
  user: null,
  theme: null,
  layer: null,
  isViewing: false
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
  const { theme, layer } = action;
  const { isViewing, request } = action;
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
    case types.SET_THEME:
      console.log('tertiary', theme.tertiary);
      storeData('primary', theme.primary);
      storeData('secondary', theme.secondary);
      storeData('tertiary', theme.tertiary);
      storeData('fourth', theme.fourth);
      Color.setPrimary(theme.primary);
      Color.setSecondary(theme.secondary);
      Color.setTertiary(theme.tertiary);  
      Color.setFourth(theme.fourth);
      return {
        ...state,
        theme,
      };
    case types.SET_LAYER:
      return {
        ...state,
        layer,
      };
    case types.VIEW_MENU:
      console.log("[IS_VIEWING]", isViewing);
      return {
        ...state,
        isViewing
      }
    default:
      return {...state, nav: state.nav};
  }
};
export default reducer;
