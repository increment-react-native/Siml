import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Slider from 'components/Slider';
import {Color, BasicStyles} from 'common';
import Homepage from 'src/modules/basics/Welcome.js';
import OptionRight from './OptionRight';
import {connect} from 'react-redux';

const width = Math.round(Dimensions.get('window').width);

class MenuDrawerContentStructure extends Component {
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
    const {theme} = this.props.state;
    const {color} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        {this.state.loginState === true && (
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon
              icon={faBars}
              size={BasicStyles.iconSize}
              style={[
                BasicStyles.iconStyle,
                {
                  color: color ? color : theme ? theme.primary : Color.primary,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setActiveRoute: route => dispatch(actions.setActiveRoute(route)),
  };
};

let MenuDrawerStructure = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuDrawerContentStructure);

const Homepage_StackNavigator = createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: ({navigation}) => {
      console.log({navigation});
      return {
        headerShown: false,
      };
    },
  },
});

const Drawer = createDrawerNavigator(
  {
    Homepage: {
      screen: Homepage_StackNavigator,
      navigationOptions: {
        drawerLabel: '',
      },
    }
  },
  {
    contentComponent: Slider,
    drawerWidth: width,
    initialRouteName: 'Homepage',
  },
);

export default Drawer;
