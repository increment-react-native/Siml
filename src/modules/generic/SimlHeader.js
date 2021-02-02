import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers, faHome, faBell, faComments, faReply} from '@fortawesome/free-solid-svg-icons';
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
    const { layer } = this.props;
    return (
      <View
        style={{
            flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            backgroundColor: Color.containerBackground
            }}>

        {
            layer == 1 && (
              <TouchableOpacity
                onPress={() => this.redirect('Connections')}
                style={layer == 1 ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                  marginLeft: 50
                } : {justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                marginLeft: 80}}
                >
                <FontAwesomeIcon
                  icon={faReply}
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
                onPress={() => this.redirect('Connections')}
                style={layer == 0 ? {justifyContent: 'center',
                alignItems: 'center',
                width: '330%',
                marginLeft: 20} : {justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                marginLeft: 20}}
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

          <TouchableOpacity
          onPress={() => this.redirect('Status')}
          style={layer == 1 ? {
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            marginLeft: 60
          } : {
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            marginLeft: 40
          }}
          >
          <FontAwesomeIcon
            icon={faComments}
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
