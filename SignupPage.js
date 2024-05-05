import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon
import { useNavigation,CommonActions} from '@react-navigation/native';
import axios from 'axios';
import config from './config';

export default function SignupPage() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pinCode, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    // Check for empty fields
    if (!name || !email || !password || !confirmPassword || !phone || !pinCode) {
      Alert.alert('Empty fields', 'Please fill in all fields.');
      return;
    }
    // Check email syntax
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    // Check name contains only letters
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      Alert.alert('Invalid name', 'Name should contain only letters.');
      return;
    }
    // Check phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid phone number', 'Phone number should be 10 digits.');
      return;
    }
    // Check pin code format
    const pinCodeRegex = /^\d{6}$/;
    if (!pinCodeRegex.test(pinCode)) {
      Alert.alert('Invalid pin code', 'Pin code must be exactly 6 digits.');
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure both passwords match.');
      return;
    }
    // Proceed with signup logic here

    const SignUpData={
      name:name,
      email:email,
      password:password,
      phone:phone,
      pincode:pinCode

    }


    axios.post(`${config.SERVER_ENDPOINT}user/register`, SignUpData)
    .then(response => {

      const Res = response.data;

      console.log(Res);


      // You can also store the token in Redux or local component state for future authenticated requests
    })
    .catch(error => {
      // Handle error response
      console.error('SignUp failed:', error);
      // You can display an error message to the user here
    });

    Alert.alert('Check Verification Email');
    navigation.navigate('Login');

    console.log('Signup Mail Sent!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="NAME"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        onChangeText={setEmail}
        value={email}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="PHONE"
        keyboardType='phone-pad'
        onChangeText={setPhone}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="PIN CODE"
        keyboardType='numeric'
        onChangeText={setPin}
        value={pinCode}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="PASSWORD"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="CONFIRM PASSWORD"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.button}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
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
    color: '#000',
    fontSize: 16,
  },
});
