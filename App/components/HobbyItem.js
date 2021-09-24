import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

export default function HobbyItem({item}) {
  return (
    <FlatList
      style={styles.FlatListView}
      keyExtractor={(item, index) => item.id}
      data={item}
      renderItem={({item, index}) => (
        <TouchableOpacity>
          <View style={styles.mainView}>
            <Text style={styles.txt}>{item + ' ' + '     ' + 'X'}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  txt: {
    color: colors.white,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: colors.white,
    borderWidth: 1,
    paddingRight: 15,
    paddingLeft: 10,
  },
  FlatListView: {flexDirection: 'row', flex: 1},
  mainView: {flexDirection: 'row', flex: 1, margin: 5},
});
