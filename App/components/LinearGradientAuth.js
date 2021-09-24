import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

export default function LinearGradientAuth({children}) {
  return (
    <LinearGradient
      colors={[
        'transparent',
        colors.gradientAuth1,
        colors.gradientAuth2,
        colors.gradientAuth3,
        colors.gradientAuth4,
      ]}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
});
