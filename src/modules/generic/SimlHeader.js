import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers, faHome, faBell, faComments, faReply, faShare} from '@fortawesome/free-solid-svg-icons';
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
            padding: 5,
            backgroundColor: Color.containerBackground
            }}>

          <TouchableOpacity
          onPress={() => this.redirect('Status')}
          >
          <FontAwesomeIcon
            icon={faShare}
            size={35}
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
