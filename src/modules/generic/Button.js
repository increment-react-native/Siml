import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text, TextInput } from 'react-native'
import { BasicStyles, Color } from 'common';
import LinearGradient from 'react-native-linear-gradient'

class Button extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render() {
        return(
            <View>
                    
                <LinearGradient
                    colors = {['#FFE1B2', '#EAA467', '#EAA467']}
                    style={{padding: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 50}}
                >
                    {this.props.content}
                </LinearGradient>
            </View>
        )
    }
}

export default Button;