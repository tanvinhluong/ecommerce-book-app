import { Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartItem from '../components/CartItem'
import TotalSummaryCard from '../components/TotalSummaryCard'
import CartContext from '../features/context/cartContext'
import { getCartItems } from '../features/firebase/cart'
import AuthContext from '../features/context/authContext'

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState()
  const { currentUser, isLoggedIn } = useContext(AuthContext)
  const { cartItems, setCartItems } = useContext(CartContext)

  const calculateTotalAmount = async (data) => {
    if (data && data.length > 0) {
      const subTotal = data.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.qty),
        0
      )
      setTotal(subTotal.toFixed(2))
    } else {
      setTotal('0.00') // Set total to 0 if no items are present
    }
  }

  const fetchCartItems = async () => {
    const res = await getCartItems()
    if (res.success === true) {
      setCartItems(res.data)
      calculateTotalAmount(res.data)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    fetchCartItems()
  }, [currentUser, cartItems?.length])

  return (
    <SafeAreaView
      style={{ flex: 1, width: '100%', padding: 5, backgroundColor: 'white' }}
    >
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>My Cart</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView
          style={{ marginTop: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {cartItems?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              brand={item.brand}
              qty={item.qty}
              image={item.image}
              price={item.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Login to view your Cart!
          </Text>
        </View>
      )}
      <View>
        <TotalSummaryCard totalPrice={total} />
      </View>
    </SafeAreaView>
  )
}

export default CartScreen
