import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { BasicStyles, Color } from 'common'
import InputSelect from 'components/InputField/InputSelect'
import Range from 'components/InputField/Range'
import Group from 'modules/generic/PeopleList.js'

const group = [
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} },
  { user:{profile: {uri: require('assets/test.jpg')}} }
]


class Retails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    }
  }

  goesTo = () => {
    this.redirect('peopleListStack')
  }

  prod = () => {
    this.redirect('peopleListStack')
  }

  redirect(route){
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
          <Text style={{color: 'black', marginLeft: 20, marginBottom: -10, marginTop: 20 }}>Category</Text>
          <TextInput
            style={[BasicStyles.formControls, {marginLeft: 20, width: '90%' }]}
            // onChangeText={(input) => this.setInput(input)}
            value={this.state.input}
            placeholder={'Categories'}
            onClick={() => this.redirect('peopleListStack')}
          />
          <InputSelect style={{width: '100%'}} routeTo={() => this.prod()} placeholder={'Product Type'} title={'Product Type'} />
          <InputSelect placeholder={'Style'} routeTo={() => this.prod()} title={'Style'} />
          <InputSelect placeholder={'Brand'} routeTo={() => this.prod()} title={'Brand'} />
          <InputSelect placeholder={'Size'} routeTo={() => this.prod()} title={'Size'} />
          <InputSelect placeholder={'Body Fit'} routeTo={() => this.prod()} title={'Body Fit'} />
          <InputSelect placeholder={'Colour'} routeTo={() => this.prod()} title={'Colour'} />
          <Text>
            <Range placeholder={'$1-$100'} title={'Price Range'} />
          </Text>
          <Text style={{marginLeft: 20, marginBottom: 5}}>People in this SYNQT</Text>
          {/* <FontAwesomeIcon
            icon={faPlusCircle}
            size={30}
            style={{
              color: Color.primary,
              marginLeft: 20
            }}
            onPress={() => this.redirect('peopleListStack')}
          /> */}
          <Group style={{marginLeft: 50, marginTop: -30}} redirectTo={() => this.goesTo()} data={group}/>

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
export default Retails;
