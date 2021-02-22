import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  AddLocationContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  ButtonContainer: {
    backgroundColor: '#22B173',
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  ButtonTextStyle: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  AddressTileContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 80,
    paddingLeft: 20,
    elevation: 1,
    borderBottomWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  AddressTypeContainer: {},
  AddressTypeTextStyle: {},
  AddressContainer: {},
  AddressTextStyle: {
    fontSize: 15,
  },
  CountryContainer: {},
  CountryTextStyle: {},
});

export default styles;
