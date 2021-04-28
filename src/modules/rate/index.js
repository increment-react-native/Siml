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
      data: [
        { title: 'Retail 1', price: '100.00', quantity: 2 },
        { title: 'Retail 2', price: '61.00', quantity: 5 },
        { title: 'Retail 3', price: '7.00', quantity: 1 }
      ],
      value: null,
      placeOrder: false,
      group: [
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } },
        { user: { profile: { uri: require('assets/test.jpg') } } }
      ],
      isLoading: false
    }
  }
  onClick = () => {
    if (this.props.navigation.state?.params?.buttonTitle === 'Cancel') {
      this.deleteItem();
    } else {
      this.addToReservation();
    }
  }

  redirect(route) {
    this.props.navigation.navigate(route)
  }

  goesTo = () => {
    this.redirect('peopleListStack')
  }

  deleteItem = () => {
    Alert.alert(
      '',
      'Confirm cancellation',
      [
        { text: 'Close', onPress: () => { return }, style: 'cancel' },
        {
          text: 'Confirm', onPress: () => {
            let parameter = {
              id: this.props.navigation?.state?.params?.data?.id,
              status: 'cancelled'
            }
            this.setState({ isLoading: true });
            Api.request(Routes.reservationUpdate, parameter, response => {
              this.setState({ isLoading: false })
              if (response.data !== null) {
                this.props.navigation.navigate('historyStack', { title: 'Upcoming' })
              }
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  addToReservation = () => {
    Alert.alert(
      '',
      'Please click "OKAY" to continue',
      [
        { text: 'Cancel', onPress: () => { return }, style: 'cancel' },
        {
          text: 'Okay', onPress: () => {
            this.setState({ isLoading: true })
            Api.request(Routes.reservationCreate, this.props.navigation.state?.params?.parameter, response => {
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
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { data } = this.props.navigation.state.params;
    // console.log(data, 'hhhh');
    return (
      <ScrollView>
        <View style={{
          backgroundColor: 'white',
          width: '100%',
          backgroundColor: 'white',
          padding: 15,
          height: height - (height / 2),
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
          {/* <CustomizedButton style={{marginLeft:-20}} onClick={this.onClick} title={this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.buttonTitle && this.props.navigation.state.params.buttonTitle}></CustomizedButton> */}
        </View>
          <View style={{
            height: 50,
            width: width,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Color.gray
          }}>

          </View>
      </ScrollView>
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