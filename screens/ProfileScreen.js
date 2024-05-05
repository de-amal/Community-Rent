import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainProfileScreen from './MainProfileScreen';
import MyItemsScreen from './MyItemsScreen';
import BookedItemsScreen from './BookedItemsScreen';
import UpdateProfileScreen from './UpdateProfileScreen';
const Stack = createStackNavigator();

export default function ProfileScreen() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="MainProfile" component={MainProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyItems" component={MyItemsScreen} />
        <Stack.Screen name="BookedItems" component={BookedItemsScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      </Stack.Navigator>

  );
}
