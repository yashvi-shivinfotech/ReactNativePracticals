import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function CurveImage() {
  return (
    <Image style={styles.curveImg} source={require('../assets/curve.png')} />
  );
}

const styles = StyleSheet.create({
  curveImg: {
    width: '100%',
    height: 55,
    resizeMode: 'stretch',
    marginBottom: 0,
  },
});
