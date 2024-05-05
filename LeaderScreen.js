import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommunityScreen from './screens/CommunityScreen';
import MemberRequestScreen from './screens/MemberRequestScreen';
import ReportsScreen from './screens/ReportsScreen';
const Tab = createMaterialBottomTabNavigator();

export default function LeaderScreen() {

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#010901"
        barStyle={{ backgroundColor: '#3e6f99' }}
        screenOptions={{ headerShown: false }} // Remove headers from all screens
      >
        <Tab.Screen
          name="Home"
          component={CommunityScreen}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={MemberRequestScreen}
          options={{
            tabBarLabel: 'Requests',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pencil" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            tabBarLabel: 'Reports',
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
