/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {product} from '../interface/ProductDataType';
import CartItemsList from '../Component/CartItemsList';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import Lottie from 'lottie-react-native';
import CheckoutLayout from '../Component/CheckoutLayout';
import {styles} from '../styles/CheckOutStyle';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  ProductDetail: {value: string};
  HomeScreen: undefined;
  CheckOut: undefined;
};
type CartNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: CartNavigation;
}
const Cart = ({navigation}: Prop) => {
  const cartProduct = useSelector(
    (state: {cart: {data: product[]}}) => state.cart,
  );
  const navigate = (value: {value: string}) => {
    navigation.navigate('ProductDetail', value);
  };
  const [cartItems, setCartItems] = useState<product[]>([]);
  const navigateToPreviousScreen = () => {
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    setCartItems(cartProduct.data);
  }, [cartProduct]);
  const dispatch = useDispatch();
  const addToCart = (item: product) => {
    dispatch(addItemToCart(item));
  };
  const removeFromCart = (index: number) => {
    dispatch(removeItemFromCart(index));
  };
  const reduceFromCart = (item: product) => {
    dispatch(reduceItemFromCart(item));
  };
  const alertDialogueToDelete = (index: number) => {
    Alert.alert('Alert', 'Are you sure to delete item from cart', [
      {text: 'Yes', onPress: () => removeFromCart(index)},
      {
        text: 'No',
      },
    ]);
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(0);
  };
  const navigateToCheckOut = () => {
    navigation.navigate('CheckOut');
  };

  return (
    <>
      <View style={styles.container}>
        {cartItems && cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={({item, index}) => {
                return (
                  <>
                    <CartItemsList
                      key={index}
                      item={item}
                      navigate={navigate}
                      addToCart={addToCart}
                      reduceFromCart={reduceFromCart}
                      removeFromCart={removeFromCart}
                      alertDialogueToDelete={alertDialogueToDelete}
                      index={index}
                    />
                  </>
                );
              }}
            />

            <View style={[styles.totalView, {marginBottom: 10, marginTop: 60}]}>
              <CheckoutLayout
                items={cartItems.length}
                total={getTotalPrice()}
                navigateToCheckOut={navigateToCheckOut}
              />
            </View>
          </>
        ) : (
          <>
            <Lottie
              style={{width: 300, height: 300, alignSelf: 'center', top: 50}}
              source={require('../assests/EmptyCart.json')}
              autoPlay
              loop
            />
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                alignSelf: 'center',
                top: 100,
              }}>
              OOPS!! Cart is Empty
            </Text>
            <TouchableOpacity onPressIn={() => navigateToPreviousScreen()}>
              <Text
                style={{
                  color: '#088F8F',
                  fontSize: 20,
                  alignSelf: 'center',
                  top: 120,
                }}>
                Shop Now
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default Cart;
