import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function MyProfileCard({image, title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainView}>
      <View style={styles.view}>
        <Image style={styles.img} source={image} />
        <Text style={styles.txt}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginRight: 8,
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  view: {
    alignItems: 'center',
    alignContent: 'center',
  },
  img: {width: 50, height: 50, margin: 5, resizeMode: 'stretch'},
  txt: {fontFamily: 'Poppins-Medium', fontSize: 12.5},
});
