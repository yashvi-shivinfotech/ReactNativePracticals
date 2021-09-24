import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

export default function AuthButton({
  onPressed,
  buttonTxt,
  gradientStyle,
  touchableStyle,
}) {
  return (
    <TouchableOpacity style={touchableStyle} onPress={onPressed}>
      <LinearGradient
        colors={[
          colors.yellow_button_gradient,
          colors.s_button_color,
          colors.pink_button_gradient,
        ]}
        style={[styles.loginBox, {gradientStyle}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={styles.logInTxt}>{buttonTxt}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    padding: 9,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 12,
    fontFamily: 'Poppins-Light',
  },
  logInTxt: {
    color: colors.white,
    textAlign: 'center',
    padding: 3,
    fontFamily: 'Poppins-SemiBold',
  },
});
