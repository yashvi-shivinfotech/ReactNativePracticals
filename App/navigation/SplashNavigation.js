import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import RegisterAccountScreen from '../screens/RegisterAccountScreen';

import DashboardSearch from '../screens/DashboardSearch';

const Stack = createStackNavigator();
const SplashNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="DashboardSearch"
      component={DashboardSearch}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false, animationEnabled: false}}
    />

    <Stack.Screen
      name="RegisterAccountScreen"
      component={RegisterAccountScreen}
      options={{headerShown: false, animationEnabled: false}}
    />
  </Stack.Navigator>
);

export default SplashNavigator;
