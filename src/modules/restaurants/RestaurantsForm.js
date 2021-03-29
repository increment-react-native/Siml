import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SliderPicker } from 'react-native-slider-picker';
import { BasicStyles, Color } from 'common'
import LocationInput from 'components/InputField/LocationInput'
import NumberInput from 'components/InputField/NumberInput'
import InputSelect from 'components/InputField/InputSelect'
import Range from 'components/InputField/Range'
import Slider from 'components/InputField/Slider'
import DateTimePicker from 'components/DateTime/index.js'
import Group from 'modules/generic/PeopleList.js'
import { connect } from 'react-redux';


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
      val: 1
    }
  }

  redirect(route){
    this.props.navigation.navigate(route)
  }

  goesTo = () => {
    this.redirect('peopleListStack')
  }
  
  render() {
    console.log(this.props.state, "uo");
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
              paddingLeft: 30,
              marginTop: 3
            }}
            onPress={() => {this.props.navigation.navigate('addLocationStack')}}>
              <Text style={{color: Color.gray}}>{this.props.state.location?.address + ' ' + this.props.state.location?.locality + ' ' + this.props.state.location?.country || 'Type your location' }</Text>
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
                  Date: date.date
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
          <Group style={{marginLeft: 50, marginTop: -30}} redirectTo={() => this.goesTo()} data={group}/>
        </View>

        <View style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:'30%',
          marginLeft: '35%'
        }}>
          <TouchableOpacity
          onPress={() => this.redirect('menuStack')}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants);
