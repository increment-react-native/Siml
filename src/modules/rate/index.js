import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, CheckBox, Modal, ImageBackground, Alert, Dimensions } from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import CustomizedButton from 'modules/generic/CustomizedButton';
import Config from 'src/config.js';
import Group from 'modules/generic/PeopleList.js'
import { connect } from 'react-redux';
import Api from 'services/api/index.js';
import { Spinner } from 'components';
const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)
class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      isLoading: false,
      data: null
    }
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve = () => {
    let parameter = {
      condition: [{
        value: this.props.navigation.state?.params?.synqtId,
        column: 'id',
        clause: '='
      }]
    }
    console.log(parameter);
    this.setState({ isLoading: true })
    Api.request(Routes.synqtRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      console.log(response, 'response');
    })
  }

  onClick = () => {
    let parameter = {
      account_id: this.props.user.id,
      payload: '',
      payload_value: '',
      payload_1: '',
      payload_value_1: '',
      value: '',
      comments: this.state.comment
    }
    this.setState({ isLoading: true })
    Api.request(Routes.reservationCreate, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data !== null) {
        this.props.navigation.navigate('historyStack', { title: 'History' })
      }
    },
      error => {
        this.setState({ isLoading: false })
        console.log({ error });
      },
    );
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        <ScrollView style={{marginBottom: 100}}>
          <View style={{
            backgroundColor: 'white',
            width: '100%',
            backgroundColor: 'white',
            padding: 15,
            height: height - (height / 1.7),
          }}>
            <Image
              style={{
                width: '100%',
                height: '80%',
                borderRadius: 10
              }}
              source={data?.merchant?.logo ? { uri: Config.BACKEND_URL + data?.merchant?.logo } : require('assets/test.jpg')}>
            </Image>
            <View style={{ padding: 10 }}>
              <Text style={{
                fontSize: 16,
              }}>
                SYNQT: RESTAURANT
            </Text>
              <View style={{
                marginTop: 5,
                flexDirection: 'row'
              }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={13} style={{ marginTop: 3, marginRight: 5 }} />
                <Text>
                  Cebu, City
            </Text>
              </View>
              <View style={{ position: 'absolute', top: 10, right: 0, flexDirection: 'row' }}>
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  color={'#FFCC00'}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  color={'#FFCC00'}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  color={'#FFCC00'}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  color={'#FFCC00'}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size={20}
                  color={'#FFCC00'}
                />
              </View>
            </View>
          </View>
          <View style={{
            height: 50,
            width: width,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Color.gray
          }}>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30
          }}>
            <Text>How would you rate the service of our restaurant?</Text>
            <View style={{ flexDirection: 'row', padding: 30 }}>
              <FontAwesomeIcon
                icon={faStar}
                size={40}
                color={'#FFCC00'}
              />
              <FontAwesomeIcon
                icon={faStar}
                size={40}
                color={'#FFCC00'}
              />
              <FontAwesomeIcon
                icon={faStar}
                size={40}
                color={'#FFCC00'}
              />
              <FontAwesomeIcon
                icon={faStar}
                size={40}
                color={'#ededed'}
              />
              <FontAwesomeIcon
                icon={faStar}
                size={40}
                color={'#ededed'}
              />
            </View>
            <Text>Tell us about your experience</Text>
            <TextInput
              style={{
                borderColor: Color.gray,
                borderWidth: .5,
                borderRadius: 15,
                width: '90%',
                marginTop: 10,
              }}
              multiline={true}
              numberOfLines={5}
              onChangeText={text => this.setState({ comment: text })}
              value={this.state.comment}
              placeholder=""
            />
          </View>
        </ScrollView>
        <CustomizedButton style={{ marginLeft: -20 }} onClick={this.onClick} title={'Submit'}></CustomizedButton>
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });


const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    updateUser: (user) => dispatch(actions.updateUser(user)),
    setDefaultAddress: (defaultAddress) => dispatch(actions.setDefaultAddress(defaultAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rate);