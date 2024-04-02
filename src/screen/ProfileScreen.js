import {
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import User from '../../assets/user.png'
import AuthContext from '../features/context/authContext'
import { logout } from '../features/firebase/userAuth'

const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext)

  const handleLogout = async () => {
    const res = await logout()
    if (res.success === true) {
      ToastAndroid.show('Logged Out Successfully', ToastAndroid.BOTTOM)
      setIsLoggedIn(false)
      setCurrentUser(null)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <View style={styles.borderContainer}>
            <Image source={User} style={styles.image} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          {isLoggedIn ? (
            <View style={styles.textContainer}>
              <Text style={styles.name}>{currentUser?.name}</Text>
              <Text style={styles.email}>{currentUser?.email}</Text>
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.loginText}>Login to view your Profile!</Text>
            </View>
          )}
        </View>
      </View>
      {isLoggedIn && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  image: {
    width: 128,
    height: 128,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
