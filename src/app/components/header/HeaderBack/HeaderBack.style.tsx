import {StyleSheet} from 'react-native';
import Colors from '../../../../styles/Color';

export default StyleSheet.create({
  back_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_title: {
    color: Colors.text_bright,
    fontSize: 14,
  },
  back_icon: {
    color: Colors.container,
    marginLeft: 2,
  },
});
