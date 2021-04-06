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
import Api from 'services/api/index.js';
import { Spinner } from 'components';
import _ from 'lodash';

const height = Math.round(Dimensions.get('window').height);
class History extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      isVisible: false,
      limit: 6,
      offset: 0
    };   
  }

  componentDidMount() {
    this.setState({activeIndex: this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.activeIndex ? this.props.navigation.state.params.activeIndex : 0})
    this.retrieve(false);
  }

  retrieve = (flag) => {
    let status = this.props.navigation.state.params && this.props.navigation.state.params.title && this.props.navigation.state.params.title.toLowerCase() === 'upcoming' ? 'pending' : 'completed'
    let parameter = {
      condition: [{
        value: this.props.state.user.id,
        column: 'account_id',
        clause: '='
      }, {
        value: status,
        column: 'status',
        clause: '='
      }],
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset
    }
    this.setState({ isLoading: true })
    Api.request(Routes.reservationRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      console.log(response.data[0], "====");
      if (response.data.length > 0) {
        this.setState({
          data: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          data: flag == false ? [] : this.state.data,
          offset: flag == false ? 0 : this.state.offset,
        })
      }
    });
  }


  onPageChange(index){
    this.setState({
      activeIndex: index
    })
  }

  onClick = (item) => {
    if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.title !== null) {
      if(this.state.activeIndex === 0 || this.state.activeIndex === 1) {
        this.props.navigation.navigate('eventNameStack', {buttonTitle: this.props.navigation.state.params && this.props.navigation.state.params.title && this.props.navigation.state.params.title.toLowerCase() === 'history' ? 'Make Reservation' : 'Cancel', data: item});
      } else {
        this.props.navigation.navigate('retailNameStack', {data: item});
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
          onScroll={(event) => {
            let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
            let totalHeight = event.nativeEvent.contentSize.height
            if(event.nativeEvent.contentOffset.y <= 0) {
              if(this.state.isLoading == false){
                // this.retrieve(false)
              }
            }
            if (Math.round(scrollingHeight) >= Math.round(totalHeight)) {
              if (this.state.isLoading === false) {
                this.retrieve(true)
              }
            }
          }}
          >
          <View style={{
            marginTop: 15,
            flex: 1,
          }}>
            {
              data.map((item, index) => (
                <ImageCardWithUser
                data={{
                  logo: item.merchant.logo,
                  address: item.merchant.address || 'No address provided',
                  name: item.merchant.name,
                  date: item.synqt[0].date,
                  superlike: true,
                  users: [{
                    name: 'Test'
                  }, {
                    name: 'Test'
                  }, {
                    name: 'Test'
                  }, {
                    name: 'Test'
                  }, {
                    name: 'Test'
                  }]
                }}
                style={{
                  marginBottom: 20
                }}
                redirectTo={this.props.navigation.state.params && this.props.navigation.state.params.title}
                onClick={() => {
                  this.onClick(item)
                }}
                />
                ))
              }
          </View>
        </ScrollView>
        {isVisible && <CardModal
          history={this.props.navigation.state.params && this.props.navigation.state.params.title && this.props.navigation.state.params.title.toLowerCase() === 'history' ? true : false}
          navigation={this.props.navigation}
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
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
          <View style={[BasicStyles.paginationHolder, {marginTop: 10}]}>
            <Pagination
              activeIndex={activeIndex}
              onChange={(index) => this.onPageChange(index)}
              pages={paginationProps}
            />
          </View>
          <PagerProvider activeIndex={activeIndex}>
          {this.state.isLoading ? <Spinner mode="overlay" /> : null}
            <Pager panProps={{enabled: false}}>
              <View style={Style.sliderContainer}>
                {this.state.data.length > 0 && this.renderData(this.state.data)}
              </View>
              <View style={Style.sliderContainer}>
                {this.state.data.length > 0 && this.renderData(this.state.data)}
              </View>

              <View style={Style.sliderContainer}>
                {this.state.data.length > 0 && this.renderData(this.state.data)}
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
