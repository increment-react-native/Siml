import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComments, faUsers, faReply} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { BasicStyles, Color } from 'common';
const width = Math.round(Dimensions.get('window').width)

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    }
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', width: width, position: 'absolute', backgroundColor: 'white', zIndex: 1000}}>
        <View style={{flex: 13, flexDirection: 'column'}}>
            {this.state.status === false ? <View>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 12,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 10001
                }}
                >
                <FontAwesomeIcon
                  icon={faUsers}
                  size={35}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: Color.primary,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            : <View>
            <TouchableOpacity
               style={{
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: 50,
                 width: 50,
                 right: 10,
                 marginLeft: 12,
               }}
               >
               <FontAwesomeIcon
                 icon={faReply}
                 size={35}
                 style={[
                   BasicStyles.iconStyle,
                   {
                     color: Color.primary,
                   },
                 ]}
               />
             </TouchableOpacity>
            </View> }
        </View>

        <View style={{flex: 12, flexDirection: 'column'}}>
        {this.state.status === true ? <View>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 10001
                }}
                >
                <FontAwesomeIcon
                  icon={faUsers}
                  size={35}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: Color.primary,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            : null }
        </View>
        <View style={{flex: 4, flexDirection: 'column'}}>
           <View>
           <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
                right: 5
              }}
              >
              <FontAwesomeIcon
                icon={faComments}
                size={35}
                style={[
                  BasicStyles.iconStyle,
                  {
                    color: Color.primary,
                  },
                ]}
              />
            </TouchableOpacity>
           </View>
        </View>
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
