import {StyleSheet} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 5,
    color: 'black',
    fontWeight: '600',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(5),
  },
  orderButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#088F8F',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 20,
  },
});
