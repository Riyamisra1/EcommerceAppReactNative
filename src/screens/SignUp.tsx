/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles/SignUpStyle';
import {auth, db} from '../Firebase/FirebaseConfig';
import {addDoc, collection} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import Lottie from 'lottie-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};
type SignUpNavigation = StackNavigationProp<RootStackParamList, 'Login'>;
interface Prop {
  navigation: SignUpNavigation;
}
const SignUp = ({navigation}: Prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    checkValidEmail: false,
    emailErrorMessage: '',
    password: '',
    passwordError: false,
    passwordErrorMessage: '',
    userName: '',
    userNameError: false,
    userNameErrorMessage: '',
    confirmPassword: '',
    confirmPasswordError: false,
    confirmPasswordErrorMessage: '',
  });
  const handleValidation = (value: string) => {
    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

    if (regex.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: false,
        passwordErrorMessage: '',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
        email: value,
      });
    } else {
      setState({
        ...state,
        checkValidEmail: true,
        emailErrorMessage: 'Invalid Email',
        passwordError: false,
        passwordErrorMessage: '',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
        email: value,
      });
    }
  };
  const disableButton = () => {
    setState({
      ...state,
      checkValidEmail: true,
      emailErrorMessage: 'Input is required',
      passwordError: true,
      passwordErrorMessage: 'Input is required',
      userNameError: true,
      userNameErrorMessage: 'Input is required',
      confirmPasswordError: true,
      confirmPasswordErrorMessage: 'Input is required',
    });
  };
  const checkPasswordValidation = (value: string) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: true,
        password: value,
        passwordErrorMessage: 'Password must not contain Whitespaces',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        password: value,
        passwordError: false,
        passwordErrorMessage: '',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    }
    const isContainingUpperCase = /^(?=.*[A-Z]).*$/;
    if (!isContainingUpperCase.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: true,
        password: value,
        passwordErrorMessage: 'Password must have at least one Uppercase',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: false,
        password: value,
        passwordErrorMessage: 'Password must have at least one Uppercase',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    }
    const isContainingLowerCase = /^(?=.*[a-z]).*$/;
    if (!isContainingLowerCase.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: true,
        password: value,
        passwordErrorMessage: 'Password must have at least one Lowercase',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: false,
        password: value,
        passwordErrorMessage: '',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    }

    const isContainingNumber = /^(?=.*[0-9]).*$/;
    if (!isContainingNumber.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: true,
        password: value,
        passwordErrorMessage: 'Password must have at least one Digit',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: false,
        password: value,
        passwordErrorMessage: '',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    }

    const isValidLength = /^.{8}$/;
    if (!isValidLength.test(value)) {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: true,
        password: value,
        passwordErrorMessage: 'Password must be 8 Characters long',
        userNameError: false,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    } else {
      setState({
        ...state,
        checkValidEmail: false,
        emailErrorMessage: '',
        passwordError: false,
        passwordErrorMessage: '',
        userNameError: false,
        password: value,
        userNameErrorMessage: '',
        confirmPasswordError: false,
        confirmPasswordErrorMessage: '',
      });
    }

    return null;
  };

  const handleLogin = () => {
    const checkPassword = checkPasswordValidation(state.password);
    if (checkPassword) {
      ToastAndroid.show('Password Invalid credentials', ToastAndroid.SHORT);
    } else if (state.password !== state.confirmPassword) {
      ToastAndroid.show('Password does not match', ToastAndroid.SHORT);
    } else {
      addUser(state.email, state.password);
    }
    setState({
      ...state,
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    });
  };

  const checkConfirmPassword = (value: string) => {
    if (state.password !== value) {
      setState({
        ...state,
        confirmPassword: value,
        confirmPasswordError: true,
        confirmPasswordErrorMessage: 'Password does not match',
      });
    } else {
      setState({...state, confirmPassword: value, confirmPasswordError: false});
    }
  };

  const addUser = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addDoc(collection(db, 'Users'), {
          name: state.userName,
          email: email,
          cart: [],
          wishList: [],
          order: [],
          selectedAddress: [],
        });
        setState({
          ...state,
          email: '',
          userName: '',
          password: '',
          confirmPassword: '',
        });
        navigation.navigate('Login');
      })
      .catch(() => {
        Alert.alert('Email already exist');
      });
    setIsLoading(false);
    setState({
      ...state,
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          height: 800,
        }}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoStyle}
        />

        <Text style={styles.headingStyle}>Create Account</Text>

        <TextInput
          style={[
            styles.inputField,
            {borderColor: state.checkValidEmail ? 'red' : 'black'},
          ]}
          placeholder="Enter Email Id"
          placeholderTextColor={'gray'}
          value={state.email}
          onChangeText={value => handleValidation(value)}
        />
        {state.checkValidEmail ? (
          <Text style={{fontSize: 15, color: 'red', left: 20}}>
            {state.emailErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', left: 20}}> </Text>
        )}
        <TextInput
          style={[
            styles.inputField,
            {marginTop: 5, borderColor: state.userNameError ? 'red' : 'black'},
          ]}
          placeholder="Enter Name"
          placeholderTextColor={'gray'}
          value={state.userName}
          onChangeText={value => setState({...state, userName: value})}
        />
        {state.userNameError ? (
          <Text style={{fontSize: 15, color: 'red', left: 20}}>
            {state.userNameErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', left: 20}}> </Text>
        )}
        <TextInput
          style={[
            styles.inputField,
            {top: -220, borderColor: state.passwordError ? 'red' : 'black'},
          ]}
          placeholder="Enter Password"
          placeholderTextColor={'gray'}
          value={state.password}
          secureTextEntry={true}
          onChangeText={value => {
            checkPasswordValidation(value);
          }}
        />
        {state.passwordError ? (
          <Text style={{fontSize: 15, color: 'red', top: -220, left: 20}}>
            {state.passwordErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', top: -220, left: 20}} />
        )}
        <TextInput
          style={{
            alignSelf: 'center',
            color: 'black',
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.5,
            paddingLeft: 20,
            marginTop: -210,
            borderColor: state.confirmPasswordError ? 'red' : 'black',
          }}
          placeholder="Enter Confirm Password"
          placeholderTextColor={'gray'}
          value={state.confirmPassword}
          secureTextEntry={true}
          onChangeText={value => {
            checkConfirmPassword(value);
          }}
        />
        {state.confirmPasswordError ? (
          <Text style={{fontSize: 15, color: 'red', top: -2, left: 20}}>
            {state.confirmPasswordErrorMessage}
          </Text>
        ) : (
          <Text style={{fontSize: 15, color: 'red', top: -2, left: 20}} />
        )}
        {state.email === '' ||
        state.password === '' ||
        state.userName === '' ||
        state.confirmPassword === '' ||
        state.checkValidEmail === true ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signUpButton}
            onPress={() => disableButton()}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signUpButton}
            onPress={() => {
              handleLogin();
            }}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.buttonText, {fontSize: 20, color: 'black'}]}>
          Already Have Account??
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signUp}
          onPressIn={() => navigation.navigate('Login')}>
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: 20,
                textDecorationLine: 'underline',
              },
            ]}>
            Login
          </Text>
        </TouchableOpacity>
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
        ) : null}
      </View>
    </ScrollView>
  );
};

export default SignUp;
