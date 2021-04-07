import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SliderPicker } from 'react-native-slider-picker';
import { BasicStyles, Color, Routes } from 'common'
import LocationInput from 'components/InputField/LocationInput'
import NumberInput from 'components/InputField/NumberInput'
import InputSelect from 'components/InputField/InputSelect'
import Range from 'components/InputField/Range'
import Slider from 'components/InputField/Slider'
import DateTimePicker from 'components/DateTime/index.js'
import Group from 'modules/generic/PeopleList.js'
import { connect } from 'react-redux';
import Api from 'services/api';
import { Spinner } from 'components';


const group = [
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} }
]

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      value: '$1-$100',
      selectVal: null,
      val: 1,
      Date: null,
      isLoading: false
    }
  }
  componentDidMount() {
    const {setDefaultAddress} = this.props;
    setDefaultAddress(null);
  }

  redirect(route){
    this.props.navigation.navigate(route)
  }

  goesTo = () => {
    this.redirect('peopleListStack')
  }

  createSynqt = () => {
    let parameter = {
      account_id: this.props.state.user.id,
      location_id: this.props.state.defaultAddress?.id,
      date: this.state.Date?.date + ' ' + this.state.Date?.time,
      status: 'pending',
      details: 'restaurant'
    }
    console.log(parameter, Routes.synqtCreate, 'test');
    this.setState({ isLoading: true })
    Api.request(Routes.synqtCreate, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data !== null) {
        this.sendInvitation(response.data);
        const {setDefaultAddress} = this.props;
        setDefaultAddress(null);
        this.setState({Date: null})
        this.props.navigation.navigate('menuStack', {synqt_id: response.data})
      }
    });
  }

  sendInvitation = (id) => {
    const { tempMembers } = this.props.state;
    tempMembers.length > 0 && tempMembers.map((item, index) => {
      let parameter = {
        from: this.props.state.user.id,
        to: item.account.id,
        payload: 'synqt',
        payload_value: id,
        route: `/restaurant/${item.account?.code}`
      }
      this.setState({ isLoading: true });
      Api.request(Routes.notificationCreate, parameter, response => {
        this.setState({ isLoading: false })
        console.log(response, "===response");
      });
    })
  }
  
  render() {
    return (
      <View style={{
        flex: 1,
        height: '100%'
      }}>
        <ScrollView style={{
          backgroundColor: Color.containerBackground,
          height: '100%'
        }}
        showsVerticalScrollIndicator={false}
        >
          {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        <View>
          <View style={{
            marginTop: '7%',
            marginLeft: 20,
          }}>
          <Text>Location</Text>
          <TouchableOpacity
            style={{
              height: 50,
              borderRadius: 25,
              borderWidth: .3,
              marginRight: 20,
              marginBottom: 20,
              borderColor: Color.gray,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 3
            }}
            onPress={() => {this.props.navigation.navigate('addLocationStack')}}>
              <Text style={{color: Color.gray}}>{this.props.state.defaultAddress?.route || 'Type your location' }</Text>
          </TouchableOpacity>
          </View>
          <View style={{
            marginLeft: 20,
            marginRight: 20}}>
            <Text>Date and Time</Text>
            <DateTimePicker
              type={'datetime'}
              placeholder={'Select Date and Time'}
              onFinish={(date) => {
                this.setState({
                  Date: date
                })
              }}
              style={{
                marginTop: 5
            }} />
          </View>
          <View style={{marginBottom: '23%'}}>
            <NumberInput title={'Party Size'} />
          </View>
          <View style={{marginBottom: '23%'}}>
          <Range value={this.state.value.toString()} title={'Price Range'} />
          </View>
          <View>
          <InputSelect titles={'cuisines'} value={this.state.selectVal} title={'Cuisines'} />
          </View>
          <Text style={{color: 'black', marginBottom: 15, marginLeft: 20 }}>Radius</Text>
          <SliderPicker 
            callback={position => {
              this.setState({ val: position })
            }}
            defaultValue={this.state.val}
            labelFontColor={"#6c7682"}
            labelFontWeight={'600'}
            showFill={true}
            fillColor={'gray'}
            labelFontWeight={'bold'}
            showNumberScale={true}
            showSeparatorScale={true}
            buttonBackgroundColor={'#fff'}
            buttonBorderWidth={2}
            labelFontSize={15}
            scaleNumberFontWeight={'300'}
            buttonDimensionsPercentage={6}
            buttonBorderColor={'#5842D7'}
            heightPercentage={1}
            widthPercentage={90}
            sliderInnerBackgroundColor={'gray'}
            minLabel={'1km'}
            midLabel={'25km'}
            maxLabel={'50km'}
            maxValue={50}
          />
          <Text style={{marginLeft: 20, marginBottom: 5}}>People in this SYNQT</Text>
          <Group style={{marginLeft: 50, marginTop: -30}} redirectTo={() => this.goesTo()} data={this.props.state.tempMembers}/>
        </View>

        <View style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:'30%',
          marginLeft: '35%'
        }}>
          <TouchableOpacity
          onPress={() => this.createSynqt()}
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: Color.primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('assets/logo.png')} style={{
              height: 50,
              width: 50
            }}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
        {/* <Footer layer={1} {...this.props}/> */}
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });


const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    updateUser: (user) => dispatch(actions.updateUser(user)),
    setDefaultAddress: (defaultAddress) => dispatch(actions.setDefaultAddress(defaultAddress)),
    setTempMembers: (tempMembers) => dispatch(actions.setTempMembers(tempMembers))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants);
