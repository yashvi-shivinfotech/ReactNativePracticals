/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import SplashNavigator from './App/navigation/SplashNavigation';

export function App() {
  return (
    <NavigationContainer>
      <SplashNavigator />
    </NavigationContainer>
  );
}

export default App;
