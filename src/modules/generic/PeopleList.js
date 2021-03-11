import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Text } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faTimes, faStar} from '@fortawesome/free-solid-svg-icons';
import { BasicStyles, Color } from 'common';
const height = Math.round(Dimensions.get('window').height);
import UserImage from 'components/User/Image';

class PeopleList extends Component{
  constructor(props){
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{
            width: '100%',
            position: 'relative',
            flexDirection: 'row'
          }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size={ 45 }
                style={{
                  color: Color.primary,
                  marginLeft: 20,
                  fontSize: 1
                }}
                onPress={() => this.props.redirectTo()}
              />
              {
                data && data.map((item, index) => (
                  <UserImage
                    key={index}
                    user={item}
                    color={ Color.primary }
                    size={ 45 }
                    borderColor={Color.primary}
                    borderWidth={ 3 }
                    marginLeft={ 3 }/>
                ))
              }
            </ScrollView>
      </View>
    )
  }
}

export default PeopleList;