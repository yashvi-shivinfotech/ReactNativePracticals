import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

export default function BackImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainView}>
      <View>
        <LinearGradient
          colors={[
            colors.backButtonGradient,
            colors.backButtonGradient,
            colors.backButtonGradient1,
            colors.backButtonGradient1,
          ]}
          style={styles.CircleShapeView}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Image style={styles.img} source={require('../assets/aero.png')} />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
    position: 'absolute',

    marginLeft: 20,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    marginBottom: 10,
    marginRight: 20,
  },
  CircleShapeView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  img: {
    height: 38,
    width: 38,
    tintColor: colors.white,
  },
});
