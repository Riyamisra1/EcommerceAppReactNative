/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {product} from '../interface/ProductDataType';
type cartItemType = {
  data: product[];
};
interface HeaderWithBackButtonType {
  cartItems: cartItemType;
  headertitle: string;
  navigateToCart: any;
  navigateToPreviousScreen: any;
}
const HeaderWithBackButton = (props: HeaderWithBackButtonType) => {
  const {cartItems, headertitle, navigateToCart, navigateToPreviousScreen} =
    props;
  return (
    <View style={{height: 50, backgroundColor: '#088F8F'}}>
      <TouchableOpacity onPress={() => navigateToPreviousScreen()}>
        <Ionicon
          name="arrow-back"
          color={'white'}
          style={{fontSize: 30, position: 'absolute', left: 10, top: 10}}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: 'white',
          fontWeight: '500',
          fontSize: 20,
          position: 'absolute',
          alignSelf: 'center',
          top: 10,
        }}>
        {headertitle}
      </Text>
      <TouchableOpacity onPress={() => navigateToCart()}>
        <AntDesign
          name="shoppingcart"
          color={'white'}
          style={{fontSize: 30, position: 'absolute', right: 20, top: 10}}
        />
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            backgroundColor: '#fff',
            position: 'absolute',
            top: 7,
            right: 12,
          }}>
          <Text style={{fontSize: 10, color: 'black', alignSelf: 'center'}}>
            {cartItems.data ? cartItems.data.length : 0}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithBackButton;
