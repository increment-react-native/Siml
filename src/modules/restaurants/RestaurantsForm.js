import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BasicStyles, Color } from 'common'
import Footer from 'modules/generic/Footer'
import Style from './Style'
import LocationInput from 'components/InputField/LocationInput'
import NumberInput from 'components/InputField/NumberInput'
import InputSelect from 'components/InputField/InputSelect'
import Range from 'components/InputField/Range'
import Slider from 'components/InputField/Slider'
import DateTimePicker from 'components/DateTime/index.js'
import TextInputWithLabel from '../../components/Form/TextInputWithLabel';

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      party: 1
    }
  }

  redirect(route, layer){
    this.props.navigation.navigate(route)
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
        <View>
          <Text>
            <LocationInput title={'Location'} onTyping={(input) => this.setState({ location: input })}/>
          </Text>
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
          <Text>
            <NumberInput placeholder={'0'} title={'Party Size'} onTyping={(clicks) => this.setState({ party: clicks })} />
            <Range placeholder={'$1-$100'} title={'Price Range'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Cuisines'} title={'Cuisines'} />
          </Text>
          <Text>
            <Slider title={'Radius'} />
          </Text>

        </View>

        <View style={{
          width: '33%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:'140%',
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
export default Restaurants;
