import { StyleSheet, Text, View, BackHandler, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import config from '../config';

export default function CommunityScreen({ navigation }) {
  const [members, setMembers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.isFocused()) {
          // If the current screen is CommunityScreen, show the confirmation alert
          Alert.alert(
            'Confirm',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              { text: 'Yes', onPress: () => handleLogout() },
            ],
            { cancelable: false }
          );
          return true; // Prevent default back behavior
        }
      };

      // Add event listener for the hardware back button
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Clean up the event listener when the component unmounts
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  useEffect(() => {
    axios.get(`${config.SERVER_ENDPOINT}leader/members`)
      .then(response => {
        console.log("Leader members:", response.data); // Log the response data
        setMembers(response.data.users);
      })
      .catch(error => {
        console.error("Error fetching leader members:", error); // Log any errors
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${config.SERVER_ENDPOINT}user/logout`).then(response => {
        const Res = response.data;
        console.log(Res);
      });
      //await dispatch(logout());
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

  return (
    <View style={styles.container}>
      <Text>Community members</Text>
      <ScrollView style={styles.scrollView}>
        {members.map(member => (
          <View key={member.name} style={styles.card}>
            <Text style={styles.cardText}>Name: {member.name}</Text>
            <Text style={styles.cardText}>Phone: {member.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
