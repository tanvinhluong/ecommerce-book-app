import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import Suit from '../../assets/suit.png'

const OfferCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.offerTitle}>50% Off</Text>
        <Text style={styles.offerSubtitle}>On everything today</Text>
        <Text style={styles.offerCode}>With code: FSCREATION</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Now</Text>
        </Pressable>
      </View>
      <View>
        <Image source={Suit} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: 250,
    paddingVertical: 2,
    marginRight: 6,
    maxHeight: 160,
    overflow: 'hidden',
    backgroundColor: '#c7c7c7',
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  offerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  offerSubtitle: {
    fontSize: 16,
  },
  offerCode: {
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: 'black',
    width: 60,
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 3,
    marginVertical: 1,
  },
  image: {
    height: 150,
    width: 55,
    resizeMode: 'contain',
  },
})

export default OfferCard
