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
import CardModal from 'modules/modal/Swipe.js';
const height = Math.round(Dimensions.get('window').height);
class History extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      isVisible: false
    };   
  }

  componentDidMount() {
    this.setState({activeIndex: this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.activeIndex ? this.props.navigation.state.params.activeIndex : 0})
  }

  onPageChange(index){
    this.setState({
      activeIndex: index
    })
  }

  onClick = () => {
    if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.title !== null) {
      if(this.state.activeIndex === 0 || this.state.activeIndex === 1) {
        this.props.navigation.navigate('eventNameStack');
      } else {
        this.props.navigation.navigate('retailNameStack');
      }
    } else {
      this.setState({
        isVisible: true
      })
    }
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
            marginTop: 50
          }}>
            {
              data.map((item, index) => (
                <ImageCardWithUser
                data={item} style={{
                  marginBottom: 20
                }}
                redirectTo={this.props.navigation.state.params && this.props.navigation.state.params.title ? 'upcoming' : 'history'}
                onClick={(item) => {
                  this.onClick()
                }}
                />
              ))
            }
          </View>
        </ScrollView>
        {isVisible && <CardModal
          visisble={isVisible}
          onClose={() => {
          this.setState({
            isVisible: false
          })
        }}/>}
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
          <View style={BasicStyles.paginationHolder}>
            <Pagination
              activeIndex={activeIndex}
              onChange={(index) => this.onPageChange(index)}
              pages={paginationProps}
            />
          </View>
          <PagerProvider activeIndex={activeIndex}>
            <Pager panProps={{enabled: false}}>
              <View style={Style.sliderContainer}>
                {data && this.renderData(data)}
              </View>
              <View style={Style.sliderContainer}>
                {data && this.renderData(data)}
              </View>

              <View style={Style.sliderContainer}>
                {data && this.renderData(data)}
              </View>
            </Pager>
          </PagerProvider>
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
)(History);
