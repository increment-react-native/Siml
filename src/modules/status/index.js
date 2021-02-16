import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
import PostCard from 'modules/generic/PostCard';
const height = Math.round(Dimensions.get('window').height);
const sample = [{
  id: 1,
  user: {
    username: 'Gemma Pearson',
    profile: null
  },
  date: 'Just now',
  message: 'Anyone interested going out tonight? Just join my SIML below.',
  joined_status: true
}, {
  id: 2,
  user: {
    username: 'Rebecca Pearson',
    profile: null
  },
  date: 'Just now',
  message: 'Anyone interested going out tonight? Just join my SIML below.',
  joined_status: false
}, {
  id: 3,
  user: {
    username: 'Kennette Canales',
    profile: null
  },
  date: '1 minute ago',
  message: 'Anyone interested going out tonight? Just join my SIML below.',
  joined_status: false
}]
class Status extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: sample
    }
  }

  onChangeDataHandler = (item) => {
    const { data } = this.state;
    if(data == null){
      return
    }
    let temp = data.map((iItem, iIndex) => {
      if(iItem.id == item.id){
        return item
      }
      return iItem
    })

    this.setState({
      data: temp
    })
  }

  render() {
    const { data } = this.state; 
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
                <PostCard
                  data={item}
                  onLike={(params) => this.onChangeDataHandler(params)}
                  onJoin={(params) => this.onChangeDataHandler(params)}
                  />
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