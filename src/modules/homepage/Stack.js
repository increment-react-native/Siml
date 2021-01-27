import React from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faChevronLeft, faClock, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {BasicStyles} from 'common';
import HomePageScreen from './index';
import {connect} from 'react-redux';
import StackHeaderTitle from 'modules/generic/StackHeaderTitle';
import { Color } from 'common';
const width = Math.round(Dimensions.get('window').width)

const TasksStack = createStackNavigator();

const Stack = props => {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen
        name="HomePage"
        children={route => (
          <HomePageScreen
            {...route}
            parentNav={props.parentNav}
            initialPage={props.initialPage}
          />
        )}
        options={({route}) => {
          return {
            headerTitle: () => (
              <StackHeaderTitle title={null}/>
            ),
            headerTransparent: true,
            headerLeft: () => (
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.parentNav.toggleDrawer()}
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: 5,
                    backgroundColor: Color.primary,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center'
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

                <TouchableOpacity
                  onPress={() => props.parentNav.toggleDrawer()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: 50,
                    marginLeft: width - (55 + 100),
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
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.parentNav.toggleDrawer()}
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
                </TouchableOpacity>
              </View>
            ),
          };
        }}
      />
      
    </TasksStack.Navigator>
  );
};

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stack);
