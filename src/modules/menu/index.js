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
import Swiper from 'modules/modal/Swiper';

class Menu extends Component{
  constructor(props){
		super(props);
		this.state = {
			choice: 'Menu'
		}
	}

  render() {
    return (
      <View>
        <View>
          <Header {...this.props}></Header>
        </View>
        <ScrollView>
        <View><Swiper topFloatButton={false} bottomFloatButton={true}></Swiper></View>
      </ScrollView>
      <Footer layer={1} {...this.props}/>
      </View>
    )
  }

}

export default Menu;