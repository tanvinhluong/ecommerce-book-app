import {
  Text,
  View,
  Pressable,
  Image,
  ToastAndroid,
  StyleSheet,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getProductById } from '../features/firebase/product'
import ProductContext from '../features/context/productContext'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartContext from '../features/context/cartContext'
import { addToCart } from '../features/firebase/cart'
import Pen from '../../assets/pen.png'
const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } =
    useContext(ProductContext)
  const { setCartItems } = useContext(CartContext)
  const [qty, setQty] = useState(1)
  const id = route.params.productId

  const increment = () => {
    setQty((prev) => prev + 1)
  }

  const decrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  const addItemToCart = async () => {
    const res = await addToCart(id, qty)
    if (res.success === true) {
      ToastAndroid.show('item added to cart', ToastAndroid.BOTTOM)
      setCartItems(res.data)
    }
  }

  const fetchProductById = async (id) => {
    const result = await getProductById(id)
    setCurrentProduct(result)
  }
  useEffect(() => {
    fetchProductById(id)
  }, [id])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={goBack}>
          <MaterialIcons name="chevron-left" size={34} color={'#fff'} />
        </Pressable>
        <Image source={{ uri: product?.image }} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product?.title}</Text>
            <Text style={styles.brand}>{product?.brand}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={decrement}>
              <Text style={styles.quantityText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{qty}</Text>
            <Pressable style={styles.quantityButton} onPress={increment}>
              <Text style={styles.quantityText}>+</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{product?.description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Total Price</Text>
          <Text style={styles.price}>${product?.price}</Text>
        </View>
        <Pressable onPress={addItemToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'black',
    width: '100%',
  },
  backButton: {
    marginTop: 2,
    position: 'absolute',
    zIndex: 10,
    top: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginLeft: 4,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  image: {
    resizeMode: 'cover',
    height: 470,
  },
  detailsContainer: {
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: -20,
    padding: 5,
  },
  details: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  brand: {
    fontSize: 12,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  quantityButton: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  quantityText: {
    fontWeight: 'bold',
  },
  quantity: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: '#888',
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  priceText: {
    color: '#888',
    marginBottom: -4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addToCartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default DetailScreen
