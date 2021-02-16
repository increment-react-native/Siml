import {createStackNavigator} from 'react-navigation-stack';
import Login from 'src/modules/account/Login';
import ForgotPassword from 'src/modules/account/ForgotPassword';
import Register from 'src/modules/account/Register';
import NotificationStack from 'src/modules/notification/Drawer';
import RestaurantStack from 'src/modules/restaurants/Drawer';
import MenuStack from 'src/modules/menu/index';
import EventsStack from 'src/modules/events/Drawer';
import RetailsStack from 'src/modules/retails/Drawer';
import CartStack from 'src/modules/cart/Drawer'
import HistoryStack from 'src/modules/history/Drawer'
import TopChoiceStack from 'src/modules/topChoice/Drawer'
import ProfileStack from 'src/modules/profile/Drawer'
import ViewProfileStack from 'src/modules/viewProfile/Drawer'
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
    eventsStack: {screen: EventsStack},
    retailsStack: {screen: RetailsStack},
    cartStack: {screen: CartStack},
    historyStack: {screen: HistoryStack},
    menuStack: {screen: MenuStack},
    profileStack: {screen: ProfileStack},
    topChoiceStack: {screen: TopChoiceStack},
    viewProfileStack: {screen: ViewProfileStack}
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
  },
);

export default PrimaryNav;
