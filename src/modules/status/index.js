import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
class Status extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        <ScrollView style={{
          backgroundColor: Color.containerBackground
        }}
        showsVerticalScrollIndicator={false}
        >
          <View>
            <Text> Status Page here </Text>
          </View>
        </ScrollView>

        <Footer layer={1} {...this.props}/>
      </View>
    );
  }
}
export default Status;