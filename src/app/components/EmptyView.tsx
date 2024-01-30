import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, View} from 'react-native';

const EmptyView = ({message}: {message: string}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', marginTop: 40}}>{message}</Text>
      <LottieView
        style={{flex: 1}}
        source={require('../../assets/emptychat.json')}
        autoPlay
      />
    </View>
  );
};

export default EmptyView;
