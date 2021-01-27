import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faQrcode } from '@fortawesome/free-solid-svg-icons';
import Slider from 'modules/slider';
import { Color, BasicStyles } from 'common';
import Homepage from 'modules/homepage/Tab';
import Messenger from 'src/modules/basics/Welcome.js';
import Notification from 'src/modules/basics/Welcome.js';
import Profile from 'src/modules/basics/Welcome.js';
import Settings from 'src/modules/basics/Welcome.js';
import OptionRight from './OptionRight';
import TermsAndConditions from 'src/modules/basics/Welcome.js';

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
    navigationOptions: ({ navigation }) => ({
      title: 'HomePage',
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerTransparent: true
    }),
  },
  Messenger: {
    screen: Homepage,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerTransparent: true
    }),
  },
  Settings: {
    screen: Homepage,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerTransparent: true
    }),
  },
  TermsAndConditions: {
    screen: Homepage,
    navigationOptions: ({ navigation }) => ({
      title: 'Terms & condition',
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerTransparent: true
    }),
  },
});

const Drawer = createDrawerNavigator(
  {
    Homepage: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Homepage',
      },
    },
    Messenger: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Messages',
      },
    },
    Profile: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
      },
    },
    Notification: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Notification',
      },
    },
    Settings: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
    TermsAndConditions: {
      screen: _StackNavigator,
      navigationOptions: {
        drawerLabel: 'Terms and Condition',
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
