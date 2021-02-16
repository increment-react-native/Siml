import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { connect } from 'react-redux';
import styles from './Styles.js'
import  Swiper from './Swiper';
import Information from 'modules/menu/information';
import Tab from 'modules/generic/TabOptions';
import MenuCards from 'modules/menu/cards';
import { Color, BasicStyles } from 'common';
class Swipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      choice: 'Menu'
    }
  }
  redirect(){

  }

  choiceHandler = (value) => {
    this.setState({choice: value})
  }

  render() {
    const { data } = this.props;
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.onClose();
        }}
        collapsable={true}>
        <ScrollView style={styles.ModalContainer}>
          <View style={{
            marginBottom: 100
          }}>
            <Swiper
             topFloatButton={true}
             bottomFloatButton={false}
             onClose={() => {
              this.props.onClose()
            }}/>
          </View>
          {/* <View style={{
            width: '100%',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: 20,
            backgroundColor: Color.white
          }}>
            <View>
              <Tab level={1} choice={['Menu', 'Information']} onClick={this.choiceHandler}></Tab>
            </View>
            <View style={{marginBottom: 200}}>
              {this.state.choice == 'Menu' ? (
                <MenuCards/>
              ) : 
                <Information 
                  name={'Bangtan Sonyeondan'}
                  hours={['7 AM - 7 PM (Weekdays)', '7 AM - 11 PM (Weekends)']}
                  description={' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. It is simply dummy text of the printing and typesetting industry.'}
                />}
            </View>
          </View> */}
        </ScrollView>
      </Modal>
    );
  }
}


const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Swipe);
