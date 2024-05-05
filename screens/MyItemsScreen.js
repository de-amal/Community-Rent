import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import React from 'react';
import RentOutScreen from './RentOutScreen';
import MyRequestsScreen from './MyRequestsScreen';
import RentInScreen from './RentInScreen';

const Tab = createMaterialTopTabNavigator();

export default function MyItemsScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#216b39',
        inactiveTintColor: '#555',
        labelStyle: { fontSize: 16 },
        style: styles.tabBar,
      }}
    >
      <Tab.Screen name="Rent Out" component={RentOutScreen} />
      <Tab.Screen name="My Requests" component={MyRequestsScreen} />
      <Tab.Screen name="Rent In" component={RentInScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff', // Background color of the tab bar
  },
});
