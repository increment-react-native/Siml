import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes, faStar} from '@fortawesome/free-solid-svg-icons';
import { BasicStyles, Color } from 'common';
import GroupUsers from 'modules/generic/GroupUsers';
import Config from 'src/config.js';

const height = Math.round(Dimensions.get('window').height);

class ImageCardWithUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      isActive: false
    }
  }

  render() {
    const { data } = this.props;
    return (
			<View style={{
        width: '100%',
        ...this.props.style
      }}>
        {
          data && (
            <TouchableOpacity
              style={{
                position: 'relative'
              }}
              onPress={(data) => this.props.onClick(data)}
              >
              <Image
                source={{ uri: Config.BACKEND_URL + data.logo}}
                  style={{
                  width: '100%',
                  height: height / 3.5,
                  borderRadius: BasicStyles.standardBorderRadius
                }}/>
                <View style={{
                  position: 'absolute',
                  bottom: 10,
                  width: '90%',
                  marginLeft: '5%',
                  marginRight: '5%',
                  flexDirection: 'row'
                }}>
                  <View style={{
                    width: '50%'
                  }}>
                    <Text style={{
                      color: Color.white,
                      fontWeight: 'bold',
                      fontSize: BasicStyles.standardTitleFontSize,
                      textShadowColor:'black',
                      textShadowOffset:{width: 1, height: 1},
                      textShadowRadius: 1,
                    }}
                    numberOfLines={1}
                    >{data.name}</Text>
                    <Text style={{
                      color: Color.white,
                      textShadowColor:'black',
                      textShadowOffset:{width: 1, height: 1},
                      textShadowRadius: 1,
                    }}
                    numberOfLines={1}
                    >{data.address}</Text>
                  </View>
                  <View style={{
                    width: '50%'
                  }}>
                    <GroupUsers data={data.users}/>
                  </View>
                </View>
                {
                  data.superlike == true && (
                    <TouchableOpacity style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      backgroundColor: Color.primary,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <FontAwesomeIcon icon={faStar} color={Color.white} size={30}/>
                    </TouchableOpacity>
                  )
                }
            </TouchableOpacity>
          )      
        }
			</View>
    )
  }
}

export default ImageCardWithUser;