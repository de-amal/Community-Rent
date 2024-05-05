import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';

const Tab = createMaterialBottomTabNavigator();

export default function MainPage() {

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#043404"
        barStyle={{ backgroundColor: '#7c993e' }}
        screenOptions={{ headerShown: false }} // Remove headers from all screens
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pencil" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
