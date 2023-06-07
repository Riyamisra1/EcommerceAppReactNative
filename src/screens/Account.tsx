/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/AccountStyle';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {db} from '../Firebase/FirebaseConfig';
import {product} from '../interface/ProductDataType';
import {orderType} from '../interface/OrderType';
import {address} from '../interface/addressType';
import {emptyAddress} from '../redux/slices/Address';
import {emptyOrder} from '../redux/slices/OrderSlice';
import {emptyWishList} from '../redux/slices/Wishlist';
import {emptyCart} from '../redux/slices/CartSlice';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Login: undefined;
  Orders: undefined;
  Address: undefined;
};
type AddressScreenNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: AddressScreenNavigation;
}
const Account = ({navigation}: Prop) => {
  const [userStatus, setUserStatus] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: {user: {data: {name: string; email: string}}}) => state.user.data,
  );
  const cartItems = useSelector(
    (state: {
      cart: {data: product[]};
      wishList: {data: product[]};
      order: {data: orderType[]};
      address: {data: address[]};
      user: {data: {email: string; password: string; wishList: product[]}};
    }) => state,
  );
  useEffect(() => {
    getStatus();
  }, [isFocused]);
  const getStatus = async () => {
    const checkStatus = await AsyncStorage.getItem('IS_USER_LOGGED_IN');

    if (checkStatus) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
    const queryCollection = query(
      collection(db, 'Users'),
      where('email', '==', userData.email),
    );

    const querySnapshot = await getDocs(queryCollection);
    querySnapshot.forEach(async curentDocument => {
      try {
        const docRef = doc(db, 'Users', curentDocument.id);
        await updateDoc(docRef, {
          cart: cartItems.cart.data,
          wishList: cartItems.wishList.data,
          order: cartItems.order.data,
          address: cartItems.address.data,
        });
      } catch (error) {
        console.log(error);
      }
    });
    dispatch(emptyAddress([]));
    dispatch(emptyOrder([]));
    dispatch(emptyWishList([]));
    dispatch(emptyCart([]));

    navigation.navigate('Login');
  };

  return (
    <View>
      {userStatus ? (
        <>
          <Image
            source={{
              uri: 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png',
            }}
            style={styles.accountImage}
          />

          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.text}>{'Email:-  ' + userData.email}</Text>
          <Text
            style={[styles.text, {top: 90}]}
            onPress={() => navigation.navigate('Orders')}>
            Orders
          </Text>
          <Text
            style={[styles.text, {top: 150}]}
            onPress={() => navigation.navigate('Address')}>
            Address
          </Text>
          <Text style={[styles.text, {top: 200}]} onPress={() => logout()}>
            Log out
          </Text>
        </>
      ) : (
        <>
          <Lottie
            style={{width: 300, height: 300, alignSelf: 'center', top: 50}}
            source={require('../assests/Login.json')}
            autoPlay
            loop
          />
          <Text style={[styles.name, {top: 140}]}>
            {'Login To Get Exciting Offers!!'}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{position: 'absolute', top: 590, alignSelf: 'center'}}
            onPressIn={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: 30,
                  alignSelf: 'center',
                },
              ]}>
              {' Login'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Account;
