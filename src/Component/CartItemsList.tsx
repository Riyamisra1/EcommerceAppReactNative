/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/CartStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {product} from '../interface/ProductDataType';
type addToCartType = (item: product) => void;
type reduceFromCartType = (item: product) => void;
type removeFromCartType = (index: number) => void;
type alertDialogueType = (index: number) => void;
interface CartItemsListType {
  item: product;
  navigate: any;
  addToCart: addToCartType;
  reduceFromCart: reduceFromCartType;
  removeFromCart: removeFromCartType;
  index: number;
  alertDialogueToDelete: alertDialogueType;
}
const CartItemsList = (props: CartItemsListType) => {
  const {
    item,
    navigate,
    addToCart,
    reduceFromCart,
    removeFromCart,
    index,
    alertDialogueToDelete,
  } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(item)}>
      <View style={styles.myproductItemStyle}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.productImageStyle}
        />

        <Text style={styles.productTitle}>{item.title}</Text>

        <Text style={styles.priceStyle}>$ {item.price}</Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 40,
            top: 270,
          }}>
          <Text style={styles.quantityText}>Qty:</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              if (item.quantity > 1) {
                reduceFromCart(item);
              } else {
                removeFromCart(index);
              }
            }}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => addToCart(item)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ratingConatiner}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Ionicons name="star" style={styles.starIcon} />
        </View>

        <TouchableOpacity
          style={[styles.iconContainer, {top: 20}]}
          onPress={() => alertDialogueToDelete(index)}>
          <AntDesign name="delete" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CartItemsList;
