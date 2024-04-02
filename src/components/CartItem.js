import React, { useContext } from 'react'
import { Text, View, Image, Pressable, ToastAndroid } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { removeItemById } from '../features/firebase/cart'
import CartContext from '../features/context/cartContext'

const CartItem = ({ title, image, price, brand, qty, id }) => {
  const { setCartItems } = useContext(CartContext)

  const removeItem = async () => {
    const res = await removeItemById(id)
    if (res.success === true) {
      ToastAndroid.show('Removed Successfully', ToastAndroid.BOTTOM)
      setCartItems(res.data)
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ padding: 2 }}>
          <Image
            source={{ uri: image }}
            style={{ borderRadius: 10, height: 80, width: 80 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          <View style={{ width: '50%' }}>
            <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
              {title}
            </Text>
            <Text style={{ fontSize: 12 }}>{brand}</Text>
            <Text style={{ fontWeight: 'bold' }}>Qty: {qty}</Text>
            <Text style={{ fontWeight: 'bold' }}>${price}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
          >
            <Pressable
              onPress={removeItem}
              style={{
                marginRight: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="delete-outline" size={20} />
              <Text>Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}
      />
    </View>
  )
}

export default CartItem
