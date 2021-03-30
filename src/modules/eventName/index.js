import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, CheckBox, Modal, ImageBackground, Alert } from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import CustomizedButton from 'modules/generic/CustomizedButton';
import Config from 'src/config.js';
import Group from 'modules/generic/PeopleList.js'
import { connect } from 'react-redux';
import Api from 'services/api/index.js';
import { Spinner } from 'components';

class EventName extends Component {
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
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} },
        { user:{profile: {uri: require('assets/test.jpg')}} }
      ],
      isLoading: false
    }
  }
  onClick = () => {
    if(this.props.navigation.state?.params?.buttonTitle === 'Cancel') {
      this.deleteItem();
    } else {
      this.addToReservation();
    }
  }

  redirect(route){
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
        {text: 'Close', onPress: () => {return}, style: 'cancel'},
        {text: 'Confirm', onPress: () => {
          let parameter = {
            id: this.props.navigation?.state?.params?.data?.id, 
            status: 'cancelled'
          }
          this.setState({isLoading: true});
          Api.request(Routes.reservationUpdate, parameter, response => {
            this.setState({ isLoading: false })
            if (response.data !== null) {
              this.props.navigation.navigate('historyStack', {title: 'Upcoming'})
            }
          })
        }},
      ],
      { cancelable: false }
    )
  }

  addToReservation = () => {
    Alert.alert(
      '',
      'Please click "OKAY" to continue',
      [
        {text: 'Cancel', onPress: () => {return}, style: 'cancel'},
        {text: 'Okay', onPress: () => {
          let parameter = {
            account_id: this.props.state.user.id,
            merchant_id: this.props.navigation?.state?.params?.data?.merchant?.id,
            payload: 'synqt',
            payload_value: this.props.navigation?.state?.params?.data?.synqt[0]?.id,
            details: this.props.navigation?.state?.params?.data?.synqt[0]?.details,
            datetime: this.props.navigation?.state?.params?.data?.synqt[0]?.date,
            status: 'pending'
          }
          this.setState({ isLoading: true })
          Api.request(Routes.reservationCreate, parameter, response => {
            this.setState({ isLoading: false })
            if (response.data !== null) {
              this.props.navigation.navigate('historyStack', {title: 'History'})
            }
          },
            error => {
              this.setState({ isLoading: false })
              console.log({ error });
            },
          );
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={{
        backgroundColor: 'white',
        width: '100%',
        backgroundColor: 'white',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        padding: 15,
        height: '100%'
      }}>
        <ImageBackground
          style={{ 
            width: '100%',
            height: '50%'
          }}
          imageStyle={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
          source={{ uri: Config.BACKEND_URL + data.merchant.logo }}>
          <View style={{ position: 'absolute', bottom: 20 }}>
            <Text style={{
              color: 'white',
              left: 10,
              fontSize: 20,
              fontWeight: 'bold',
              textShadowColor:'black',
              textShadowOffset:{width: 1, height: 1},
              textShadowRadius: 1,}}>
                {data.merchant.name}
              </Text>
            <Text style={{
              color: 'white',
              left: 10,
              textShadowColor:'black',
              textShadowOffset:{width: 1, height: 1},
              textShadowRadius: 1,
            }}>
              {data.merchant.address}
            </Text>
          </View>
          <View style={{ position: 'absolute', bottom: 20, right: 15, flexDirection: 'row' }}>
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'#FFCC00'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'white'}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={30}
              color={'white'}
            />
          </View>
        </ImageBackground>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
        }}>
          {this.state.isLoading ? <Spinner mode="overlay" /> : null}
          <FontAwesomeIcon icon={faUser} size={20} color={Color.gray} style={{ marginRight: 10 }} />
          <Text style={{ color: Color.gray, marginRight: '30%'}}>{this.state.group.length} people</Text>
          <FontAwesomeIcon icon={faClock} size={20} color={Color.gray} style={{ marginRight: 10 }} />
          <Text style={{ color: Color.gray, marginRight: '30%'}}>{data.synqt[0].date}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          paddingBottom: 15
        }}>
          <Group redirectTo={() => this.goesTo()} data={this.state.group}/>
        </View>
          <CustomizedButton onClick={this.onClick} title={this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.buttonTitle && this.props.navigation.state.params.buttonTitle}></CustomizedButton>
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
)(EventName);