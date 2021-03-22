import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { BasicStyles, Color, Routes } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
import CardList from 'modules/generic/CardList'
import Share from 'components/Share'
import Style from './Style'
import { connect } from 'react-redux';
import { Spinner } from 'components';
import Api from 'services/api/index.js';

const navs = [
  { name: "Suggestions", flag: true },
  { name: "Connections", flag: false }
]

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevActive: 0,
      currActive: 0,
      search: null,
      isShow: false,
      data: [],
      limit: 6,
      offset: 0,
      isLoading: false,
      pending: [],
      suggestions: [],
      connections: []
    }
  }

  componentDidMount() {
    this.retrieve(false);
    this.retrieveRandomUsers(false);
  }

  retrieve(flag) {
    const { user } = this.props.state
    if (user == null) {
      return
    }
    let parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }, {
        value: user.id,
        column: 'account',
        clause: 'or'
      }],
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
    }
    this.setState({ isLoading: true })
    Api.request(Routes.circleRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      console.log(response, "=======================response");
      if (response.data.length > 0) {
        this.setState({
          connections: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1),
          d: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id')
        })
      } else {
        this.setState({
          connections: flag == false ? [] : this.state.data,
          offset: flag == false ? 0 : this.state.offset,
          d: flag == false ? [] : this.state.data
        })
      }
    });
  }

  retrieveRandomUsers = (flag) => {
    const { user } = this.props.state
    console.log(user, "====user");
    if (user == null) {
      return
    }
    let parameter = {
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
    }
    this.setState({ isLoading: true })
    Api.request(Routes.accountRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        response.data.map((item, index) => {
          if(item.id === user.id) {
            response.data.splice(index, 1)
          }
        })
        this.setState({
          suggestions: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1),
          d: flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id')
        })
      } else {
        this.setState({
          suggestions: flag == false ? [] : this.state.data,
          offset: flag == false ? 0 : this.state.offset,
          d: flag == false ? [] : this.state.data
        })
      }
    });
  }

  async changeTab(idx) {
    if (this.state.prevActive != idx) {
      await this.setState({ currActive: idx })
      navs[this.state.prevActive].flag = false
      navs[idx].flag = true
      await this.setState({ prevActive: idx })
    }
    this.setState({pending: [], connections: []})
  }

  group = () => {
    const { pending, connections } = this.state;
    this.state.data && this.state.data.length > 0 && this.state.data.map((item, index) => {
      if(item.status === 'pending') {
        pending.push(item);
      } else if(item.status === 'accepted') {
        connections.push(item);
      }
    })
  }

  render() {
    this.group();
    return (
      <View style={{
        flex: 1
      }}>
        <ScrollView style={{
          backgroundColor: Color.containerBackground,
          marginBottom: 50
        }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {
              navs.map((el, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.changeTab(idx)}
                    style={{
                      ...Style.standardButton,
                      backgroundColor: el.flag == true ? Color.primary : 'gray',
                      marginLeft: 5
                    }}
                  >
                    <Text style={{ color: 'white' }}>{el.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          {
            this.state.currActive == 0 ? (
              <View>
                {this.state.isLoading ? <Spinner mode="overlay" /> : null}
                <CardList status={'pending'} navigation={this.props.navigation} data={this.state.pending.length > 0 && this.state.pending} hasAction={true} actionType={'text'}></CardList>
                <View style={{ marginTop: 50, paddingLeft: 30 }}>
                  <Text style={{ fontWeight: 'bold' }}>Connections you may know</Text>
                </View>

                <View>
                  <CardList navigation={this.props.navigation} data={this.state.suggestions.length > 0 && this.state.suggestions} hasAction={false} actionType={'button'} actionContent={'text'}></CardList>
                </View>

              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <View style={Style.TextContainer}>
                  <TextInput
                    style={BasicStyles.formControl}
                    onChangeText={(search) => this.setState({ search })}
                    value={this.state.search}
                    placeholder={'Search'}
                  />
                </View>

                <View>
                  <CardList navigation={this.props.navigation} data={this.state.connections.length > 0 && this.state.connections} hasAction={false} actionType={'button'} actionContent={'icon'} ></CardList>
                </View>
              </View>
            )
          }
        </ScrollView>
        <Footer layer={1} {...this.props} />
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    viewMenu: (isViewing) => dispatch(actions.viewMenu(isViewing))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Connections);
