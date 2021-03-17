import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faUtensils, faChevronLeft, faTicketAlt, faShoppingBag, faEdit} from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer';
import { connect } from 'react-redux';
import Config from 'src/config.js';
class HomePage extends Component{
  constructor(props){
    super(props);3
  }
  redirect(route, layer){
    if(route === 'historyStack') {
      this.props.navigation.navigate(route, {title: 'Upcoming'})
    } else {
      this.props.navigation.navigate(route)
    }
  }

  render() {
    const { user } = this.props.state;
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
                  height: 120,
                  width: 120,
                  borderRadius: 100,
                  borderColor: Color.primary,
                  borderWidth: 2
                }}
                onPress={() => this.props.navigation.push('profileStack')}>
                {
                  user.account_profile && user.account_profile.url && (
                    <Image
                      source={user && user.account_profile && user.account_profile.url ? { uri: Config.BACKEND_URL + user.account_profile.url } : require('assets/logo.png') }
                      style={[BasicStyles.profileImageSize, {
                        height: 117,
                        width: 117,
                        borderRadius: 100
                      }]} />
                  )
                }
                <View style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  marginRight: 5,
                  position: 'absolute',
                  right: -5,
                  bottom: -2,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <View style={{
                    height: 25,
                    width: 25,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: Color.primary,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon style={{
                      borderColor: Color.primary
                    }}
                      icon={faEdit}
                      size={12}
                      color={Color.primary}
                    />
                  </View>
                </View>
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
const mapStateToProps = state => ({ state: state });

export default connect(
  mapStateToProps
)(HomePage);
