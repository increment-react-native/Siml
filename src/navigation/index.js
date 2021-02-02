import {createStackNavigator} from 'react-navigation-stack';
import Login from 'src/modules/account/Login';
import ForgotPassword from 'src/modules/account/ForgotPassword';
import Register from 'src/modules/account/Register';
import NotificationStack from 'src/modules/notification/Drawer';
import RestaurantStack from 'src/modules/restaurants/Drawer';
import Drawer from './Drawer';
// login stack
const LoginStack = createStackNavigator(
  {
    loginScreen: {screen: Login},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const ForgotPasswordStack = createStackNavigator(
  {
    forgotPasswordScreen: {screen: ForgotPassword},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const RegisterStack = createStackNavigator(
  {
    registerScreen: {screen: Register},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    loginStack: {screen: LoginStack},
    forgotPasswordStack: {screen: ForgotPasswordStack},
    registerStack: {screen: RegisterStack},
    drawerStack: {screen: Drawer},
    notificationStack: {screen: NotificationStack},
    restaurantStack: {screen: RestaurantStack},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
  },
);

export default PrimaryNav;
