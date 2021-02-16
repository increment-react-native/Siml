import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
import PostCard from 'modules/generic/PostCard';
const height = Math.round(Dimensions.get('window').height);
class Status extends Component{
  constructor(props){
    super(props);
  }
  render() {
    const data = [{
      user: {
        username: 'Gemma Pearson',
        profile: null
      },
      date: 'Just now',
      message: 'Anyone interested going out tonight? Just join my SIML below.',
      joined_status: true
    }, {
      user: {
        username: 'Rebecca Pearson',
        profile: null
      },
      date: 'Just now',
      message: 'Anyone interested going out tonight? Just join my SIML below.',
      joined_status: false
    }, {
      user: {
        username: 'Kennette Canales',
        profile: null
      },
      date: '1 minute ago',
      message: 'Anyone interested going out tonight? Just join my SIML below.',
      joined_status: false
    }]
    return (
      <SafeAreaView>
        <ScrollView style={{
          backgroundColor: Color.containerBackground
        }}
        showsVerticalScrollIndicator={false}
        >
          <View style={{
            marginTop: 10,
            flex: 1,
            marginBottom: 100
          }}>
            {
              data && data.map((item, index) => (
                <PostCard data={item} />
              ))
            }
          </View>
        </ScrollView>

        <Footer layer={1} {...this.props}/>
      </SafeAreaView>
    );
  }
}
export default Status;