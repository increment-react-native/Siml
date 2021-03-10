import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { BasicStyles, Color } from 'common'
import Footer from 'modules/generic/Footer'
import CardList from 'modules/generic/CardList'
import Style from './Style'
import { connect } from 'react-redux';

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
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <View style={Style.TextContainer}>
                    <TextInput
                    style={BasicStyles.formControl}
                    onChangeText={(search) => this.setState({search})}
                    value={this.state.search}
                    placeholder={'Search Connections'}
                    />
                </View>

                <View>
                    <CardList navigation={this.props.navigation} data={AcceptConnections} hasAction={false} actionType={'button'} actionContent={'text'}></CardList>
                </View>
              </View>
        </ScrollView>
        {/* <Footer layer={1} {...this.props}/> */}
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
