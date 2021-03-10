import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes, faStar} from '@fortawesome/free-solid-svg-icons';
import { BasicStyles, Color } from 'common';
const height = Math.round(Dimensions.get('window').height);
import UserImage from 'components/User/Image';

class GroupUsers extends Component{
  constructor(props){
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
			<View style={{
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        ...this.props.style
      }}>
        {
          data && data.map((item, index) => (
            <UserImage
              user={item}
              color={Color.primary}
              size={ 30 }
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                padding: '15%'
              }}/>
          ))
        }
			</View>
    )
  }
}

export default GroupUsers;