import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../config/colors';

export default function SideMenuTxt({title, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.mainView}>
        <View style={styles.secondView}>
          <Text style={styles.viewTxt}>{title}</Text>
          <Image
            style={styles.styleImg}
            source={require('../assets/right.png')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainView: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
    alignSelf: 'flex-start',
  },
  secondView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  viewTxt: {
    color: colors.white,
    width: '94%',
    fontFamily: 'Poppins-Medium',
  },
  styleImg: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    alignSelf: 'center',
  },
});
