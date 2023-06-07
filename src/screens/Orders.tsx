/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {orderType} from '../interface/OrderType';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Orders = () => {
  const orderList = useSelector(
    (state: {order: {data: orderType[]}}) => state.order,
  );

  return (
    <View style={styles.container}>
      <Text>Orders</Text>

      <FlatList
        data={orderList.data}
        renderItem={({item}) => {
          return (
            <View style={styles.orderView}>
              <FlatList
                data={item.items}
                renderItem={({item}) => {
                  return (
                    <View>
                      <View style={styles.productItem}>
                        <Image
                          source={{uri: item.thumbnail}}
                          style={styles.itemImage}
                        />
                        <View>
                          <Text style={styles.text}>
                            {item.title.length > 20
                              ? item.title.substring(0, 20)
                              : item.title}
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {fontSize: 15, fontWeight: '300'},
                            ]}>
                            {item.description.length > 20
                              ? item.description.substring(0, 25)
                              : item.description}
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {fontSize: 20, fontWeight: '300', color: 'green'},
                            ]}>
                            {'$ ' + item.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 20,
                    fontWeight: '300',
                    position: 'absolute',
                    right: 30,
                    top: 100,
                  },
                ]}>
                {item.orderDate}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderView: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 0.4,
    padding: 10,
  },
  productItem: {
    width: '95%',
    height: 190,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 20,
    borderRadius: 20,
    borderColor: '#00',
  },
  itemImage: {
    width: responsiveWidth(30),
    height: 200,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
});
export default Orders;
