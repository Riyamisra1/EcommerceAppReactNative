/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slices/Address';
import uuid from 'react-native-uuid';
import {RouteProp, useRoute} from '@react-navigation/native';
import {address} from '../interface/addressType';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  AddAddress: undefined;
};
type AddAddressScreenNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: AddAddressScreenNavigation;
}
const AddAddress = ({navigation}: Prop) => {
  const route: RouteProp<
    {
      params: {
        state: string;
        type: string;
        city: string;
        pincode: string;
        data: address;
        addressType: number;
      };
    },
    'params'
  > = useRoute();
  const [addressState, setState] = useState({
    state: route.params.type === 'edit' ? route.params.data.state : '',
    city: route.params.type === 'edit' ? route.params.data.city : '',
    pincode: route.params.type === 'edit' ? route.params.data.pincode : '',
  });
  const [addressType, setAddressType] = useState(
    route.params.type === 'edit'
      ? route.params.data.addressType === 'Home'
        ? 1
        : 2
      : 1,
  );
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={[styles.input, {marginTop: 50}]}
        placeholder="Enter State"
        placeholderTextColor={'grey'}
        value={addressState.state}
        onChangeText={text => setState({...addressState, state: text})}
      />

      <TextInput
        style={[styles.input, {marginTop: 50}]}
        placeholder="Enter City"
        placeholderTextColor={'grey'}
        value={addressState.city}
        onChangeText={text => setState({...addressState, city: text})}
      />

      <TextInput
        style={[styles.input, {marginTop: 50}]}
        placeholder="Enter Pincode"
        keyboardType={'number-pad'}
        placeholderTextColor={'grey'}
        value={addressState.pincode}
        onChangeText={text => setState({...addressState, pincode: text})}
      />

      <View style={styles.addressTypeView}>
        <TouchableOpacity
          style={[
            styles.addressTypeButton,
            {
              borderWidth: 0.5,
              borderColor: addressType === 1 ? '#088F8F' : 'black',
            },
          ]}
          onPress={() => setAddressType(1)}>
          <Ionicons
            name={addressType === 1 ? 'radio-button-on' : 'radio-button-off'}
            style={{fontSize: 20, color: 'black'}}
          />
          <Text style={styles.radioText}>{'Home'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addressTypeButton,
            {
              borderWidth: 0.5,
              borderColor: addressType === 2 ? '#088F8F' : 'black',
            },
          ]}
          onPress={() => setAddressType(2)}>
          <Ionicons
            name={addressType === 2 ? 'radio-button-on' : 'radio-button-off'}
            style={{fontSize: 20, color: 'black'}}
          />
          <Text style={styles.radioText}>{'Office'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addAddressButton}
        onPress={() => {
          if (route.params.type === 'edit') {
            dispatch(
              updateAddress({
                state: addressState.state,
                city: addressState.city,
                pincode: addressState.pincode,
                addressType: addressType === 1 ? 'Home' : 'Office',
                id: route.params.data.id,
              }),
            );
          } else {
            dispatch(
              addAddress({
                state: addressState.state,
                city: addressState.city,
                pincode: addressState.pincode,
                addressType: addressType === 1 ? 'Home' : 'Office',
                id: uuid.v4().toString(),
              }),
            );
          }
          navigation.goBack();
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {'Save Address'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAddress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
    color: 'black',
  },
  addressTypeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  addressTypeButton: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 10,
    color: 'black',
  },
  addAddressButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#088F8F',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
