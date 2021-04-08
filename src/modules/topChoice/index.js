import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Pagination from 'components/Pagination/Icons';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faUtensils, faChevronLeft, faTicketAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import ImageCardWithUser from 'modules/generic/ImageCardWithUser';
import CardModal from 'modules/modal/Swipe.js';
import Api from 'services/api';
import { Spinner } from 'components';
import _ from 'lodash';

const height = Math.round(Dimensions.get('window').height);
class TopChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [
        {
          "members": [
            {
              "id": 1,
              "account_id": 1,
              "synqt_id": 1,
              "payload": "merchant_id",
              "payload_value": "2",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "name": "Lalaine Garrido"
            },
            {
              "id": 3,
              "account_id": 3,
              "synqt_id": 1,
              "payload": "merchant_id",
              "payload_value": "2",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "name": "Yeng"
            }
          ],
          "synqt": [
            {
              "id": 1,
              "code": "test",
              "account_id": 2,
              "title": "Restaurant Reservation",
              "location_id": 1,
              "date": "2021-03-20",
              "details": "test",
              "status": "pending",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "date_at_human": "March 20, 2021"
            }
          ],
          "merchant": {
            "id": 2,
            "code": "testtesttest",
            "account_id": 2,
            "name": "Business Part Two",
            "email": "lalainegarrido@gmail.com",
            "prefix": "Yo",
            "website": "com",
            "logo": "/storage/image/1_2021-03-29_07_26_21_drinks.jpg",
            "address": "Seoul, South Korea",
            "schedule": "2021-04-08 09:46:21",
            "status": "",
            "created_at": "2021-04-08 09:46:21",
            "updated_at": null,
            "deleted_at": null
          }
        },
        {
          "members": [
            {
              "id": 2,
              "account_id": 2,
              "synqt_id": 1,
              "payload": "merchant_id",
              "payload_value": "3",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "name": "Patrick Cabia-an"
            }
          ],
          "synqt": [
            {
              "id": 1,
              "code": "test",
              "account_id": 2,
              "title": "Restaurant Reservation",
              "location_id": 1,
              "date": "2021-03-20",
              "details": "test",
              "status": "pending",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null,
              "date_at_human": "March 20, 2021"
            }
          ],
          "merchant": {
            "id": 3,
            "code": "sdfgsdfgsdfg",
            "account_id": 3,
            "name": "National Book Store",
            "email": "national@gmail.com",
            "prefix": "YES",
            "website": ".com",
            "logo": "/storage/image/1_2021-03-29_07_26_21_drinks.jpg",
            "address": "Gwangju",
            "schedule": "2021-03-19 10:51:53",
            "status": "",
            "created_at": "-0001-11-30 00:00:00",
            "updated_at": null,
            "deleted_at": null
          }
        }
      ],
      isLoading: false,
      isVisible: false,
      item: null,
      limit: 5,
      offset: 0
    };
  }

  onPageChange(index) {
    this.setState({
      activeIndex: index
    })
  }

  componentDidMount() {
    this.retrieve(false)
  }

  retrieve = (flag) => {
    let parameter = {
      condition: [{
        value: this.props.state.user.id,
        column: 'account_id',
        clause: '='
      }],
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset
    }
    this.setState({ isLoading: true })
    Api.request(Routes.topChoiceRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      // if (response.data.length > 0) {
      //   this.setState({
      //     data: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
      //     offset: flag == false ? 1 : (this.state.offset + 1)
      //   })
      // } else {
      //   this.setState({
      //     data: flag == false ? [] : this.state.data,
      //     offset: flag == false ? 0 : this.state.offset,
      //   })
      // }
    });
  }

  closeModal = (value) => {
    if (value === null) {
      this.setState({ isVisible: false })
    } else {
      let parameter = {
        id: value
      }
      this.setState({ isLoading: true })
      Api.request(Routes.topChoiceDelete, parameter, response => {
        this.setState({ isLoading: false })
        if (response.data !== null) {
          this.setState({ isVisible: false })
          this.retrieve(false)
        }
      });
    }
  }

  renderData() {
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
            let totalHeight = event.nativeEvent.contentSize.height
            if (event.nativeEvent.contentOffset.y <= 0) {
              if (this.state.isLoading == false) {
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
            marginTop: 20,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%'
          }}>
            {
              this.state.data.length > 0 && this.state.data.map((item, index) => (
                <ImageCardWithUser
                  data={{
                    logo: item.merchant.logo,
                    address: item.merchant.address || 'No address provided',
                    name: item.merchant.name,
                    date: item.synqt[0].date,
                    superlike: true,
                    users: item.members
                  }}
                  style={{
                    marginBottom: 20
                  }}
                  onClick={() => {
                    this.setState({
                      isVisible: true,
                      item: item
                    })
                  }}
                />
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  render() {
    const { activeIndex, label, isLoading, isVisible } = this.state;
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
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        {this.state.data && this.renderData()}
        <CardModal
          history={true}
          item={this.state.item && this.state.item}
          navigation={this.props.navigation}
          visible={isVisible}
          onClose={(value) => {
            this.closeModal(value)
          }} />
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopChoice);
