import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { BasicStyles, Color } from 'common'
import Footer from 'modules/generic/Footer'
import Style from './Style'

class Connections extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <ScrollView style={{
          backgroundColor: Color.containerBackground
        }}
        showsVerticalScrollIndicator={false}
        >
          <View>
            <Text>Connections</Text>
          </View>
        </ScrollView>
        <Footer layer={1} {...this.props}/>
      </View>
    );
  }
}
export default Connections;
