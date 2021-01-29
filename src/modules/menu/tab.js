import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Style from './Style.js'

class Tab extends Component{
  constructor(props){
    super(props);
    this.state = {
        choice: 'Menu'
    }
  }

  choiceHandler = (value) => {
    this.setState({choice: value});
    this.props.onClick(value)
  }

  render() {
    return (
      <View style={Style.Tab}>
        <TouchableOpacity style={this.state.choice == 'Menu' ? Style.MenuClicked : Style.Menu} onPress={() => this.choiceHandler('Menu')}>
          <Text style={this.state.choice == 'Menu' ? {color: 'white', marginTop: 12} : {color: 'black', marginTop: 12}}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.state.choice == 'Information' ? Style.InformationClicked : Style.Information} onPress={() => this.choiceHandler('Information')}>
          <Text style={this.state.choice == 'Information' ? {color: 'white', marginTop: 12} : {color: 'black', marginTop: 12}}>Information</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default Tab;