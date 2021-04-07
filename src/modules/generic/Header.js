import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, SafeAreaView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faEdit, faChevronLeft, faClock, faShoppingBag, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { BasicStyles, Color } from 'common';
const width = Math.round(Dimensions.get('window').width)

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null
    }
  }

  searchHandler = (value) => {
    this.setState({search: value});
  }

  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    const { routeName } = this.props.navigation.state;
    const { theme } = this.props.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          borderBottomWidth: 0
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.toggleDrawer()
          }}
          style={{
            height: 50,
            width: 50,
            marginLeft: 5,
            backgroundColor: Color.primary,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10001
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.white,
              },
            ]}
          />
        </TouchableOpacity>

        {
          routeName === 'Status' && (
            <View style={{
                flex: 1,
               flexDirection: 'row',
               width: width
            }}>
            <View style={{
              height: 40,
              borderColor: Color.gray,
              borderWidth: 1,
              borderRadius: 25,
              width: '70%',
              marginRight: '2%',
              marginLeft: '2%',
              justifyContent: 'center'
            }}>
              <TextInput
                style={{
                  height: 45,
                  width: '70%'
                }}
                onSubmitEditing={() => {this.props.setStatusSearch(this.state.search)}}
                onChangeText={text => this.searchHandler(text)}
                value={this.state.search}
                placeholder='Search...'
              />
            </View>
            <View>
              <TouchableOpacity style={{
              marginRight: '5%'
            }}
              onPress={() => { this.props.setCreateStatus(true) }}
            >
              <FontAwesomeIcon
                icon={faEdit}
                size={40}
                color={Color.primary} />
            </TouchableOpacity>
            </View>
            </View>
          )
        }

        {routeName !== 'Status' && (<TouchableOpacity
          onPress={() => this.props.navigation.navigate('topChoiceStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            marginLeft: width - (105 + 100),
          }}
        >
          <FontAwesomeIcon
            icon={faStar}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
        </TouchableOpacity>)}


        {routeName !== 'Status' && (<TouchableOpacity
          onPress={() => this.props.navigation.navigate('historyStack', {title: 'History'})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
          }}
        >
          <FontAwesomeIcon
            icon={faClock}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
        </TouchableOpacity>)}

        {routeName !== 'Status' && (<TouchableOpacity
          onPress={() => this.props.navigation.navigate('cartStack')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
          }}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
            size={BasicStyles.iconSize}
            style={[
              BasicStyles.iconStyle,
              {
                color: Color.gray,
              },
            ]}
          />
        </TouchableOpacity>)}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
    setStatusSearch: (statusSearch) => dispatch(actions.setStatusSearch(statusSearch)),
    setCreateStatus: (createStatus) => dispatch(actions.setCreateStatus(createStatus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
