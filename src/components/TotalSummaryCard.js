import { StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import CartContext from '../features/context/cartContext'
import { addToOrders } from '../features/firebase/order'
import OrderContext from '../features/context/orderContext'

const TotalSummaryCard = ({ totalPrice }) => {
  const { setCartItems } = useContext(CartContext)
  const { setOrderItems } = useContext(OrderContext)
  const placeOrder = async () => {
    const res = await addToOrders()
    if (res.success === true) {
      ToastAndroid.show('Order places successfully!!!', ToastAndroid.BOTTOM)
      setCartItems([])
      setOrderItems(res.data)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Total Price:</Text>
        <Text style={styles.priceValue}>${totalPrice}</Text>
      </View>
      <Pressable onPress={placeOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </View>
  )
}

export default TotalSummaryCard

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
})
