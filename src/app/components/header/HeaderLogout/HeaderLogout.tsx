import auth from '@react-native-firebase/auth';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPascalCase} from '../../../../utils/textUtils';
import styles from './HeaderLogout.style';

export const HeaderLogout = ({iconName}: {iconName: string}) => {
  let displayName = auth().currentUser?.email?.split('@')[0];
  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoText}>{toPascalCase(displayName)}</Text>
      <Icon
        name={iconName}
        size={30}
        style={styles.logout_icon}
        onPress={() => auth().signOut()}
      />
    </View>
  );
};
