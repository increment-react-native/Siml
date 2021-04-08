import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions, SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAlignLeft, faBars, faChevronLeft, faClock, faHistory, faShoppingBag, faStar} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { BasicStyles, Color } from 'common';
const width = Math.round(Dimensions.get('window').width)

class Header extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          borderBottomWidth: 0
          }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.toggleDrawer()
          }}
          style={{
            height: 50,
            width: 50,
            marginLeft: 5,
            // backgroundColor: Color.primary,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10001
          }}
          >
          <FontAwesomeIcon
            icon={faAlignLeft}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.primary,
              },
            ]}
          />
        </TouchableOpacity>

      
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('topChoiceStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            marginLeft: width - (105 + 100),
          }}
          >
          <FontAwesomeIcon
            icon={faStar}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('historyStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
          }}
          >
          <FontAwesomeIcon
            icon={faClock}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('cartStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            marginLeft: width - (50 + 50)
          }}
          >
          <FontAwesomeIcon
            icon={faHistory}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.primary,
              },
            ]}
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
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
