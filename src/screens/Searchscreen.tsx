/* eslint-disable react-native/no-inline-styles */
import {ScrollView} from 'react-native';
import React from 'react';
import {searchedList} from './SearchItemsMainScreen';
import ProductList from '../Component/ProductList';
import {product} from '../interface/ProductDataType';
import {useDispatch} from 'react-redux';
import {
  addItemTowishList,
  removeItemFromWishList,
} from '../redux/slices/Wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  ProductDetail: {item: string};
};
type SearchScreenNavigation = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
interface Prop {
  navigation: SearchScreenNavigation;
}
const SearchScreen = ({navigation}: Prop) => {
  const navigate = (item: {item: string}) => {
    navigation.navigate('ProductDetail', item);
  };
  const dispatch = useDispatch();
  const addTowishList = (item: product) => {
    dispatch(addItemTowishList(item));
  };
  const removeFromWishList = (index: number) => {
    dispatch(removeItemFromWishList(index));
  };
  const checkUserStatus = async () => {
    const userStatus = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    return userStatus === null ? false : true;
  };
  return (
    <ScrollView
      style={{
        marginBottom: 10,
      }}>
      {searchedList.map((item: product, index: number) => {
        return (
          <ProductList
            key={index}
            item={item}
            navigate={navigate}
            addTowishList={addTowishList}
            checkUserStatus={checkUserStatus}
            removeFromWishList={removeFromWishList}
            index={index}
          />
        );
      })}
    </ScrollView>
  );
};

export default SearchScreen;
