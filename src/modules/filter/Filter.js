import React, {Component} from 'react';
import { View, TouchableOpacity, FlatList, Text, Dimensions, ScrollView} from 'react-native';
import Modal from "react-native-modal";
import { Color , BasicStyles} from 'common';
import Config from 'src/config.js';
import {connect} from 'react-redux';
import { SliderPicker } from 'react-native-slider-picker';
import PickerWithLabel from 'components/Form/PickerWithLabel';
import DatePicker from 'components/DateTime/index.js';
import Button from 'components/Form/Button';
const height = Math.round(Dimensions.get('window').height);
class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      data: []
    }
  }
  action = () => {  
    this.props.action()
  }
  redirect = (route) => {
    this.props.close()
    this.props.navigate(route);
  }

  apply() {
    const { setFilterData } = this.props
    const { target, type, date, value } = this.state
    let parameter = {
      target: target,
      money_type: type,
      date: date,
      amount: value
    }
    setFilterData(parameter)
    console.log('[parameter]', parameter);
  }

  amount() {
    const { theme } = this.props.state;
    return(
      <View style={{
        width: '100%',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2%'
      }}>
        <SliderPicker 
          callback={position => {
            this.setState({ value: position })
          }}
          defaultValue={this.state.value}
          labelFontColor={Color.black}
          labelFontWeight={'600'}
          showFill={false}
          fillColor={'red'}
          labelFontWeight={'bold'}
          showNumberScale={true}
          showSeparatorScale={true}
          buttonBackgroundColor={'#fff'}
          buttonBorderColor={theme ? theme.primary : Color.primary}
          buttonBorderWidth={2}
          scaleNumberFontWeight={'300'}
          buttonDimensionsPercentage={6}
          labelFontSize={BasicStyles.standardFontSize}
          heightPercentage={.5}
          widthPercentage={70}
          sliderInnerBackgroundColor={theme ? theme.primary : Color.primary}
          minLabel={'$100'}
          maxLabel={'$9000'}
          maxValue={9000}
        />
      </View>
    )
  }

  FlatListItemSeparator = () => {
    return <View style={Style.Separator} />;
  };

  lists(){
    return(
      <View>
        <Text>Not yet</Text>
      </View>
    )
  }

  header(){
    const { theme } = this.props.state;
    return(
      <View style={{
        width: '110%',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderBottomColor: Color.lightGray,
        marginLeft: '-3%',
        alignItems: 'stretch'
      }}>
        <Text style={{
          fontSize: BasicStyles.standardFontSize,
          fontWeight: 'bold',
          marginLeft: '5%',
          color: theme ? theme.primary : Color.primary
        }}>{this.props.title.toUpperCase()}</Text>
      </View>
    );
  }

  render(){
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.props.visible}
        style={{
          padding: 0,
          margin: 0
          }}>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            height: height
          }}>
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                backgroundColor: 'transparent',
                height: height
              }}
              onPress={() => this.props.close()}
              >
            </TouchableOpacity>
            <View style={{
              width: '80%',
              backgroundColor: Color.white,
              height: height,
              paddingLeft: 10,
              paddingRight: 20,
              paddingTop: 20
            }}>
              {this.header()}
              {(this.props.from == 'restaurant') && this.amount()}
              {(this.props.from == 'categories') && this.lists()}

              <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: 10
              }}>
                <Button 
                  style={{
                    backgroundColor: Color.primary,
                    width: '90%',
                    marginRight: '5%',
                    marginLeft: '10%'
                  }}
                  title={'Set Filter'}
                  onClick={() => this.apply()}
                />
              </View>
            </View>
          </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setFilterData: (filterData) => dispatch(actions.setFilterData(filterData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
