import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { BasicStyles, Color } from 'common'
import LocationInput from 'components/InputField/LocationInput'
import NumberInput from 'components/InputField/NumberInput'
import InputSelect from 'components/InputField/InputSelect'
import Range from 'components/InputField/Range'
import Slider from 'components/InputField/Slider'
import DateTimePicker from 'components/DateTime/index.js'
import Footer from 'modules/generic/Footer'
import Style from './Style'

class Retails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    }
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
          <Text style={{color: 'black', marginLeft: 20, marginBottom: -10, marginTop: 20 }}>Category</Text>
          <TextInput
            style={[BasicStyles.formControls, {marginLeft: 20, width: 315 }]}
            onChangeText={(input) => this.setInput(input)}
            value={this.state.input}
            placeholder={this.props.placeholder ? this.props.placeholder : 'Categories'}
          />
          <Text>
            <InputSelect placeholder={'Product Type'} title={'Product Type'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Style'} title={'Style'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Brand'} title={'Brand'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Size'} title={'Size'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Body Fit'} title={'Body Fit'} />
          </Text>
          <Text>
            <InputSelect placeholder={'Colour'} title={'Colour'} />
          </Text>
          <Text>
            <Range placeholder={'$1-$100'} title={'Price Range'} />
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
export default Retails;
