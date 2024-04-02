import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const OrderItem = ({ orderId, title, image, brand, date, price, qty }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.text}>Quantity: {qty}</Text>
            <Text style={styles.text}>Date: {date}</Text>
            <Text style={styles.text}>
              OrderId: <Text style={styles.orderId}>#{orderId}</Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  brand: {
    fontSize: 14,
    color: '#888',
  },
  text: {
    fontSize: 12,
    color: '#888',
  },
  orderId: {
    fontWeight: 'bold',
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
