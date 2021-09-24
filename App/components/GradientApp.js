import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../config/colors';

class GradientApp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBack}
          source={{
            uri:
              'https://i.insider.com/5b08191c1ae66259008b46d3?width=1100&format=jpeg&auto=webp',
          }}>
          <LinearGradient
            colors={[
              'transparent',
              'transparent',
              colors.pink_gradient,
              colors.orange_gradient,
            ]}
            style={styles.linearGradient}
          />
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imgBack: {width: '100%', height: '100%'},
});
export default GradientApp;
