import {StyleSheet, Dimensions} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  myproductItemStyle: {
    width: width - 20,
    height: height - 360,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginBottom: 10,
  },
  productImageStyle: {
    width: '100%',
    height: 270,
    resizeMode: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productTitle: {
    fontSize: responsiveHeight(2),
    color: '#000',
    position: 'absolute',
    top: 280,
    left: 8,
    fontWeight: '600',
  },
  priceStyle: {
    fontSize: responsiveHeight(2),
    color: '#000',
    position: 'absolute',
    top: 350,
    left: 8,
    fontWeight: '600',
  },
  ratingConatiner: {
    backgroundColor: 'green',
    flexDirection: 'row',
    position: 'absolute',
    top: 370,
    left: 9,
  },
  ratingText: {
    color: 'white',
    fontSize: responsiveHeight(2),
    fontWeight: '700',
    textAlign: 'center',
    paddingLeft: 5,
  },
  starIcon: {
    fontSize: responsiveHeight(2),
    color: 'white',
    marginTop: 2,
  },
  favoriteIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: responsiveHeight(3),
    color: 'red',
  },
});
