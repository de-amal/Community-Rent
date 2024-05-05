import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainPage from './MainPage';
import SignupPage from './SignupPage';
import LeaderScreen from './LeaderScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
const Stack = createStackNavigator();
const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} 
         options={{
          headerShown: false
        }}
        />
        <Stack.Screen name="MainPage" component={MainPage}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="SignupPage" component={SignupPage}
        />
        <Stack.Screen name="TEST" component={LeaderScreen}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
