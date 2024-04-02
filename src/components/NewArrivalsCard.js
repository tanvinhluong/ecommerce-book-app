import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Pen from '../../assets/pen.png'

const NewArrivalsCard = ({ title, brand, price, image }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 6,
  },
  image: {
    borderRadius: 10,
    height: 150,
    width: 120,
  },
  content: {
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default NewArrivalsCard
