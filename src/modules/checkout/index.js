import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import CustomizedButton from 'modules/generic/CustomizedButton';
import RadioForm from 'react-native-simple-radio-button';
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { title: 'Retail 1', price: '100.00', quantity: 2 },
        { title: 'Retail 2', price: '61.00', quantity: 5 },
        { title: 'Retail 3', price: '7.00', quantity: 1 }
      ],
      value: null,
      placeOrder: false
    }
  }

  addQuantity = (index) => {
    let data = this.state.data;
    data[index].quantity += 1;
    this.setState({ data: data });
  }

  subtractQuantity = (index) => {
    if (this.state.data[index].quantity > 1) {
      let data = this.state.data;
      data[index].quantity -= 1;
      this.setState({ data: data });
    }
  }

  placeOrders = () => {
    this.setState({ placeOrder: true });
  }

  renderOrderDetails = () => {
    return (
      this.state.data.map(item => {
        return (
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image source={require('assets/logo.png')} style={{
              height: 100,
              width: 90,
              marginRight: 30,
              marginLeft: 30
            }} />
            <Text style={{ marginTop: 25 }}>{item.title}</Text>
            <Text style={{
              position: 'absolute',
              right: 10,
              bottom: 10
            }}>P 6, 000.00</Text>
          </View>
        )
      })
    )
  }

  renderPlaceOrder = () => {
    return (
      <BottomSheet
        isVisible={this.state.placeOrder}
        containerStyle={{ backgroundColor: 'white' }}
      >
        <View style={{
          backgroundColor: 'white',
          paddingTop: 60,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 900
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <Text style={{ color: Color.primary }}>Thank you! Your order has been received.</Text>
          </View>
          <View style={{ padding: 25 }}>
            {this.renderOrderDetails()}
          </View>
          <View style={{ padding: 25 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Subtotal</Text>
              <Text style={{
                position: 'absolute',
                right: 10
              }}>P 6, 000.00</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Color.gray }}>Subtotal</Text>
              <Text style={{
                position: 'absolute',
                right: 10,
                color: Color.gray
              }}>P 6, 000.00</Text>
            </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>TOTAL</Text>
            <Text style={{
              position: 'absolute',
              right: 10,
              fontWeight: 'bold'
            }}>P 6, 000.00</Text>
          </View>
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: 80,
              height: 80,
              backgroundColor: Color.primary,
              borderRadius: 40,
            }}
            onPress={() => { this.setState({ placeOrder: false }) }}
          >
            <Text style={{ color: 'white' }}>OK</Text>
          </TouchableOpacity>
        </View>
        </View>
      </BottomSheet >
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={[Style.MainContainer, {
          backgroundColor: Color.containerBackground,
          padding: 15,
          paddingBottom: 100
        }]}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <FontAwesomeIcon icon={faUser} size={27} color={Color.gray} style={{ marginRight: 10 }} />
            <Text style={{ color: Color.gray }}>5 people</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1,
            borderColor: '#E0E0E0',
            marginTop: 20,
            paddingBottom: 15
          }}>
            <Text style={{
              textAlign: 'center',
              marginBottom: 10
            }}>Images</Text>
          </View>


          <View style={{ padding: 20 }}>
            <View style={{
              alignItems: 'center',
              marginTop: 15
            }}>
              <Text style={{ fontWeight: 'bold' }}>BILLING DETAILS</Text>
            </View>
            <View style={{
              marginTop: 25,
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>*</Text>
                <Text style={Style.TextInput}>First Name</Text>
              </View>
              <TextInput
                style={Style.formControl}
                placeholder={'Enter First Name'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>*</Text>
                <Text style={Style.TextInput}>Last Name</Text>
              </View>
              <TextInput
                style={Style.formControl}
                placeholder={'Enter Last Name'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>*</Text>
                <Text style={Style.TextInput}>Location</Text>
              </View>
              <TextInput
                style={Style.formControl}
                placeholder={'Enter Location'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>*</Text>
                <Text style={Style.TextInput}>Phone</Text>
              </View>
              <TextInput
                style={Style.formControl}
                placeholder={'Enter Phone'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red' }}>*</Text>
                <Text style={Style.TextInput}>Email</Text>
              </View>
              <TextInput
                style={Style.formControl}
                placeholder={'Enter Email'}
              />
            </View>
            <View style={{
              alignItems: 'center',
              marginTop: 15
            }}>
              <Text style={{ fontWeight: 'bold' }}>SHIPPING DETAILS</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <CheckBox />
              <Text style={{
                fontWeight: 'bold',
                marginTop: 5
              }}>Ship to a different address?</Text>
            </View>
          </View>

          <View style={{ padding: 15 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Order notes</Text>
            <View style={{
              width: '100%',
              height: 160,
              borderWidth: 1,
              borderColor: Color.gray,
              borderRadius: 10
            }}><TextInput placeholder={'Notes about your delivery'}></TextInput></View>
          </View>

          <View style={{
            borderBottomWidth: 1,
            borderColor: Color.gray
          }}>
            <View style={{
              alignItems: 'center',
              marginTop: 15
            }}>
              <Text style={{ fontWeight: 'bold' }}>YOUR ORDER</Text>
            </View>
            {this.renderOrderDetails()}
          </View>

          <View style={{
            padding: 25,
            borderBottomWidth: 1,
            borderColor: Color.gray
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Subtotal</Text>
              <Text style={{
                position: 'absolute',
                right: 10
              }}>P 6, 000.00</Text>
            </View>
            <View>
              <Text style={{
                color: Color.gray,
                marginBottom: 15
              }}>Shipping</Text>
              <View style={{
                flexDirection: 'row',
                textAlign: 'center',
                alignItems: 'center'
              }}>
                <RadioForm
                  radio_props={[
                    { label: 'Shipping Method 1', value: 0 },
                    { label: 'Shipping Method 2', value: 1 },
                    { label: 'Shipping Method 3', value: 1 }
                  ]}
                  initial={0}
                  onPress={(value) => { this.setState({ value: value }) }}
                  buttonColor={Color.gray}
                  selectedButtonColor={Color.gray}
                  labelColor={Color.gray}
                  animation={false}
                  buttonSize={20}
                  buttonOuterSize={20}
                /><Text style={{
                  position: 'absolute',
                  right: 10,
                }}>P  15, 000.00</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>TOTAL</Text>
              <Text style={{
                position: 'absolute',
                right: 10,
                fontWeight: 'bold'
              }}>P 6, 000.00</Text>
            </View>
          </View>

          <View style={{ padding: 25 }}>
            <View style={{
              alignItems: 'center',
              marginBottom: 25
            }}>
              <Text style={{ fontWeight: 'bold' }}>PAYMENT METHOD</Text>
            </View>
            <RadioForm
              radio_props={[
                { label: 'Payment Method 1', value: 0 },
                { label: 'Payment Method 2', value: 1 },
                { label: 'Payment Method 3', value: 1 }
              ]}
              initial={0}
              onPress={(value) => { this.setState({ value: value }) }}
              buttonColor={Color.gray}
              selectedButtonColor={Color.gray}
              labelColor={Color.gray}
              animation={false}
              buttonSize={20}
              buttonOuterSize={20}
            />
          </View>
          {this.renderPlaceOrder()}
          <CustomizedButton onClick={this.placeOrders} title={'Proceed Checkout'}></CustomizedButton>

        </View>
      </ScrollView>
    );
  }
}
export default Checkout;