import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import RentScreen from './RentScreen';
import RequestScreen from './RequestScreen';
import { View, BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Confirm',
          'Are you sure you want to leave this screen?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back behavior
      };

      // Add event listener for the hardware back button
      BackHandler.addEventListener('hardwareBackPress', backAction);

      // Clean up the event listener when the component unmounts
      return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Rent" component={RentScreen} />
      <Tab.Screen name="Request" component={RequestScreen} />
    </Tab.Navigator>
  );
}
