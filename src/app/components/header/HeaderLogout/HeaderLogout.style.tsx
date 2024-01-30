import {StyleSheet} from 'react-native';
import Colors from '../../../../styles/Color';

export default StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    color: Colors.text_bright,
    marginRight: 4,
    fontSize: 14,
  },
  logout_icon: {
    color: Colors.secondary,
    marginRight: 2,
  },
});
