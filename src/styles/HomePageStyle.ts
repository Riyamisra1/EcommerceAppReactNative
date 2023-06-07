import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  bannerStyle: {
    width: responsiveWidth(95),
    height: height - 500,
    marginLeft: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  productCategoryHeadingStyle: {
    marginTop: responsiveHeight(2),
  },
  headerText: {
    color: 'black',
  },
  headerButtonStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10,
  },
  productHeaderText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    position: 'absolute',
    left: 15,
    top: 15,
  },
  searchViewStyle: {
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    top: 15,
    marginLeft: 20,
    marginRight: 60,
    flexDirection: 'row',
  },
  inputField: {
    color: 'black',
    width: 200,
  },
});
