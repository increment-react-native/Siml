import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableHighlight} from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faComments, faReply} from '@fortawesome/free-solid-svg-icons';
import { Routes, Color, Helper, BasicStyles } from 'common';
library.add(fab)
class SocialLogin extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={[Style.MainContainer, {flex: 1, flexDirection: 'row'}]}>
        {/* <View style={Style.TextContainer}> */}
          <TouchableHighlight style={[BasicStyles.btnRound, {backgroundColor: 'white', width: 50, marginRight: -60}]}>
              <FontAwesomeIcon size={30} color={Color.primary} icon={['fab', 'facebook-f']}/>
          </TouchableHighlight>
          <TouchableHighlight style={[BasicStyles.btnRound, {backgroundColor: 'white', width: 50}]}>
              <FontAwesomeIcon size={30} color={Color.primary} icon={['fab', 'google-plus-g']}/>
          </TouchableHighlight>
        {/* </View> */}
      </View>
    );
  }
}
export default SocialLogin;