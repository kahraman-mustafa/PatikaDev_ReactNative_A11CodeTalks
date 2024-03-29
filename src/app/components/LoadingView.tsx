import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, View} from 'react-native';

const LoadingView = ({message}: {message: string}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', marginTop: 40}}>{message}</Text>
      <LottieView
        style={{flex: 1}}
        source={require('../../assets/loading_paper_plane.json')}
        autoPlay
      />
    </View>
  );
};

export default LoadingView;
