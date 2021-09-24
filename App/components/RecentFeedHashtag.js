import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import colors from '../config/colors';

export default function RecentFeedHashtag({item}) {
  return (
    <FlatList
      style={styles.flatListView}
      data={item}
      horizontal
      renderItem={({item, index}) => (
        <Text style={styles.flatListTxt}>#{item}</Text>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  flatListView: {alignSelf: 'flex-start'},
  flatListTxt: {
    color: colors.pink_button_gradient,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',

    marginTop: 5,
    marginRight: 3,
  },
});
