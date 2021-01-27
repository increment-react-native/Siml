import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { Routes, Color, Helper } from 'common';
class HomePage extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={Style.MainContainer}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          marginTop: 50
        }}>
          <TouchableOpacity
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderColor: Color.primary,
              borderWidth: 2
            }}>
            <Image source={require('assets/logo.png')} style={{
              height: 100,
              width: 100
            }}/>
          </TouchableOpacity>
        </View>
        <View style={{
          width: '100%'
        }}>
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}>What's the Consensus.</Text>
        </View>
      </View>
    );
  }
}
export default HomePage;