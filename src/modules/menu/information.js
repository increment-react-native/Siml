import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native'
import Style from './Style.js'

class Information extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'Bangtan Sonyeondan',
      hours: ['7 AM - 7 PM (Weekdays)', '7 AM - 11 PM (Weekends)'],
      description: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. It is simply dummy text of the printing and typesetting industry.'
    }
  }

  render() {
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>{this.state.name}</Text>
        <Text>{this.state.description}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>RESTAURANT HOURS</Text>
        <Text>{this.state.hours}</Text>
      </View>
    )
  }

}

export default Information;