import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faUtensils, faChevronLeft, faTicketAlt, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
class HomePage extends Component{
  constructor(props){
    super(props);
  }
  redirect(route, layer){
    if(route === 'historyStack') {
      this.props.navigation.navigate(route, {title: 'Upcoming'})
    } else {
      this.props.navigation.navigate(route)
    }
  }

  render() {
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground,
        flex: 1
      }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: Color.containerBackground
          }}
          >
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 2
                }}
                onPress={() => this.props.navigation.push('profileStack')}>
                <Image source={require('assets/logo.png')} style={{
                  height: 100,
                  width: 100
                }}/>
              </TouchableOpacity>
            </View>
            <View style={{
              width: '100%'
            }}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold'
              }}>What's the Consensus.</Text>
            </View>


            <View style={{
              width: '80%',
              marginLeft: '10%',
              marginRight: '10%',
              marginTop: 50,
              borderRadius: BasicStyles.standardBorderRadius,
              height: 120,
              borderColor: Color.primary,
              borderWidth: 1,
              flexDirection: 'row',
            }}>
              <View style={{
                width: '33%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                 <TouchableOpacity
                  onPress={() => this.redirect('restaurantStack')}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: Color.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={faUtensils} size={30} color={Color.white}/>
                  </TouchableOpacity>
              </View>
              <View style={{
                width: '33%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRightColor: Color.primary,
                borderRightWidth: 1,
                borderLeftColor: Color.primary,
                borderLeftWidth: 1,
              }}>
                <TouchableOpacity
                onPress={() => this.redirect('eventsStack')}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: Color.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={faTicketAlt} size={30} color={Color.white}/>
                  </TouchableOpacity>
              </View>
              <View style={{
                width: '33%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <TouchableOpacity
                  onPress={() => this.redirect('retailsStack')}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: Color.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={faShoppingBag} size={30} color={Color.white}/>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={{
              width: '50%',
              marginLeft: '25%',
              marginRight: '25%',
              marginTop: 50
            }}>
              <TouchableOpacity
                onPress={() => this.redirect('historyStack')}
                style={{
                  ...BasicStyles.standardButton,
                  backgroundColor: Color.danger,
                }}>
                  <Text style={{
                    color: Color.white
                  }}>Upcoming</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
          
        <Footer layer={0} {...this.props}/>
      </View>
    );
  }
}
export default HomePage;