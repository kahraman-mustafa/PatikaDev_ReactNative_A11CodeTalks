import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './Rooms.style';

const Rooms = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Rooms</Text>
      </View>
    </SafeAreaView>
  );
};

export default Rooms;
