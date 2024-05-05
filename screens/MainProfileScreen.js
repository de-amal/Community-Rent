import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, BackHandler, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logout } from '../actions/authActions';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import config from '../config';

const ProfileScreen = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`${config.SERVER_ENDPOINT}user/profile`);
      const profileData = response.data;
      console.log('Profile details:', profileData);
      setProfileData(profileData.user);
    } catch (error) {
      console.error('Error fetching profile details:', error);
      Alert.alert('Error', 'An error occurred while fetching profile details');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileDetails();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await axios.get(`${config.SERVER_ENDPOINT}user/logout`).then(response => {
        const Res = response.data;
        console.log(Res);
      });
      await dispatch(logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  const handleMyItemsPress = () => {

    navigation.navigate('MyItems');
  };

  const handleBookedItemsPress = () => {
    navigation.navigate('BookedItems');
  };

  const handleUpdateProfilePress = () => {

    navigation.navigate('UpdateProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {profileData && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profileData.profilePictureUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>Name: {profileData.name}</Text>
          <Text style={styles.profileText}>Email: {profileData.email}</Text>
          <Text style={styles.profileText}>Phone: {profileData.phone}</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleMyItemsPress} style={styles.button}>
        <Text style={styles.buttonText}>My Items</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBookedItemsPress} style={styles.button}>
        <Text style={styles.buttonText}>Booked Items</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdateProfilePress} style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  profileText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#216b39',
    width: 300,
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
