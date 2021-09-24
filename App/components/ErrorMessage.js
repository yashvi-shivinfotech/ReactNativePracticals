import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Errormessage({error, visible}) {
  if (!visible || !error) {
    return null;
  }
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 25,
  },
});
