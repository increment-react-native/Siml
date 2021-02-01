import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faQrcode } from '@fortawesome/free-solid-svg-icons';
import Slider from 'modules/slider';
import { Color, BasicStyles } from 'common';
import Homepage from 'modules/homepage/Tab';
// import TabSecondLayer from 'modules/homepage/TabSecondLayer';
import Messenger from 'src/modules/basics/Welcome.js';
import Notification from 'src/modules/basics/Welcome.js';
import Profile from 'src/modules/basics/Welcome.js';
import Settings from 'modules/display/Stack';
import OptionRight from './OptionRight';
import TermsAndConditions from 'modules/termsAndConditions/Stack';

import Style from './Style.js';
import { connect } from 'react-redux'

// const width = Math.round(Dimensions.get('window').width);
const width = '70%';
class MenuDrawerStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: true,
    };
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}></View>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux');
  return {
    setQRCodeModal: (isVisible) => {
      dispatch(actions.setQRCodeModal({ isVisible: isVisible }))
    },
  };
};

const _StackNavigator = createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'Homepage'},
  },
  Messenger: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'Homepage'},
  },
  Settings: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'Homepage'},
  },
  TermsAndConditions: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
    params: {initialRouteName: 'Homepage'},
  },
});

const Drawer = createDrawerNavigator(
  {
    Homepage: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    Messenger: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    Profile: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    Notification: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    Settings: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
    TermsAndConditions: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    },
  },
  {
    contentComponent: Slider,
    drawerWidth: width,
    initialRouteName: 'Homepage'
  },
);

export default Drawer;
