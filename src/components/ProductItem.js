import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ProductItem = ({ title, brand, image, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.brand}>{brand}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price: ${price}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  brand: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  priceContainer: {
    marginTop: 4,
  },
  price: {
    fontSize: 12,
    color: '#333',
  },
})

export default ProductItem
