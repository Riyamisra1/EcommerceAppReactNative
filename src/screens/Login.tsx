/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles/SignUpStyle';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../Firebase/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, getDocs, query, where} from 'firebase/firestore';
import Lottie from 'lottie-react-native';
import SweetAlert from 'react-native-sweet-alert';
import {useDispatch} from 'react-redux';
import {addUserToStore} from '../redux/slices/User';
import {updateWishList} from '../redux/slices/Wishlist';
import {updateCart} from '../redux/slices/CartSlice';
import {updateOrder} from '../redux/slices/OrderSlice';
import {updatePreviousAddress} from '../redux/slices/Address';
import {StackNavigationProp} from '@react-navigation/stack';
import {userData} from '../interface/ProductDataType';
type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
};
type SignInNavigation = StackNavigationProp<RootStackParamList>;
interface Prop {
  navigation: SignInNavigation;
}
const Login = ({navigation}: Prop) => {
  const navigate = () => {
    navigation.navigate('SignUp');
  };
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    emailError: false,
    emailErrorMessage: '',
    password: '',
    passwordError: false,
    passwordErrorMessage: '',
  });
  const dispatch = useDispatch();
  const disableButton = () => {
    setState({
      ...state,
      emailError: true,
      passwordError: true,
      emailErrorMessage: 'Input is required',
      passwordErrorMessage: 'Input is required',
    });
  };

  const handleValidation = (value: string) => {
    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(value)) {
      setState({
        ...state,
        email: value,
        emailError: false,
        emailErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        emailError: true,
        email: value,
        emailErrorMessage: 'Invalid Email',
      });
    }
  };
  const getUserData = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const queryCollection = query(
          collection(db, 'Users'),
          where('email', '==', email),
        );
        const querySnapshot = await getDocs(queryCollection);
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          dispatch(addUserToStore(doc.data() as userData));
          dispatch(updatePreviousAddress(doc.data().address));
          dispatch(updateWishList(doc.data().wishList));
          dispatch(updateCart(doc.data().cart));
          dispatch(updateOrder(doc.data().order));
        });
        gotonext();
      })
      .catch(error => {
        console.log(error);
        SweetAlert.showAlertWithOptions({
          title: 'Alert',
          subTitle: 'Invalid User Credentials',
          confirmButtonTitle: 'OK',
          style: 'default',
        });
      });
    setIsLoading(false);
  };
  const gotonext = async () => {
    await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
    navigation.navigate('Home');
  };
  return (
    <ScrollView>
      <View style={{height: 800, backgroundColor: 'white'}}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoStyle}
        />

        <Text style={styles.headingStyle}>Login</Text>

        <TextInput
          style={[
            styles.inputField,
            {borderColor: state.emailError ? 'red' : 'black'},
          ]}
          placeholder="Enter Email Id"
          placeholderTextColor={'gray'}
          value={state.email}
          onChangeText={value => handleValidation(value)}
        />
        {state.emailError ? (
          <Text style={{fontSize: 15, color: 'red', left: 20}}>
            {state.emailErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', left: 20}}> </Text>
        )}
        <TextInput
          style={[
            styles.inputField,
            {top: -225, borderColor: state.emailError ? 'red' : 'black'},
          ]}
          placeholder="Enter Password"
          placeholderTextColor={'gray'}
          value={state.password}
          secureTextEntry={true}
          onChangeText={value => setState({...state, password: value})}
        />
        {state.passwordError ? (
          <Text style={{fontSize: 15, color: 'red', left: 20, top: -220}}>
            {state.passwordErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', left: 20}}> </Text>
        )}
        {state.email === '' || state.password === '' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.loginButton, {top: -80}]}
            onPress={() => disableButton()}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginButton}
            onPress={() => getUserData(state.email, state.password)}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Login</Text>
          </TouchableOpacity>
        )}
        <Text
          style={[styles.buttonText, {fontSize: 20, left: 10, color: 'black'}]}>
          New Here ?? Create Account
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signUp}
          onPressIn={() => navigate()}>
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: 20,
                left: 10,
                textDecorationLine: 'underline',
                top: -20,
              },
            ]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        {isLoading ? (
          <Lottie
            source={require('../assests/Loader.json')}
            autoPlay
            loop
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
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Login;
