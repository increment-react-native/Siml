
import React, {Component} from 'react'
import {StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ImageBackground, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import Ratings from 'components/Rating/StarsOnly';
import { Color, BasicStyles } from 'common';
import MenuCards from 'modules/menu/cards';
import Tab from 'modules/generic/TabOptions';
import FLoatingButton from 'modules/generic/CircleButton';
import Information from 'modules/menu/information';

const ScreenHeight = Dimensions.get('window').height
const height = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const Images = [
    { id: "1", uri: require('assets/test.jpg'), title: "Italian Pizza", location: "Cebu City, Philippines"},
    { id: "2", uri: require('assets/logo_white.png'), title: "Siml Logo", location: "Cebu City, Philippines" },
    { id: "3", uri: require('assets/test2.jpg'), title: "French Burger", location: "Cebu City, Philippines" },
    { id: "4", uri: require('assets/logo_white.png'), title: "Siml", location: "Cebu City, Philippines" },
    { id: "5", uri: require('assets/test.jpg'), title: "Italian Pizza", location: "Cebu City, Philippines" },
]

class Swiper extends Component{
    constructor(props){
        super(props)

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
            isMoveLeft: false,
            isMoveRight: false,
            scroll: true,
            pan: new Animated.ValueXY(),
            choice: 'Menu'
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-ScreenWidth/2, 0, ScreenWidth/2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOPacity = this.position.x.interpolate({
            inputRange: [-ScreenWidth/2, 0, ScreenWidth/2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        this.disLikeOPacity = this.position.x.interpolate({
            inputRange: [-ScreenWidth/2, 0, ScreenWidth/2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOPacity = this.position.x.interpolate({
            inputRange: [-ScreenWidth/2, 0, ScreenWidth/2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-ScreenWidth/2, 0, ScreenWidth/2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
        
    }

    choiceHandler = (value) => {
      this.setState({choice: value})
    }
    componentWillMount(){
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: () => this.setState({ scroll: true }),
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({x: gestureState.dx, y: gestureState.dy})
                console.log(gestureState.dx);
                if(gestureState.dx < 0){
                  this.setState({isMoveLeft: true})
                  this.setState({isMoveRight: false})
                }else if(gestureState.dx > 0){
                  this.setState({isMoveRight: true})
                  this.setState({isMoveLeft: false})
                }

            },
            onPanResponderRelease: (evt, gestureState) => {
              this.setState({isMoveRight: false})
              this.setState({isMoveLeft: false})
                if(gestureState.dx > 120){
                    Animated.spring(this.position, {
                        toValue: { x: ScreenWidth + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                      toValue: { x: -ScreenWidth - 100, y: gestureState.dy }
                    }).start(() => {
                      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                        this.position.setValue({ x: 0, y: 0 })
                      })
                    })
                  }
                  else if (gestureState.dy < -120) {
                    Animated.spring(this.position, {
                      toValue: { x: gestureState.dx, y: -ScreenHeight - 100 }
                    }).start(() => {
                      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                        this.position.setValue({ x: 0, y: 0 })
                      })
                    })
                  }
                  else {
                    Animated.spring(this.position, {
                      toValue: { x: 0, y: 0 },
                      friction: 2
                    }).start()
                  }
            }
        })
    }

    renderImageBackground = (item) => {
      return (
        <ImageBackground
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: 'cover',
            marginTop: height * 0.25
          }}
          imageStyle={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: 'cover',
            borderRadius: BasicStyles.standardBorderRadius
          }}
          source={item.uri}
          >
            <View style={{
                position: 'absolute',
                bottom: this.props.topFloatButton === true ? 100 : 15,
                ...BasicStyles.standardWidth
              }}>
              <Text style={{color:  Color.white,  fontSize: BasicStyles.standardTitleFontSize, fontWeight: 'bold'}}>{item.title}</Text>
              <Text style={{color: Color.white}}>{item.location}</Text>
            </View>
            {this.props.topFloatButton === true && (<View style={{
              ...BasicStyles.standardWidth,
              position: 'absolute',
              bottom: -30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <TouchableOpacity
                style={{
                  alignItems:'center',
                  justifyContent:'center',
                  width: 70,
                  height: 70,
                  backgroundColor: Color.warning,
                  borderRadius: 35
                }}

                onPress={() => {
                  this.props.onClose()
                }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  size={35}
                  color={'white'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems:'center',
                  justifyContent:'center',
                  width: 80,
                  height: 80,
                  backgroundColor: Color.warning,
                  borderRadius: 40
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  size={40}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>)}
        </ImageBackground>
      )
    }

    renderOptions = (item) => {
      return (
          <Animated.View>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: this.state.isMoveRight ? 'green' : 'transparent', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>{this.state.isMoveRight ? 'LIKE' : null}</Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: this.state.isMoveLeft ? 'red' : 'transparent', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>{this.state.isMoveLeft ? 'NOPE' : null}</Text>
            </Animated.View>
          </Animated.View>
        )
    }

    renderCard = (item) => {
      return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: ScreenHeight - 0, width: ScreenWidth, paddingLeft: 15, paddingRight: 15}]}>
            {
              this.renderOptions(item)
            }
            {
              this.renderImageBackground(item)
            }
          </Animated.View>
        )
    }


    renderUsers = () => {
        return Images.map((item, i) => {
          if (i < this.state.currentIndex) {
            return null
          }
          else if (i == this.state.currentIndex) {
            return (
              <Animated.View>
                {
                  this.renderCard(item)
                }
              </Animated.View>
            )
          }
          else {
            return (
              <Animated.View
                key={item.id} style={[{
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: ScreenHeight - 0, width: ScreenWidth, padding: 10, position: 'absolute'
                }]}>
                {
                  this.renderOptions(item)
                }
                {
                  this.renderImageBackground(item)
                }
              </Animated.View>
            )
          }
        }).reverse()
      }

      renderMenu() {
        return (
          <View 
            style={{padding: 20}}
            >
            <View>
              <View style={ this.props.topFloatButton === true? {marginTop: 30} : {marginTop: 0}}>
                <Tab level={1} choice={['Menu', 'Information']} onClick={this.choiceHandler}></Tab>
              </View>
              <View style={ this.props.bottomFloatButton === true? {marginBottom: 200} : {marginBottom: 0}}>
                {this.state.choice == 'Menu' ? (
                  <MenuCards/>
                ) : 
                  <Information 
                    name={'Bangtan Sonyeondan'}
                    hours={['7 AM - 7 PM (Weekdays)', '7 AM - 11 PM (Weekends)']}
                    description={' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. It is simply dummy text of the printing and typesetting industry.'}
                  />}
              </View>
              {this.props.bottomFloatButton === true && (<FLoatingButton></FLoatingButton>)}
            </View>
          </View>
        )
      }
      
      render() {
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.renderUsers()}
            {this.renderMenu()}
          </View>
        );
      }
}

export default Swiper;