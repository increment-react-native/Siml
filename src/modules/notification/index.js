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
      data: [],
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
        this.setState({ data: response.data });
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
                    logo: item.merchant?.logo,
                    address: item.merchant?.address || 'No address provided',
                    name: item.merchant?.name,
                    date: item.synqt.length > 0 && item.synqt[0]?.date,
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
