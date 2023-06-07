/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  HomeScreen: undefined;
};
type OrderSuccessNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: OrderSuccessNavigation;
}
const OrderSuccess = ({navigation}: Prop) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Lottie
        source={require('../assests/Success.json')}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={() => navigation.navigate('HomeScreen')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      <Text
        style={{
          fontSize: 20,
          color: 'black',
          alignSelf: 'center',
          marginTop: 200,
        }}>
        {'Order Placed SuccessFully'}
      </Text>
    </View>
  );
};

export default OrderSuccess;
