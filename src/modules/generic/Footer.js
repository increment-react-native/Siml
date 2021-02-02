import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers, faHome, faBell, faComment} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {BasicStyles, Color} from 'common';
import {connect} from 'react-redux';


class Footer extends Component {
  constructor(props) {
    super(props);
  }

  redirect(route, layer){
    this.props.navigation.navigate(route)
  }

  render (){
    const { layer } = this.props;
    return(
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: 50,
          zIndex: 0,
          backgroundColor: Color.containerBackground
        }}>
          {
            layer == 0 && (
              <TouchableOpacity
                onPress={() => this.redirect('Connections')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '33%'
                }}
                >
                <FontAwesomeIcon
                  icon={faUsers}
                  size={BasicStyles.iconSize}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: Color.gray,
                    },
                  ]}
                />
              </TouchableOpacity>
            )
          }

          {
            layer == 1 && (
              <TouchableOpacity
                onPress={() => this.redirect('Homepage')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '33%'
                }}
                >
                <FontAwesomeIcon
                  icon={faHome}
                  size={BasicStyles.iconSize}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: Color.gray,
                    },
                  ]}
                />
              </TouchableOpacity>
            )
          }
         


          <TouchableOpacity
          onPress={() => this.redirect('Status')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%'
          }}
          >
          <FontAwesomeIcon
            icon={faComment}
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
          onPress={() => this.redirect('notificationStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%'
          }}
          >
          <FontAwesomeIcon
            icon={faBell}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
          </TouchableOpacity>
      </View>
    )
  }
};

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
