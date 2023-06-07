/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/**
 * ShopaHolic App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './src/screens/Account';
import WishList from './src/screens/WishList';
import HomeScreen from './src/screens/Home';
import ProductDetail from './src/screens/ProductDetail';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SearchScreen from './src/screens/Searchscreen';
import Cart from './src/screens/Cart';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import MyProductItems from './src/Component/MyProductItems';
import CheckOut from './src/Component/CheckOut';
import Address from './src/screens/Address';
import AddAddress from './src/screens/AddAddress';
import OrderSuccess from './src/screens/OrderSuccess';
import Orders from './src/screens/Orders';


enum screenName {
  Account = 'Account',
  WishList='WishList',
  Home='Home',
  HomeScreen='HomeScreen',
  ProductDetail='ProductDetail',
  Login='Login',
  SignUp='SignUp',
  Search='Search',
  Cart='Cart',
  MyProductItem='MyProductItem',
  CheckOut='CheckOut',
  Address='Address',
  AddAddress='AddAddress',
  OrderSuccess='OrderSuccess',
  Orders='Orders'
}

export const Home = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor="#088F8F"
      inactiveColor="black"
      barStyle={{height:responsiveHeight(9)}}
      initialRouteName={screenName.Home}
      screenOptions={({route}) => ({
        tabBarIcon: focused => {
          if (route.name === screenName.Home) {
            return (
              <Ionicons
                name="home-outline"
                color={'black'}
                style={{fontSize: 30, marginTop: -5}}
              />
            );
          } else if (route.name === screenName.Account) {
            return (
              <FontAwesome
                name="user-o"
                color={'black'}
                style={{fontSize: 30,marginTop:-5}}
              />
            );
          } else if (route.name === screenName.WishList) {
            return (
              <FontAwesome
                name="heart-o"
                color={'black'}
                style={{fontSize: 30, marginTop: -5}}
              />
            );
          }
        },
      })}>
      <Tab.Screen name={screenName.Home} component={HomeScreen}/>
      <Tab.Screen name={screenName.WishList} component={WishList} />
      <Tab.Screen name={screenName.Account} component={Account}/>
    </Tab.Navigator>
  );
};


const App = ()=>{
   const Stack = createNativeStackNavigator();
   return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen
           name={screenName.HomeScreen}
           component={Home}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name={screenName.ProductDetail}
           component={ProductDetail}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name={screenName.Search}
           component={SearchScreen}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
         <Stack.Screen
           name={screenName.Cart}
           component={Cart}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
         <Stack.Screen
           name={screenName.Login}
           component={Login}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name={screenName.SignUp}
           component={SignUp}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name={screenName.CheckOut}
           component={CheckOut}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
         <Stack.Screen
           name={screenName.Address}
           component={Address}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
         <Stack.Screen
           name={screenName.AddAddress}
           component={AddAddress}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
         <Stack.Screen
           name={screenName.OrderSuccess}
           component={OrderSuccess}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name={screenName.Orders}
           component={Orders}
           options={{
             headerStyle: {
               backgroundColor: '#088F8F',
             },
             headerTitleStyle: {
               color: 'white',
             },
             headerTintColor: 'white',
           }}
         />
       </Stack.Navigator>
     </NavigationContainer>
   );
};

export default App;
