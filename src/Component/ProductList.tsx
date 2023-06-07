/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../styles/SearchPageStyling';
import {useSelector} from 'react-redux';
import {product} from '../interface/ProductDataType';
type addTowishList = (item: product) => void;
type removeFromWishList = (index: number) => void;
interface ProductListType {
  item: product;
  navigate: any;
  addTowishList: addTowishList;
  checkUserStatus: any;
  removeFromWishList: removeFromWishList;
  index: number;
}
const ProductList = (props: ProductListType) => {
  const {
    item,
    navigate,
    addTowishList,
    checkUserStatus,
    removeFromWishList,
    index,
  } = props;
  const wishItems = useSelector(
    (state: {wishList: {data: product[]}}) => state.wishList,
  );
  const isEmailExistInWishList =
    wishItems.data.filter(items => item.id === items.id).length === 1;
  const [isFavorite, setIsFavorite] = useState<boolean>();
  useEffect(() => {
    setIsFavorite(isEmailExistInWishList);
  }, [wishItems]);
  const favoriteIconPressedAction = async () => {
    if ((await checkUserStatus()) === true) {
      if (!isFavorite) {
        setIsFavorite(true);
        addTowishList(item);
      } else {
        setIsFavorite(false);
        removeFromWishList(index);
      }
    } else {
      ToastAndroid.show('User is not logged in', ToastAndroid.SHORT);
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(item)}>
      <View style={styles.myproductItemStyle}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.productImageStyle}
        />

        <Text style={styles.productTitle}>{item.title}</Text>

        <Text style={styles.priceStyle}>$ {item.price}</Text>

        <View style={styles.ratingConatiner}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Ionicons name="star" style={styles.starIcon} />
        </View>

        <TouchableOpacity
          style={styles.favoriteIconContainer}
          onPress={() => favoriteIconPressedAction()}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
