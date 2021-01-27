import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width)
export default {
  ScrollView: {
    flex: 1
  },
  MainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
}