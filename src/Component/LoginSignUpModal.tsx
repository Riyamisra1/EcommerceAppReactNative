/* eslint-disable react-native/no-inline-styles */
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
type onClickLoginType = () => void;
type onClickSignUpType = () => void;
type onCloseType = () => void;
interface LoginSignUpModalType {
  onClickLogin: onClickLoginType;
  onClickSignUp: onClickSignUpType;
  onClose: onCloseType;
  modalVisible: boolean;
}
const LoginSignUpModal = (props: LoginSignUpModalType) => {
  const {modalVisible, onClickLogin, onClickSignUp, onClose} = props;
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity onPressIn={() => onClose()}>
            <Ionicons
              name="close-circle-outline"
              style={{
                fontSize: 30,
                color: 'black',
                position: 'absolute',
                right: -140,
                top: -20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => onClickLogin()}>
            <Text style={styles.buttonText}>{'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => onClickSignUp()}>
            <Text style={styles.buttonText}>{'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    height: '25%',
    width: '90%',
    backgroundColor: '#088F8F',
    marginTop: 20,
    elevation: 8,
  },
  buttonText: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '800',
    color: 'white',
    marginTop: 5,
  },
});
export default LoginSignUpModal;
