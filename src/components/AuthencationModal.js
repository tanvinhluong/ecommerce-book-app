import React, { useContext, useEffect, useState } from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import AuthContext from '../features/context/authContext'
import Logo from '../../assets/favicon.png'
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../features/firebase/userAuth'

const AuthencationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser, setCurrentUser, setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async () => {
    setLoading(true)
    const res = await loginWithEmailAndPassword(email, password)
    if (res.success === true) {
      console.log('user', res.user)
      setCurrentUser(res.user)
      setIsLoggedIn(true)
      setModalVisible(false)
      ToastAndroid.show('Logged in Successfully', ToastAndroid.BOTTOM)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    const res = await registerWithEmailAndPassword(name, email, password)
    if (res.success === true) {
      console.log('user', res.user)
      setModalVisible(false)
      setType('login')
      ToastAndroid.show('Registered Successfully', ToastAndroid.BOTTOM)
    }
  }
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true)
    }
  }, [currentUser])

  return (
    <View style={{ flex: 1, width: 1150 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        {type === 'login' ? (
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.boldText}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.boldText}>Password:</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.linkContainer}>
                <Text style={styles.text}>Not a User?</Text>
                <Pressable onPress={() => setType('register')}>
                  <Text style={[styles.text, styles.bold]}> Register</Text>
                </Pressable>
              </View>
              {loading && <ActivityIndicator />}
            </View>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.boldText}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.boldText}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.boldText}>Password:</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.linkContainer}>
                <Text style={styles.text}>Already a User?</Text>
                <Pressable onPress={() => setType('login')}>
                  <Text style={[styles.text, styles.bold]}> Login</Text>
                </Pressable>
              </View>
              {loading && <ActivityIndicator />}
            </View>
          </Pressable>
        )}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default AuthencationModal
