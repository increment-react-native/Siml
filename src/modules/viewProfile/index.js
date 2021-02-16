import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import Style from './Style';
import CustomizedButton from 'modules/generic/CustomizedButton';
import ImageCardWithUser from 'modules/generic/ImageCardWithUser';
import Tab from 'modules/generic/TabOptions';
import CardModal from 'modules/modal/Swipe.js';
class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      phoneNumber: null,
      email: null,
      choice: 'SIML ACTIVITY',
      AcceptConnections: [
        { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
        { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
        { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
        { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
      ],
      isVisible: false
    }
  }

  choiceHandler = (value) => {
    this.setState({ choice: value })
  }

  fullNameHandler = (value) => {
    this.setState({ fullName: value })
  }

  phoneNumberHandler = (value) => {
    this.setState({ phoneNumber: value })
  }

  emailHandler = (value) => {
    this.setState({ email: value })
  }

  renderConnections() {
    const AcceptConnections = [
      { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
      { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
      { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
      { name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg') },
    ]
    return (
      <View>
        {
          AcceptConnections.map((el, idx) => {
            return (
              <TouchableOpacity>
                {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                <ListItem key={idx}>
                  <Image
                    style={Style.circleImage}
                    // resizeMode="cover"
                    source={el.uri}
                  />
                  <View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ width: 130 }}>
                        <Text style={{ fontWeight: 'bold' }}>{el.name}</Text>
                        <Text style={{ fontStyle: 'italic' }}>{el.address}</Text>
                        <Text style={{ color: 'gray', fontSize: 10 }}>{el.numberOfConnection} similar connections</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.changeTab(idx)}
                        style={{
                          ...Style.actionBtn,
                          backgroundColor:'#4DD965'
                        }}
                      >
                        <Text style={{ color: 'white' }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ListItem>
                {/* </Card> */}
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }


  renderSimlActivity() {
    const height = Math.round(Dimensions.get('window').height);
    const data = [{
      image: require('assets/test2.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }, {
        name: 'Test'
      }]
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }]
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }]
    }]
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            height: height,
            marginTop: 50,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%'
          }}>
            {
              data.map((item, index) => (
                <ImageCardWithUser
                  data={item} style={{
                    marginBottom: 20
                  }}
                  onClick={(item) => {
                    this.setState({
                      isVisible: true
                    })
                  }}
                />
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  render() {
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        <ScrollView>
          <View>
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
                }} />
              </TouchableOpacity>
            </View>
            <View style={Style.BottomView}>
              <FontAwesomeIcon
                style={{ marginRight: 5 }}
                icon={faCheckCircle}
                size={20}
                color={Color.blue} />
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              }}>Lalaine Garrido</Text>
            </View>
            <View style={{
              width: '100%'
            }}>
              <Text style={{
                textAlign: 'center',
                color: '#333333'
              }}>3 similar connections</Text>
            </View>

          </View>
          <View style={{
            marginTop: 25,
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <Tab level={1} choice={['SIML ACTIVITY', 'CONNECTIONS']} onClick={this.choiceHandler}></Tab>
          </View>
          <View>
            {this.state.choice === 'SIML ACTIVITY' ? (
              this.renderSimlActivity()
            ) :
              this.renderConnections()}
          </View>
          {this.state.isVisible && <CardModal
          visisble={this.state.isVisible}
          onClose={() => {
          this.setState({
            isVisible: false
          })
        }}/>}
        </ScrollView>
      </View>
    );
  }
}
export default ViewProfile;