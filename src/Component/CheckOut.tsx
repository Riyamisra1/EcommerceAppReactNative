/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/CheckOutStyle';
import {useDispatch, useSelector} from 'react-redux';
import {product} from '../interface/ProductDataType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {address} from '../interface/addressType';
import {useIsFocused} from '@react-navigation/native';
import {orderItem} from '../redux/slices/OrderSlice';
import {emptyCart} from '../redux/slices/CartSlice';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  OrderSuccess: undefined;
  Address: undefined;
};
type CartNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: CartNavigation;
}
const CheckOut = ({navigation}: Prop) => {
  const items = useSelector((state: {cart: {data: product[]}}) => state.cart);
  const [cartItems, setCartItems] = useState<product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const isFocused = useIsFocused();
  const addressList = useSelector(
    (state: {address: {data: address[]}}) => state.address.data,
  );

  const getSelectedAdrress = async () => {
    const address: string | null = await AsyncStorage.getItem('MyAddress');
    const parsedAddress = JSON.stringify(address);

    if (addressList && addressList.length !== 0) {
      setSelectedAddress(parsedAddress);
    } else {
      setSelectedAddress('Please Select Address');
      console.log('gg', selectedAddress);
    }
  };

  useEffect(() => {
    setCartItems(items.data);

    getSelectedAdrress();
    console.log('kaa', selectedAddress);
  }, [items, isFocused]);
  const getTotalPrice = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(0);
  };

  const dispatch = useDispatch();
  const orderPlace = () => {
    var date = new Date().getDate();

    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var hours = new Date().getHours();

    var min = new Date().getMinutes();

    var sec = new Date().getSeconds();
    const data = {
      items: cartItems,
      amount: '$' + getTotalPrice(),
      address: selectedAddress,
      orderDate:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    };
    dispatch(orderItem(data));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Added Items</Text>
        <FlatList
          data={cartItems}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  source={{uri: item.thumbnail}}
                  style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'center',
                    alignSelf: 'center',
                  }}
                />
                <Text style={[styles.title]}>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.title}>{'Total:- '}</Text>
        <Text style={[styles.title, {right: 200}]}>
          {'$' + getTotalPrice()}
        </Text>
      </View>
      <View style={styles.addressView}>
        <Text style={[styles.title, {top: -20}]}>{'Address'}</Text>
        <Text
          style={[
            styles.title,
            {top: -20, textDecorationLine: 'underline', color: '#0269A0FB'},
          ]}
          onPress={() => navigation.navigate('Address')}>
          {'Edit Address'}
        </Text>
      </View>
      <Text style={[styles.title, {top: -10, fontSize: 16, color: '#636363'}]}>
        {selectedAddress}
      </Text>
      <TouchableOpacity
        style={styles.orderButton}
        activeOpacity={0.8}
        onPress={() => orderPlace()}>
        <Text
          style={[
            styles.title,
            {color: 'white', alignSelf: 'center', fontSize: 30, top: -5},
          ]}>
          {'Order Now'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CheckOut;
