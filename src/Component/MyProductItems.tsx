import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/ProductItemStyleCardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {product} from '../interface/ProductDataType';
interface MyProductItemTypes {
  item: product;
  navigate: any;
  index: number;
}
const MyProductItems = (props: MyProductItemTypes) => {
  const {item, navigate} = props;
  return (
    <>
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
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MyProductItems;
