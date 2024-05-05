import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity,Alert } from 'react-native';
import { useNavigation,CommonActions} from '@react-navigation/native';
import axios from 'axios';
import config from './config';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handlePasswordReset=async () => {
    try {
      const response = await axios.post(`${config.SERVER_ENDPOINT}user/forgot-password`, {
        email: email
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password reset email sent. Please check your email.');
      } else {
        Alert.alert('Error', 'Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity
        onPress={handlePasswordReset}
        style={styles.button}
      >
        <Text style={styles.buttonText}>sent mail</Text>
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
  button: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20,
    borderRadius:10,
    height:30,
    width:90,
    backgroundColor:'#B5C18E' // You can change the button color here
  },
  buttonText: {
    color: '#000000', // Example text color
    fontSize: 16, // Example font size
  },
});
