import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faBars, faShare} from '@fortawesome/free-solid-svg-icons';
import Connection from 'modules/connection';
import {NavigationActions} from 'react-navigation';
import {BasicStyles, Color} from 'common';
import {connect} from 'react-redux';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
    isViewing: false
  }
  back = () => {
    this.props.navigationProps.pop()
  };
  viewMenu = () => {
    const { viewMenu } = this.props // new
    viewMenu(!this.props.state.isViewing) // new
  }

  render() {
    const { theme } = this.props.state;
    return (
      <View style={{flexDirection: 'row', padding: 5}}>
        <TouchableOpacity onPress={this.viewMenu.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon
            icon={faShare}
            size={BasicStyles.headerBackIconSize}
            style={{color: theme ? theme.primary : Color.primary,}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    viewMenu: (isViewing) => dispatch(actions.viewMenu(isViewing))
  };
};
let HeaderOptionsConnect  = connect(mapStateToProps, mapDispatchToProps)(HeaderOptions);

const TermsAndConditionsStack = createStackNavigator({
  termsAndConditionsScreen: {
    screen: Connection,
    navigationOptions: ({navigation}) => ({
      title: 'Connections',
      headerRight: <HeaderOptionsConnect navigationProps={navigation} />,
      ...BasicStyles.headerDrawerStyleRight
      
    }),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsAndConditionsStack);
