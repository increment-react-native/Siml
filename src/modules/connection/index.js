import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { BasicStyles, Color } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
import CardList from 'modules/generic/CardList'
import Share from 'components/Share'
import Style from './Style'
import { connect } from 'react-redux';

const navs = [
  {name: "Suggestions", flag: true},
  {name: "Connections", flag: false}
]

const AcceptConnections = [
  {name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg')},
  {name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg')},
  {name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg')},
  {name: 'John Doe', address: 'Cebu City', numberOfConnection: 3, lastLogin: '2 d', uri: require('assets/test.jpg')},
]


class Connections extends Component {
  constructor(props) {
    super(props);
    this.state= {
      prevActive: 0,
      currActive: 0,
      search: null,
      isShow: false
    }
  }

  async changeTab(idx){
    if(this.state.prevActive != idx){
      await this.setState({currActive: idx})
      navs[this.state.prevActive].flag = false
      navs[idx].flag = true
      await this.setState({prevActive: idx})
    }
    console.log(this.state.prevActive);
  }

  render() {
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
          <View style={{flex: 1, flexDirection: 'row'}}>
          {
            navs.map((el, idx) => {
              return(
                <TouchableOpacity
                  onPress={()=> this.changeTab(idx)}
                  style={{
                    ...Style.standardButton,
                    backgroundColor: el.flag == true ? Color.primary : 'gray',
                    marginLeft: 5
                  }}
                >
                  <Text style={{color: 'white'}}>{el.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>
          {
            this.state.currActive == 0 ? (
              <View>
                    <CardList data={AcceptConnections} hasAction={true} actionType={'text'}></CardList>
                    <View style={{marginTop: 50, paddingLeft: 30}}>
                      <Text style={{fontWeight: 'bold'}}>Connections you may know</Text>
                    </View>

                    <View>
                    <CardList data={AcceptConnections} hasAction={false} actionType={'button'} actionContent={'text'}></CardList>
                    </View>

                  </View>
            ): (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <View style={Style.TextContainer}>
                      <TextInput
                        style={BasicStyles.formControl}
                        onChangeText={(search) => this.setState({search})}
                        value={this.state.search}
                        placeholder={'Search'}
                      />
                </View>

                    <View>
                    <CardList data={AcceptConnections} hasAction={false} actionType={'button'} actionContent={'icon'} ></CardList>
                    </View>
              </View>
            )
          }
          <Share showModal={this.props.isShow}></Share>
        </ScrollView>
        <Footer layer={1} {...this.props}/>
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
