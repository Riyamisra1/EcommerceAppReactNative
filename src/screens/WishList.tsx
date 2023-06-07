/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {product} from '../interface/ProductDataType';
import ProductList from '../Component/ProductList';
import {
  addItemTowishList,
  removeItemFromWishList,
} from '../redux/slices/Wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  ProductDetail: {value: string};
  WishList: undefined;
  Home: undefined;
};
type WishListNavigation = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
interface Prop {
  navigation: WishListNavigation;
}
const WishList = ({navigation}: Prop) => {
  const [wishListItems, setWishListItems] = useState<product[]>([]);

  const wishlistProduct = useSelector(
    (state: {wishList: {data: product[]}}) => state.wishList,
  );

  useEffect(() => {
    setWishListItems(wishlistProduct.data);
  }, [wishlistProduct]);
  const navigate = (value: {value: string}) => {
    navigation.navigate('ProductDetail', value);
  };
  const dispatch = useDispatch();
  const removeFromWishList = (index: number) => {
    dispatch(removeItemFromWishList(index));
  };

  const checkUserStatus = async () => {
    const userStatus = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    return userStatus === null ? false : true;
  };
  const addTowishList = (item: product) => {
    dispatch(addItemTowishList(item));
  };

  return (
    <>
      {wishListItems && wishListItems.length > 0 ? (
        <>
          <View style={{height: 50, backgroundColor: '#088F8F'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 20,
                position: 'absolute',
                alignSelf: 'center',
                top: 10,
              }}>
              WishList
            </Text>
          </View>
          <View style={{marginBottom: 50}}>
            <FlatList
              data={wishListItems}
              renderItem={({item, index}) => {
                return (
                  <ProductList
                    key={index}
                    item={item}
                    navigate={navigate}
                    removeFromWishList={removeFromWishList}
                    checkUserStatus={checkUserStatus}
                    index={index}
                    addTowishList={addTowishList}
                  />
                );
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Lottie
            style={{width: 300, height: 300, alignSelf: 'center', top: 50}}
            source={require('../assests/WishList.json')}
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
            OOPS!! Nothing in WishList
          </Text>
          <TouchableOpacity onPressIn={() => navigation.navigate('Home')}>
            <Text
              style={{
                color: '#088F8F',
                fontSize: 20,
                alignSelf: 'center',
                top: 120,
              }}>
              Add Now
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default WishList;
