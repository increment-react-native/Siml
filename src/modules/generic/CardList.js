import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';;
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Color } from 'common';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const width = Math.round(Dimensions.get('window').width)

class CardList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        
        <View>
            {
                this.props.data.map((el, idx) => {
                    return (
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('viewProfileStack')}}>
                            {/* <Card containerStyle={{padding:-5, borderRadius: 20}}> */}
                            <ListItem key={idx} style={{width: width}}>
                                <Image
                                    style={Style.circleImage}
                                    // resizeMode="cover"
                                    source={el.uri}
                                />
                                <View>
                                    <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                                        <Text style={{fontStyle: 'italic'}}>{el.address}</Text>
                                        <Text style={{color: 'gray', fontSize: 10}}>{el.numberOfConnection} similar connections</Text>
                                        {
                                            this.props.hasAction && (
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
                                                        backgroundColor: 'gray'
                                                        }}
                                                    >
                                                        <Text style={{color: 'white'}}>Remove</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }
                                    </View>
                                    <View>
                                        {
                                            this.props.actionType == 'text' ? (
                                                <Text style={{marginLeft: 10}}>{el.lastLogin}</Text>
                                            ): (
                                                <TouchableOpacity
                                                    onPress={()=> this.changeTab(idx)}
                                                    style={this.props.actionContent == 'icon' ? Style.iconBtn : Style.button}
                                                >
                                                    {
                                                        this.props.actionContent == 'icon' ? (
                                                            <FontAwesomeIcon icon={faEllipsisH} size={30}
                                                            color={'gray'}></FontAwesomeIcon>
                                                        ): (
                                                            <Text style={{color: 'white'}}>Add</Text>
                                                        )
                                                    }
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                    </View>
                                </View>
                            </ListItem>
                            {/* </Card> */}
                        </TouchableOpacity>
                    )
                })
            }
        </View>
        )
    }
}

const Style = StyleSheet.create({
    ScrollView: {
        flex: 1,
      },
      MainContainer: {
        flex: 1,
        backgroundColor: Color.white,
        zIndex: 0,
        marginBottom: 50
      },
      footerIcon: {
        marginTop: Platform.OS == 'ios' ? 30 : 0
      },
      standardButton: {
        height: 30,
        backgroundColor: Color.primary,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
      },
      actionBtn: {
        height: 30,
        backgroundColor: Color.primary,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginLeft: 3
      },
      button: {
        width: 80,
        height: 30,
        backgroundColor: Color.primary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50
      },
      iconBtn: {
        width: 80,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 80
      },
      circleImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: Color.primary,
        borderWidth: 3,
        overflow: "hidden",
      },
      Text: {
        marginLeft: 20,
        width: 200,
        height: 100
      },
      TextContainer: {
        flex: 1
      },
})

export default CardList