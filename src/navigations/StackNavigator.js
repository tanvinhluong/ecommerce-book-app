import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/HomeScreen'
import DetailScreen from '../screen/DetailScreen'
import ProductListScreen from '../screen/ProductListScreen'
import CartScreen from '../screen/CartScreen'
import OrderScreen from '../screen/OrderScreen'
import ProfileScreen from '../screen/ProfileScreen'

const Stack = createStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="detail-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="home-screen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="detail-screen"
        component={DetailScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="product-screen"
        component={ProductListScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="cart-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="cart-screen" component={CartScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="order-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="order-screen" component={OrderScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#91c4f8',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="profile-screen"
        component={ProfileScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
export {
  MainStackNavigator,
  CartStackNavigator,
  OrderStackNavigator,
  ProfileStackNavigator,
}
