import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeToken } from './actions/authActions';
import config from './config';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token); // Access token from Redux store

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Pressed = () => {
    const loginData = {
      email: email,
      password: password
    };

    console.log(`${config.SERVER_ENDPOINT}user/login`);
    axios.post(`${config.SERVER_ENDPOINT}user/login`, loginData)
    .then(response => {
      const loginToken = response.data;
  
      // Dispatch the action to store the token in Redux
      dispatch(storeToken(loginToken));
      console.log('leader',loginToken.user.isLeader);
      if(loginToken.user.isLeader)
      navigation.navigate('TEST');
    else
      navigation.navigate('MainPage');
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        Alert.alert('Leader not approved', 'You are not approved by leader.');
      } else {
        Alert.alert('Incorrect email or password');
      }
    });
  
  };

  console.log('Token in Redux:', token); // Log the token from Redux store

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        onChangeText={setEmail}
        value={email}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
        onPress={Pressed}
        style={styles.button}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignupPage')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => { navigation.navigate('ForgotPassword') }}
        style={{margin:20}}
      >
        <Text style={styles.buttonText}>Forgot Password?</Text>
      </TouchableOpacity>

   

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    height: 50,
    width: 150,
    backgroundColor: '#B5C18E' // You can change the button color here
  },
  buttonText: {
    color: '#000000', // Example text color
    fontSize: 16, // Example font size
  },
});

export default LoginScreen;
