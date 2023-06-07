/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
interface CheckoutLayoutType {
  total: string;
  items: number;
  navigateToCheckOut: any;
}
const CheckoutLayout = (props: CheckoutLayoutType) => {
  const {total, items, navigateToCheckOut} = props;
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.text}>{`(Items:-  ${items})`}</Text>
        <Text style={styles.text}>{'Total Price:-' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.8}
          onPress={() => navigateToCheckOut()}>
          <Text style={[styles.text, {color: 'white'}]}>{'CheckOut'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -5,
    backgroundColor: 'white',
    height: 70,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    width: '80%',
    height: '60%',
    backgroundColor: '#088F8F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 20, color: 'black'},
});
