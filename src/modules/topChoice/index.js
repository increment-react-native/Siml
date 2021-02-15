import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Pagination from 'components/Pagination/Icons';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faUtensils, faChevronLeft, faTicketAlt, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import ImageCardWithUser from 'modules/generic/ImageCardWithUser';
const height = Math.round(Dimensions.get('window').height);
class TopChoice extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false
    };   
  }

  onPageChange(index){
    this.setState({
      activeIndex: index
    })
  }

  renderData(data){
    return(
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <View style={{
            height: height,
            marginTop: 50
          }}>
            {
              data.map((item, index) => (
                <ImageCardWithUser data={item} style={{
                  marginBottom: 20
                }}/>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  render() {
    const { activeIndex, label, isLoading } = this.state;
    const paginationProps = [
      {
        icon: faUtensils
      },
      {
        icon: faTicketAlt
      },
      {
        icon: faShoppingBag
      }
    ]

    const data = [{
      image: require('assets/test2.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }, {
        name: 'Test'
      }]
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }]
    }, {
      image: require('assets/test.jpg'),
      date: 'January 29, 2021',
      location: 'Cebu City',
      superlike: true,
      users: [{
        name: 'Test'
      }]
    }]
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        {data && this.renderData(data)}
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
)(TopChoice);
