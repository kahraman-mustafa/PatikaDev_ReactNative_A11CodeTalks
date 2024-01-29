import {Dimensions, Platform, StyleSheet} from 'react-native';
import Colors from '../../../../styles/Color';

export default StyleSheet.create({
  header: {
    fontSize: Platform.OS === 'android' ? 60 : 80,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    minHeight: Dimensions.get('window').height * 0.4,
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    padding: 4,
  },
  error: {
    paddingLeft: 4,
    fontSize: 12,
    color: '#ba1a1a',
    marginHorizontal: 10,
  },
});
