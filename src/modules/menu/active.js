import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native';
import { Dimensions } from 'react-native';

class Active extends Component{
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      size: ['test', 'test1', 'test2', 'test4', 'test5']
    }
  }

  render() {
    const width = Math.round(Dimensions.get('window').width) - 45
    return (
        <View style={{width: '100%', flexDirection: 'row', padding: 5}}>
          {this.state.size.length > 0 && this.state.size.map((item, index) => {
            return (
              <View key={index} style={{backgroundColor: this.state.index === index ? 'white' : '#bfbfbf', height: 5, borderWidth: 1, borderRadius: 5, borderColor: 'white', width: (width/this.state.size.length)- width%this.state.size.length, marginRight: 3}}>
                <Text></Text>
              </View>
            )
          })}
        </View>
    )
  }

}

export default Active;