import React, { useEffect, useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import UserLogo from '../../assets/user.png'
import OfferCard from '../components/OfferCard'
import NewArrivalsCard from '../components/NewArrivalsCard'
import AuthencationModal from '../components/AuthencationModal'
import AuthContext from '../features/context/authContext'
import { getProducts } from '../features/firebase/product'
import ProductContext from '../features/context/productContext'

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { isLoggedIn, currentUser } = useContext(AuthContext)
  const { products, setProducts } = useContext(ProductContext)
  const fetchAllProducts = async () => {
    const result = await getProducts()
    setProducts(result)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    fetchAllProducts()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.menuIcon}>
            <MaterialIcons name="menu" size={24} color={'#fff'} />
          </View>
          {!isLoggedIn && (
            <View>
              <Pressable
                style={styles.loginButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image source={UserLogo} style={styles.userLogo} />
                <Text style={styles.boldText}>Login</Text>
              </Pressable>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>
            Welcome,
            <Text style={styles.boldText}>{currentUser?.name}</Text>
          </Text>
          <Text style={styles.grayText}>Book Store</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={24} color={'#111'} />
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'#666666'}
              style={styles.searchInput}
            />
          </View>
        </View>
        <View style={styles.container}>
          <OfferCard />
        </View>
        <View style={styles.newArrivalsContainer}>
          <View style={styles.newArrivalsHeader}>
            <Text style={styles.newArrivalsHeaderText}>New Arrivals</Text>
            <Pressable onPress={() => navigation.navigate('product-screen')}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <ScrollView
            style={styles.newArrivalsScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {products?.map((product) => (
              <Pressable
                key={product.id}
                onPress={() =>
                  navigation.navigate('detail-screen', {
                    productId: product.id,
                  })
                }
              >
                <NewArrivalsCard
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  price={product.price}
                  brand={product.brand}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View>
          <AuthencationModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 20,
    padding: 5,
  },
  userLogo: {
    height: 40,
    width: 40,
    backgroundColor: '#aaaaaa',
    borderRadius: 20,
  },
  container: {
    marginTop: 6,
    paddingHorizontal: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  grayText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#888',
  },
  searchContainer: {
    marginTop: 6,
    paddingHorizontal: 5,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    padding: 2,
    paddingHorizontal: 3,
    alignItems: 'center',
    borderRadius: 30,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 5,
    color: '#666666',
  },
  newArrivalsContainer: {
    marginTop: 4,
  },
  newArrivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  newArrivalsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#888',
  },
  newArrivalsScrollView: {
    marginLeft: 5,
  },
})

export default HomeScreen
