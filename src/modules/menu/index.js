import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MenuCards from './cards';
import Tab from './tab';
import FLoatingButton from './floatingButton';
import Main from './main';
import Information from './information';

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
				<ScrollView>
					<View style={{padding: 15}}>
						<Main></Main>
						</View>
					<View style={{marginTop: 20}}>
						<Tab onClick={this.choiceHandler}></Tab>
					</View>
					<View style={{marginBottom: 200, padding: 20}}>
						{this.state.choice == 'Menu' ? (
							<MenuCards/>
						) : <Information/>}
					</View>
				<FLoatingButton></FLoatingButton>
				</ScrollView>
    )
  }

}

export default Menu;