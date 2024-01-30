import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPascalCase} from '../../../../utils/textUtils';
import styles from './HeaderBack.style';

export const HeaderBack = ({
  backTitle,
  onPressBack,
}: {
  backTitle: string;
  onPressBack: any;
}) => {
  return (
    <TouchableOpacity style={styles.back_container} onPress={onPressBack}>
      <Icon name="chevron-left" size={30} style={styles.back_icon} />
      <Text style={styles.back_title}>{toPascalCase(backTitle)}</Text>
    </TouchableOpacity>
  );
};
