import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Tab from 'modules/generic/TabOptions';
import MenuCards from 'modules/menu/cards';
import { Color, BasicStyles } from 'common';
import Information from 'modules/menu/information';
import { ScrollView } from 'react-native-gesture-handler';
import FLoatingButton from 'modules/generic/CircleButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes, faStar} from '@fortawesome/free-solid-svg-icons';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      choice: 'Menu'
    }
  }
  
  choiceHandler = (value) => {
    this.setState({choice: value})
  }

  renderCard = (images) => {
    return (
       <CardStack
        style={styles.content}
        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
        ref={swiper => {
          this.swiper = swiper
        }}
        onSwiped={() => console.log('onSwiped')}
        onSwipedLeft={() => console.log('onSwipedLeft')}
        disableBottomSwipe={true}
      >
        {
          images.map(el => {
            return (
              <Card style={[styles.card]}>
                <ImageBackground style={{ flex: 1, flexDirection: 'row', height: null, width: null, resizeMode: 'cover',  marginTop: this.props.bottomFloatButton === true? 50 : height * 0.25}}
                  imageStyle={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: 'cover',
                    borderRadius: BasicStyles.standardBorderRadius
                  }}
                  source={el.uri}>
                  <View style={{
                      position: 'absolute',
                      bottom: this.props.topFloatButton === true ? 100 : 15,
                      ...BasicStyles.standardWidth
                    }}>
                    <Text style={{color:  Color.white,  fontSize: BasicStyles.standardTitleFontSize, fontWeight: 'bold'}}>{el.title}</Text>
                    <Text style={{color: Color.white}}>{el.location}</Text>
                  </View>
                  <View style={{position: 'absolute', bottom: 20, right: 15, flexDirection: 'row'}}>
                    <FontAwesomeIcon
                      icon={faStar}
                      size={30}
                      color={'#FFCC00'}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      size={30}
                      color={'#FFCC00'}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      size={30}
                      color={'#FFCC00'}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      size={30}
                      color={'white'}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      size={30}
                      color={'white'}
                    />
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
              </Card>
            )
          })
        }
      </CardStack>
    )
  }

  renderMenu = ()=>  {
    return (
      <View 
        style={{padding: 20, marginTop: '15%'}}
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
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{height: 500}}>
              {this.renderCard(this.props.images)}
          </View>
              {this.renderMenu()}
        </ScrollView>
    );
  }
}

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  card:{
    width: width - 10,
    height: 550,
    borderRadius: 5,
    marginTop: '20%',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  }
});
