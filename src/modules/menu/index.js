import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MenuCards from './cards';
import Tab from 'modules/generic/TabOptions';
import FLoatingButton from 'modules/generic/CircleButton';
import Main from './main';
import Information from './information';
import Footer from 'modules/generic/Footer'

class Menu extends Component{
  constructor(props){
		super(props);
		this.state = {
			choice: 'Menu'
		}
	}

	choiceHandler = (value) => {
		this.setState({choice: value})
	}

  render() {
    return (
      <View>
      <ScrollView>
        <View  style={{padding: 20}}>
          <View>
            <Main></Main>
            </View>
          <View style={{marginTop: 10}}>
            <Tab level={1} choice={['Menu', 'Information']} onClick={this.choiceHandler}></Tab>
          </View>
          <View style={{marginBottom: 200}}>
            {this.state.choice == 'Menu' ? (
              <MenuCards/>
            ) : 
              <Information 
                name={'Bangtan Sonyeondan'}
                hours={['7 AM - 7 PM (Weekdays)', '7 AM - 11 PM (Weekends)']}
                description={' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. It is simply dummy text of the printing and typesetting industry.'}
              />}
          </View>
          <FLoatingButton></FLoatingButton>
        </View>
      </ScrollView>
      <Footer layer={1} {...this.props}/>
      </View>
    )
  }

}

export default Menu;