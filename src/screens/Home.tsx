/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ToastAndroid,
  ImageSourcePropType,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {styles} from '../styles/HomePageStyle';
import {product, productCategory} from '../interface/ProductDataType';
import MyProductItems from '../Component/MyProductItems';
import SearchItemsMainScreen, {searchedList} from './SearchItemsMainScreen';
import {useDispatch, useSelector} from 'react-redux';
import {addProducts} from '../redux/slices/Product';
import Header from '../Component/HeaderOfMainScreen';
import {ImageSlider} from 'react-native-image-slider-banner';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  ProductDetail: {item: string};
  Search: undefined;
  Cart: undefined;
};
type HomeScreenNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: HomeScreenNavigation;
}
const HomeScreen = ({navigation}: Prop) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productList, setProductList] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productCategory, setProductCategory] = useState<productCategory>({
    smartphone: [],
    laptops: [],
    fragrances: [],
    skincare: [],
    groceries: [],
    homedecoration: [],
  });
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: {cart: {data: product[]}}) => state.cart,
  );

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let temporaryCategory: product[] = [];
    let smartphoneSection = [];
    let laptopSection = [];
    let fragrancesSection = [];
    let skincareSection = [];
    let groceriesSection = [];
    let homedecorationSection = [];
    setIsLoading(true);
    await fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => {
        json.products.map((item: product) => {
          temporaryCategory.push(item);
          smartphoneSection = temporaryCategory.filter(
            (value: product) => value.category === 'smartphones',
          );
          laptopSection = temporaryCategory.filter(
            (value: product) => value.category === 'laptops',
          );
          fragrancesSection = temporaryCategory.filter(
            (value: product) => value.category === 'fragrances',
          );
          skincareSection = temporaryCategory.filter(
            (value: product) => value.category === 'skincare',
          );
          groceriesSection = temporaryCategory.filter(
            (value: product) => value.category === 'groceries',
          );
          homedecorationSection = temporaryCategory.filter(
            (value: product) => value.category === 'home-decoration',
          );
          setProductCategory({
            ...productCategory,
            smartphone: smartphoneSection,
            laptops: laptopSection,
            fragrances: fragrancesSection,
            skincare: skincareSection,
            groceries: groceriesSection,
            homedecoration: homedecorationSection,
          });
          setProductList(temporaryCategory);
          item.quantity = 1;
          item.isFavorite = false;
          item.review = [
            'Good Product',
            'Overall quality is perfect',
            'Perfect product',
            'Nice',
          ];
        });
        dispatch(addProducts(json.products));
      });
    setIsLoading(false);
  };

  const navigate = (item: {item: string}) => {
    navigation.navigate('ProductDetail', item);
  };
  const navigateToSearch = () => {
    if (searchedList.length !== 0) {
      navigation.navigate('Search');
    } else {
      ToastAndroid.show('No such items', ToastAndroid.SHORT);
    }
  };
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
      <Header
        headertitle={'ShopaHolic'}
        navigateToCart={navigateToCart}
        cartItems={cartItems}
      />
      {isLoading ? (
        <Lottie
          source={require('../assests/Loader.json')}
          autoPlay
          speed={2}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <>
          <View style={{height: 70}}>
            <SearchItemsMainScreen navigateToSearch={navigateToSearch} />
          </View>

          <ScrollView>
            <ImageSlider
              data={[
                {
                  img: 'https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=740&t=st=1681368276~exp=1681368876~hmac=90505f98d093eaa663bc5041546c1a9723cc26046f89a70467a9b47546d7d8b1' as ImageSourcePropType,
                },
                {
                  img: 'https://img.freepik.com/free-psd/online-shopping-concept-banner-template_23-2148559464.jpg?size=626&ext=jpg&ga=GA1.2.746738618.1677302993&semt=ais' as ImageSourcePropType,
                },
                {
                  img: 'https://img.freepik.com/free-psd/banner-template-online-shopping_23-2148559048.jpg?size=626&ext=jpg&ga=GA1.2.746738618.1677302993&semt=ais' as ImageSourcePropType,
                },
                {
                  img: 'https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?size=626&ext=jpg&ga=GA1.1.746738618.1677302993&semt=ais' as ImageSourcePropType,
                },
              ]}
              autoPlay={true}
              caroselImageStyle={styles.bannerStyle}
            />
            <View>
              <Text style={styles.productHeaderText}>SmartPhones</Text>
            </View>

            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.smartphone}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      navigate={navigate}
                      index={index}
                    />
                  );
                }}
              />
            </View>

            <View>
              <Text style={styles.productHeaderText}>Laptops</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.laptops}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      navigate={navigate}
                      index={index}
                    />
                  );
                }}
              />
            </View>

            <View>
              <Text style={styles.productHeaderText}>Perfumes</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.fragrances}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      navigate={navigate}
                      index={index}
                    />
                  );
                }}
              />
            </View>

            <View>
              <Text style={styles.productHeaderText}>SkinCare</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.skincare}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      index={index}
                      navigate={navigate}
                    />
                  );
                }}
              />
            </View>
            <View>
              <Text style={styles.productHeaderText}>Groceries</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.groceries}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      index={index}
                      navigate={navigate}
                    />
                  );
                }}
              />
            </View>
            <View>
              <Text style={styles.productHeaderText}>Home decoration</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={productCategory.homedecoration}
                renderItem={({item, index}) => {
                  return (
                    <MyProductItems
                      item={item}
                      index={index}
                      navigate={navigate}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default HomeScreen;
