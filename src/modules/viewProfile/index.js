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
import { connect } from 'react-redux';
import Config from 'src/config.js';
import _ from 'lodash';
import Api from 'services/api/index.js';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      phoneNumber: null,
      email: null,
      choice: 'SIML ACTIVITY',
      connections: [],
      isVisible: false
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.state?.params?.user, "=====");
    this.retrieve(false)
  }

  retrieve(flag) {
    const { user } = this.props.state
    if (user == null) {
      return
    }
    let parameter = {
      condition: [{
        value: this.props.navigation.state?.params?.user?.account_id,
        column: 'account_id',
        clause: 'or'
      }, {
        value: this.props.navigation.state?.params?.user?.account_id,
        column: 'account',
        clause: '='
      }, {
        clause: "like",
        column: "status",
        value: 'accepted'
      }],
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
    }
    this.setState({ isLoading: true })
    Api.request(Routes.circleRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        this.setState({
          connections: flag == false ? response.data : _.uniqBy([...this.state.connections, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          connections: flag == false ? [] : this.state.connections,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    });
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
    return (
      <View>
        {
          this.state.connections.length > 0 && this.state.connections.map((el, idx) => {
            return (
              <TouchableOpacity>
                {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                <ListItem key={idx}>
                  <Image
                    style={Style.circleImage}
                    // resizeMode="cover"
                    source={el.account?.profile?.url ? { uri: Config.BACKEND_URL + el.account?.profile?.url } : require('assets/logo.png')}
                  />
                  <View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ width: '50%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{el?.account?.information?.first_name + ' ' + el?.account?.information?.last_name}</Text>
                        <Text style={{ fontStyle: 'italic' }}>{el?.account?.information?.address}</Text>
                        <Text style={{ color: 'gray', fontSize: 10 }}>{el.numberOfConnection} similar connections</Text>
                      </View>
                      <TouchableOpacity
                        // onPress={() => this.changeTab(idx)}
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
    let user = this.props.navigation.state?.params?.user
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
                <Image source={user && user?.account?.profile?.url ? { uri: Config.BACKEND_URL + user.account.profile.url } : require('assets/logo.png')} style={{
                  height: 176,
                  width: 176,
                  borderRadius: 100,
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
              }}>{user?.account?.information?.first_name + user?.account?.information?.last_name || ''}</Text>
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

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(ViewProfile);