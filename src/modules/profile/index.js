import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faEdit} from '@fortawesome/free-solid-svg-icons';
import Style from './Style';
import CustomizedButton from 'modules/generic/CustomizedButton';
class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      fullName: null,
      phoneNumber: null,
      email: null
    }
  }

  fullNameHandler = (value) => {
    this.setState({fullName: value})
  }

  phoneNumberHandler = (value) => {
    this.setState({phoneNumber: value})
  }

  emailHandler = (value) => {
    this.setState({email: value})
  }

  render() {
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
        }]}>
          <ScrollView>
          <View style={{borderBottomWidth: .3, borderColor: '#555555'}}>
            <View style={Style.TopView}>
              <TouchableOpacity
                style={{
                  height: 180,
                  width: 180,
                  borderRadius: 100,
                  borderColor: Color.primary,
                  borderWidth: 2
                }}>
                <Image source={require('assets/logo.png')} style={{
                  height: 180,
                  width: 180
                }}/>
                <FontAwesomeIcon style={{marginRight: 5, position: 'absolute', right: 5, bottom: 15}} icon={faEdit} size={20} color={Color.blue}/>
              </TouchableOpacity>
            </View>
            <View style={{
              width: '100%'
            }}>
              <Text style={{
                textAlign: 'center',
                color: '#333333'
              }}>Tap to edit profile</Text>
            </View>
            <View style={Style.BottomView}>
              <FontAwesomeIcon style={{marginRight: 5}} icon={faCheckCircle} size={20} color={Color.blue}/>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              }}>Lalaine Garrido</Text>
            </View>
          </View>
          <View style={{
              padding: 25,
              textAlign: 'center',
              justifyContent: 'center'}}>
            <Text style={Style.TextStyle}>Full Name</Text>
            <TextInput
              style={Style.TextInput}
              onChangeText={text => this.fullNameHandler(text)}
              value={this.state.fullName}
              placeholder='   Enter Full Name'
            />
            <Text style={Style.TextStyle}>Phone Number</Text>
            <TextInput
              style={Style.TextInput}
              onChangeText={text => this.phoneNumberHandler(text)}
              value={this.state.phoneNumber}
              placeholder='   Enter Phone Number'
            />
            <Text style={Style.TextStyle}>Email</Text>
            <TextInput
              style={{
                marginBottom: 120,
                marginTop: 15,
                height: 55,
                borderColor: Color.gray,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderRadius: 50,
                padding: 10}}
              onChangeText={text => this.emailHandler(text)}
              value={this.state.email}
              placeholder='   Enter Email'
            />
          <CustomizedButton title={'Update'}></CustomizedButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Profile;