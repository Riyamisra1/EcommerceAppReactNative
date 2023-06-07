/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {address} from '../interface/addressType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteAddress} from '../redux/slices/Address';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  AddAddress: any;
};
type AddressScreenNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: AddressScreenNavigation;
}
const Address = ({navigation}: Prop) => {
  const addressList = useSelector(
    (state: {address: {data: address[]}}) => state.address,
  );
  const defaultAddress = async (item: address) => {
    await AsyncStorage.setItem(
      'MyAddress',
      '' +
        item.city +
        ',' +
        item.state +
        ',' +
        item.pincode +
        ',' +
        item.addressType,
    );
    navigation.goBack();
  };

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <FlatList
        data={addressList.data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.mainView}
              activeOpacity={0.6}
              onPress={() => defaultAddress(item)}
              key={index}>
              <Text style={styles.text}>{`State: ${item.state}`}</Text>
              <Text style={styles.text}>{`City: ${item.city}`}</Text>
              <Text style={styles.text}>{`Pincode: ${item.pincode}`}</Text>
              <Text
                style={[
                  styles.text,
                  {
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    backgroundColor: '#B1BFF5',
                    padding: 10,
                    fontSize: 15,
                    borderRadius: 10,
                  },
                ]}>
                {item.addressType}
              </Text>

              <View style={styles.bottomView}>
                <TouchableOpacity
                  style={[styles.bottomIcon, {marginRight: 10}]}
                  onPress={() =>
                    navigation.navigate('AddAddress', {
                      type: 'edit',
                      data: item,
                    })
                  }>
                  <AntDesign name="edit" style={styles.iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bottomIcon}
                  onPress={async () => {
                    dispatch(deleteAddress(index));
                    AsyncStorage.removeItem('MyAddress');
                  }}>
                  <AntDesign
                    name="delete"
                    style={[styles.iconStyle, {color: 'red'}]}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress', {type: 'new'})}>
        <Text style={{fontSize: 30, color: '#fff'}}>{'+'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#088F8F',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  mainView: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  bottomView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
  iconStyle: {
    fontSize: 20,
    color: 'black',
  },
});
export default Address;
