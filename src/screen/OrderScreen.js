import { Text, View, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import { getAllOrderItems } from '../features/firebase/order'
import OrderContext from '../features/context/orderContext'
import { auth } from '../../firebase'
import AuthContext from '../features/context/authContext'

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext)
  const { isLoggedIn } = useContext(AuthContext)

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems()
    if (res.success === true) {
      setOrders(res.data)
      console.log('res.data', res.data)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    fetchAllOrders()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {orders?.map((order) => (
            <OrderItem
              key={order.id}
              brand={order.brand}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login to view your Orders!</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollView: {
    marginTop: 4,
    paddingTop: 4,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
