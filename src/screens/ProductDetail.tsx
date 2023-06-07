/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles/ProductDetailsStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemTowishList,
  removeItemFromWishList,
} from '../redux/slices/Wishlist';
import {addItemToCart} from '../redux/slices/CartSlice';
import {product} from '../interface/ProductDataType';
import HeaderWithBackButton from '../Component/HeaderWithBackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSignUpModal from '../Component/LoginSignUpModal';
import {StackNavigationProp} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
type RootStackParamList = {
  Cart: undefined;
  Login: undefined;
  SignUp: undefined;
};
type ProductDetailNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: ProductDetailNavigation;
}
const ProductDetail = ({navigation}: Prop) => {
  const route: RouteProp<
    {
      params: product;
    },
    'params'
  > = useRoute();
  console.log(route.params);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector(
    (state: {cart: {data: product[]}}) => state.cart,
  );
  const wishItems = useSelector(
    (state: {wishList: {data: product[]}}) => state.wishList,
  );
  const isItemExistInWishList = wishItems.data
    ? wishItems.data.filter(items => route.params.id === items.id).length === 1
    : false;
  const [isFavorite, setIsFavorite] = useState(isItemExistInWishList);
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateToPreviousScreen = () => {
    navigation.goBack();
  };
  const checkUserStatus = async () => {
    const userStatus = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    return userStatus === null ? false : true;
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const onClickLogin = () => {
    navigation.navigate('Login');
    setModalVisible(false);
  };

  const onClickSignUp = () => {
    navigation.navigate('SignUp');
    setModalVisible(false);
  };

  const favoritePressedAction = async (index: any) => {
    if ((await checkUserStatus()) === true) {
      if (!isFavorite) {
        setIsFavorite(true);

        dispatch(addItemTowishList(route.params));
      } else {
        setIsFavorite(false);
        dispatch(removeItemFromWishList(index));
      }
    } else {
      setModalVisible(true);
    }
  };

  const addTocartButtonPressedAction = async () => {
    if ((await checkUserStatus()) === true) {
      dispatch(addItemToCart(route.params));
    } else {
      setModalVisible(true);
    }
  };
  return (
    <>
      <HeaderWithBackButton
        navigateToPreviousScreen={navigateToPreviousScreen}
        headertitle={'Product Details'}
        navigateToCart={navigateToCart}
        cartItems={cartItems}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <Swiper
          horizontal={true}
          containerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -240,
          }}
          dotStyle={{marginTop: -350}}
          activeDotColor="blue"
          activeDotStyle={{marginTop: -350}}>
          {route.params.images.map((image, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: image}}
                style={styles.productImageDetailScreen}
              />
            </View>
          ))}
        </Swiper>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={index => favoritePressedAction(index)}>
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.productTitle}>{route.params.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.offerStyle}>
            {'-' + route.params.discountPercentage.toFixed(0) + '% OFF'}
          </Text>
          <Text style={styles.price}>{'$' + route.params.price}</Text>
        </View>
        <Text
          style={[
            styles.price,
            {
              color: 'black',
              marginLeft: 12,
              textDecorationLine: 'line-through',
              fontSize: 15,
              fontWeight: '300',
            },
          ]}>
          {`M.R.P.: $ ${route.params.price + route.params.discountPercentage}`}
        </Text>
        <View
          style={{
            borderTopColor: 'grey',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderBottomColor: 'grey',
            paddingBottom: 20,
          }}>
          <Text
            style={[styles.productDescription, {fontSize: 20, color: 'black'}]}>
            {'Details'}
          </Text>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              paddingBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[styles.productDescription, {color: 'black', left: 10}]}>
                {'Brand:'}
              </Text>
              <Text
                style={[
                  styles.productDescription,
                  {color: 'black', right: 150},
                ]}>
                {route.params.brand}
              </Text>
            </View>

            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={styles.productDescription}>{'Description: '}</Text>
              <Text
                style={[
                  styles.productDescription,
                  {
                    right: 150,
                    flexWrap: 'wrap',
                    paddingRight: 120,
                  },
                ]}>
                {route.params.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.iconContainer, {left: 20}]}>
          <Text
            style={[
              styles.offerStyle,
              {fontSize: 12, alignSelf: 'center', right: 5, fontWeight: '300'},
            ]}>
            {route.params.discountPercentage.toFixed(0) + '% OFF'}
          </Text>
        </View>
        <View
          style={{
            borderTopColor: 'grey',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderBottomColor: 'grey',
            paddingBottom: 20,
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.productDescription,
              {color: 'black', fontSize: 20},
            ]}>{`Total: $ ${route.params.price}`}</Text>
          <Text style={[styles.productDescription]}>
            <Text>
              {'FREE delivery'}
              <Text style={{fontWeight: '800', color: 'black'}}>
                {' Today 6PM - 10PM'}
              </Text>
            </Text>
          </Text>
          <Text
            style={[styles.productDescription, {color: 'green', fontSize: 20}]}>
            {'In Stock '}
          </Text>
          <View style={styles.addToCartButton}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => addTocartButtonPressedAction()}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: '900',
                  alignSelf: 'center',
                  padding: 7,
                }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 50,
            marginTop: 20,
          }}>
          <Text
            style={[
              styles.productDescription,
              {fontSize: 20, color: 'black', top: -120},
            ]}>
            {'Reviews and Ratings'}
          </Text>
          <Text
            style={[
              styles.productDescription,
              {fontSize: 20, color: 'black', top: -80, right: 300},
            ]}>
            {'Customer reviews'}
          </Text>
          <View style={styles.ratingConatiner}>
            <Text style={styles.ratingText}>{route.params.rating + ' '}</Text>
            <Ionicons name="star" style={styles.starIcon} />
          </View>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 80,
              marginLeft: -230,
              width: '80%',
              paddingBottom: 10,
              paddingTop: 20,
            }}>
            {route.params.review.map((item, index) => (
              <View style={{flexDirection: 'row', padding: 5}} key={index}>
                <Ionicons
                  name="star"
                  style={[styles.starIcon, {color: '#FEDD00'}]}
                />
                <Ionicons
                  name="star"
                  style={[styles.starIcon, {color: '#FEDD00'}]}
                />
                <Ionicons
                  name="star"
                  style={[styles.starIcon, {color: '#FEDD00'}]}
                />
                <Ionicons
                  name="star"
                  style={[styles.starIcon, {color: '#FEDD00'}]}
                />
                <Text
                  style={[
                    styles.productDescription,
                    {color: 'black', marginTop: 1, marginLeft: 20},
                  ]}
                  key={index}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <LoginSignUpModal
        modalVisible={modalVisible}
        onClickLogin={onClickLogin}
        onClickSignUp={onClickSignUp}
        onClose={onClose}
      />
    </>
  );
};

export default ProductDetail;
