import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import config from '../config';

export default function UpdateProfileScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePhotoUpdate = async () => {
    // Check if image is selected
    if (!image) {
      Alert.alert('Error', 'Please select an image to update.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('profilePicture', {
        uri: image,
        name: 'profile_image.jpg', // Use 'name' instead of 'profilePicture'
        type: 'image/jpeg',
      });
    
      const response = await axios.put(`${config.SERVER_ENDPOINT}user/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      console.log('Profile picture updated successfully:', response.data.profilePictureUrl);
      setImage(null); // Clear the image state after successful upload
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error', 'An error occurred while updating the profile picture.');
    }
    
  };

  const handleProfileUpdate = async () => {
    try {
      // Validate name and phone number
      if (!name || !phoneNumber) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }
      // Validate name (no spaces)
      if (name.includes(' ')) {
        Alert.alert('Error', 'Name cannot contain spaces.');
        return;
      }
      // Validate phone number (exactly 10 digits)
      if (!/^\d{10}$/.test(phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
        return;
      }
    
      // Make PUT request to update profile
      const response = await axios.put(`${config.SERVER_ENDPOINT}user/update-details`, {
        name: name,
        phone: phoneNumber
      });
    
      // Handle successful response
      console.log('Profile updated successfully:', response.data);
      Alert.alert('Success', 'Profile updated successfully.');
    
      // Clear input fields
      setName('');
      setPhoneNumber('');
    } catch (error) {
      // Handle error
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={handlePhotoUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleProfileUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Name and Phone Number</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
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
    backgroundColor: '#216b39',
    width: 300,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
