import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MenuCards from './cards';
import Tab from 'modules/generic/TabOptions';
import FLoatingButton from 'modules/generic/CircleButton';
import Main from './main';
import Information from './information';
import Footer from 'modules/generic/Footer';
import Header from '../generic/MenuHeader';
import Swipe from 'modules/modal/Swiper2';

const Images = [
  { id: "1", uri: require('assets/test.jpg'), title: "Italian Pizza", location: "Cebu City, Philippines"},
  { id: "2", uri: require('assets/logo_white.png'), title: "Siml Logo", location: "Cebu City, Philippines" },
  { id: "3", uri: require('assets/test2.jpg'), title: "French Burger", location: "Cebu City, Philippines" },
  { id: "4", uri: require('assets/logo_white.png'), title: "Siml", location: "Cebu City, Philippines" },
  { id: "5", uri: require('assets/test.jpg'), title: "Italian Pizza", location: "Cebu City, Philippines" },
]

class Menu extends Component{
  constructor(props){
		super(props);
		this.state = {
			choice: 'Menu'
		}
	}

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Header {...this.props}></Header>
        </View>
        {/* <ScrollView> */}
        <View>
          <Swipe topFloatButton={false} bottomFloatButton={true} images={Images}></Swipe>
        </View>
      {/* </ScrollView> */}
      <Footer layer={1} {...this.props}/>
      </View>
    )
  }

}

export default Menu;