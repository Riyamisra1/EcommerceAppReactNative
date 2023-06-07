/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/HomePageStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {product} from '../interface/ProductDataType';
import {useSelector} from 'react-redux';
export var searchedList: product[] = [];
const SearchItemsMainScreen = ({navigateToSearch}: any) => {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState<product[]>([]);
  const products = useSelector((state: {product: {data: product[]}}) => state);

  useEffect(() => {
    let temporaryCategory: product[] = [];
    products?.product?.data?.map((item: product) => {
      temporaryCategory.push(item);
      setProductList(temporaryCategory);
    });
  }, []);

  const onsearch = () => {
    searchedList = [];
    productList
      .filter((value: product) => {
        if (search === '') {
          return value;
        } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
          return value;
        } else if (
          value.category.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        }
      })
      .map(value => {
        console.log(value);
        searchedList.push(value);
      });
    setSearch('');
  };
  return (
    <>
      <View style={styles.searchViewStyle}>
        <Ionicons
          name="search-outline"
          color={'black'}
          style={{fontSize: 20, padding: 6}}
        />
        <TextInput
          placeholder="Search..."
          style={styles.inputField}
          placeholderTextColor={'black'}
          value={search}
          onChangeText={value => {
            setSearch(value);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onsearch();
            search !== ''
              ? navigateToSearch()
              : ToastAndroid.show('Please Enter Something', ToastAndroid.SHORT);
          }}
          style={{
            borderRadius: 10,
            backgroundColor: '#088F8F',
            width: 40,
            padding: 2,
            position: 'absolute',
            right: -50,
          }}>
          <Ionicons
            name="search-outline"
            color={'white'}
            style={{fontSize: 20, padding: 6}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchItemsMainScreen;
