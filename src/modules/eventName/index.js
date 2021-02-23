import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, CheckBox, Modal, ImageBackground } from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import CustomizedButton from 'modules/generic/CustomizedButton';

class EventName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { title: 'Retail 1', price: '100.00', quantity: 2 },
        { title: 'Retail 2', price: '61.00', quantity: 5 },
        { title: 'Retail 3', price: '7.00', quantity: 1 }
      ],
      value: null,
      placeOrder: false
    }
  }
  onClick = () => {
    this.props.navigation.navigate('historyStack', {title: 'Upcoming'})
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        width: '100%',
        backgroundColor: 'white',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        height: '100%'
      }}>
        <ImageBackground
          style={{ 
            width: '100%',
            height: '50%'
          }}
          imageStyle={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
          source={require('assets/test.jpg')}>
          <View style={{ position: 'absolute', bottom: 20 }}>
            <Text style={{ color: 'white', left: 10, fontSize: 20, fontWeight: 'bold' }}>Italian Restaurant</Text>
            <Text style={{ color: 'white', left: 10 }}>Cebu City, Philippines</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 20, right: 15, flexDirection: 'row' }}>
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'white'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'white'}
            />
          </View>
        </ImageBackground>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
        }}>
          <FontAwesomeIcon icon={faUser} size={20} color={Color.gray} style={{ marginRight: 10 }} />
          <Text style={{ color: Color.gray, marginRight: '30%'}}>5 people</Text>
          <FontAwesomeIcon icon={faClock} size={20} color={Color.gray} style={{ marginRight: 10 }} />
          <Text style={{ color: Color.gray, marginRight: '30%'}}>7 PM</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          paddingBottom: 15
        }}>
          <Text style={{
            textAlign: 'center',
            marginBottom: 5
          }}>Images</Text>
        </View>
          <CustomizedButton onClick={this.onClick} title={'Cancel'}></CustomizedButton>
      </View>
    );
  }
}
export default EventName;