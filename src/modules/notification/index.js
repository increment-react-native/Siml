import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import ImageCardWithUser from 'modules/generic/ImageCardWithUser';
import CardModal from 'modules/modal/Swipe.js';
const height = Math.round(Dimensions.get('window').height);
class Notifications extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      isVisible: false
    };   
  }

  onPageChange(index){
    this.setState({
      activeIndex: index
    })
  }

  renderData(data){
    const { isVisible } = this.state;
    return(
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <View style={{
            height: height,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            marginBottom: 150
          }}>
            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: Color.warning,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <FontAwesomeIcon icon={faCalendarAlt} size={30} color={Color.white}/>
              </View>
            </View>
            <Text  style={{
              textAlign: 'center',
              paddingTop: 5,
              paddingBottom: 5,
              color: Color.warning
            }}>
              Exciting plans!
            </Text>
            <Text style={{
              textAlign: 'center',
              paddingTop: 20,
              paddingBottom: 20
            }}>
              You have invites from your connection!  Swipe right the photo to  proceed to SIML or left to ignore invites.
            </Text>
            {
              data.map((item, index) => (
                <ImageCardWithUser data={item} style={{
                  marginBottom: 20
                }}
                onClick={() => {this.props.navigation.navigate('menuStack')}}></ImageCardWithUser>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  render() {
    const { activeIndex, label, isLoading } = this.state;

    const data = [{
      image: require('assets/test2.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: false,
      users: []
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: false,
      users: []
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: false,
      users: []
    }]
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
          {this.renderData(data)}
      </View>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
