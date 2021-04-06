import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import ImageCardWithUser from 'modules/generic/ImageCardWithUser';
import CardModal from 'modules/modal/Swipe.js';
import Api from 'services/api';
import { Spinner } from 'components';

const height = Math.round(Dimensions.get('window').height);
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [
        {
          "id": 1,
          "from": 1,
          "to": 2,
          "payload": "synqt",
          "payload_value": "1",
          "route": "/restaurant/codetest",
          "created_at": null,
          "updated_at": null,
          "deleted_at": null,
          "reservee": "Lalaine Garrido",
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
          "location": [
            {
              "id": 1,
              "account_id": 2,
              "address_type": "test",
              "merchant_id": 1,
              "code": "test",
              "latitude": "test",
              "longitude": "test",
              "route": "test",
              "locality": "test",
              "region": "test",
              "country": "test",
              "created_at": null,
              "updated_at": null,
              "deleted_at": null
            }
          ],
          "merchant": {
            "id": 1,
            "code": "test",
            "account_id": 1,
            "name": "test",
            "email": "test@gmail.com",
            "prefix": "test",
            "website": "test",
            "logo": "/storage/image/1_2021-03-29_07_26_21_drinks.jpg",
            "address": "test",
            "schedule": "2021-03-19T14:43",
            "status": "VERIFIED",
            "created_at": null,
            "updated_at": "2021-03-29 07:26:26",
            "deleted_at": null
          }
        }
      ],
      isLoading: false,
      isVisible: false,
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
    this.retrieve()
  }

  retrieve = () => {
    let parameter = {
      condition: [{
        value: this.props.state.user.id,
        column: 'to',
        clause: '='
      }],
      limit: this.state.limit,
      offset: this.state.offset
    }
    console.log(parameter, Routes.notificationsRetrieve, "===");
    this.setState({ isLoading: true })
    Api.request(Routes.notificationsRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      console.log(response, " =============");
      if (response.data.length > 0) {
        // this.setState({ data: response.data });
      }
    });
  }

  renderData() {
    const { isVisible } = this.state;
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            height: height,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            marginBottom: 150,
            marginTop: 20
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
                <FontAwesomeIcon icon={faCalendarAlt} size={30} color={Color.white} />
              </View>
            </View>
            <Text style={{
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
              this.state.data.length > 0 && this.state.data.map((item, index) => (
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
                    this.props.navigation.navigate('menuStack', {synqt_id: item.synqt[0].id})
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
    const { activeIndex, label, isLoading } = this.state;

    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        {isLoading ? <Spinner mode="overlay" /> : null}
        {this.renderData()}
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
)(Notifications);
