import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { BasicStyles, Color } from 'common'
import Footer from 'modules/generic/Footer'
import Style from './Style'

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
      search: null
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
                  {
                      AcceptConnections.map((el, idx) => {
                        return(
                          <TouchableOpacity>
                              {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                                <ListItem key={idx}>
                                    <Image
                                        style={Style.circleImage}
                                        // resizeMode="cover"
                                        source={el.uri}
                                    />
                                    <View>
                                      <View style={{flexDirection:'row'}}>
                                        <View style={{width:200}}>
                                          <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                                          <Text style={{fontStyle: 'italic'}}>{el.address}</Text>
                                          <Text style={{color: 'gray', fontSize: 10}}>{el.numberOfConnection} similar connections</Text>
                                          <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity
                                              onPress={()=> this.changeTab(idx)}
                                              style={{
                                                ...Style.actionBtn,
                                                backgroundColor:Color.primary
                                              }}
                                            >
                                              <Text style={{color: 'white'}}>Confirm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                              onPress={()=> this.changeTab(idx)}
                                              style={{
                                                ...Style.actionBtn,
                                                backgroundColor:Color.danger
                                              }}
                                            >
                                              <Text style={{color: 'white'}}>Remove</Text>
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                        <View>
                                          <Text>{el.lastLogin}</Text>
                                        </View>
                                      </View>
                                    </View>
                                </ListItem>
                              {/* </Card> */}
                          </TouchableOpacity>
                        )
                      })
                    }
                    <View style={{marginTop: 50, paddingLeft: 30}}>
                      <Text style={{fontWeight: 'bold'}}>Connections you may know</Text>
                    </View>

                    <View>
                    {
                      AcceptConnections.map((el, idx) => {
                        return(
                          <TouchableOpacity>
                              {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                                <ListItem key={idx}>
                                    <Image
                                        style={Style.circleImage}
                                        // resizeMode="cover"
                                        source={el.uri}
                                    />
                                    <View>
                                      <View style={{flexDirection:'row'}}>
                                        <View style={{width:130}}>
                                          <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                                          <Text style={{fontStyle: 'italic'}}>{el.address}</Text>
                                          <Text style={{color: 'gray', fontSize: 10}}>{el.numberOfConnection} similar connections</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={()=> this.changeTab(idx)}
                                            style={{
                                              ...Style.actionBtn,
                                              backgroundColor:Color.danger
                                            }}
                                          >
                                            <Text style={{color: 'white'}}>Add</Text>
                                          </TouchableOpacity>
                                      </View>
                                    </View>
                                </ListItem>
                              {/* </Card> */}
                          </TouchableOpacity>
                        )
                      })
                    }
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
                    {
                      AcceptConnections.map((el, idx) => {
                        return(
                          <TouchableOpacity>
                              {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                                <ListItem key={idx}>
                                    <Image
                                        style={Style.circleImage}
                                        // resizeMode="cover"
                                        source={el.uri}
                                    />
                                    <View>
                                      <View style={{flexDirection:'row'}}>
                                        <View style={{width:130}}>
                                          <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                                          <Text style={{fontStyle: 'italic'}}>{el.address}</Text>
                                          <Text style={{color: 'gray', fontSize: 10}}>{el.numberOfConnection} similar connections</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={()=> this.changeTab(idx)}
                                            style={{
                                              ...Style.actionBtn,
                                              backgroundColor:Color.danger
                                            }}
                                          >
                                            <Text style={{color: 'white'}}>Add</Text>
                                          </TouchableOpacity>
                                      </View>
                                    </View>
                                </ListItem>
                              {/* </Card> */}
                          </TouchableOpacity>
                        )
                      })
                    }
                    </View>
              </View>
            )
          }
          
        </ScrollView>
        <Footer layer={1} {...this.props}/>
      </View>
    );
  }
}
export default Connections;
