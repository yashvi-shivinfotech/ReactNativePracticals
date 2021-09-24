import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';

export default function EditHobby({submitHandler}) {
  const [text, setText] = useState('');
  const changeHandler = (val) => {
    setText(val);
  };

  const anotherFunc = (val) => {
    setText('');
  };

  const DATA = [
    {hobby_name: 'Photography'},
    {hobby_name: 'Writing'},
    {hobby_name: 'Knitting'},
    {hobby_name: 'Gardening'},
    {hobby_name: 'Hiking'},
    {hobby_name: 'Cooking'},
    {hobby_name: 'Drawing'},
    {hobby_name: 'Crochet'},
    {hobby_name: 'Handicraft'},
    {hobby_name: 'Shopping'},
    {hobby_name: 'Dance'},
    {hobby_name: 'Learning'},
    {hobby_name: 'Sewing'},
    {hobby_name: 'Painting'},
    {hobby_name: 'Cricket'},
    {hobby_name: 'Basketball'},
    {hobby_name: 'FootBall'},
    {hobby_name: 'Music'},
    {hobby_name: 'Sports'},
    {hobby_name: 'Yoga'},
    {hobby_name: 'Planting'},
    {hobby_name: 'DIY'},
    {hobby_name: 'Volleyball'},
    {hobby_name: 'Blogging'},
    {hobby_name: 'Acting'},
    {hobby_name: 'Art'},
    {hobby_name: 'Bowling'},
    {hobby_name: 'Party'},
    {hobby_name: 'Poker'},
    {hobby_name: 'Games'},
    {hobby_name: 'Playing Games'},
    {hobby_name: 'Cards'},
    {hobby_name: 'Organizing'},
    {hobby_name: 'Driving'},
    {hobby_name: 'Designing'},
    {hobby_name: 'Fashion'},
  ];

  return (
    <View style={styles.greyBox}>
      <Autocomplete
        textInputStyle={styles.autoComplete}
        placeholderColor={'black'}
        data={DATA}
        displayKey="hobby_name"
        onSelect={(value) => {
          changeHandler(value.hobby_name);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          submitHandler(text), anotherFunc(text);
        }}>
        <Text style={styles.addTxt}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  autoComplete: {
    backgroundColor: colors.white,
    borderRadius: 25,
    width: '90%',
    fontSize: 12,
    paddingLeft: 5,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    alignContent: 'center',
    paddingRight: 10,
    padding: 0,
  },
  addTxt: {
    fontSize: 12,
    alignSelf: 'center',
    color: colors.pink_gradient,
    fontFamily: 'Poppins-Medium',
    marginRight: 5,
  },
  greyBox: {
    backgroundColor: colors.white,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    fontSize: 12,
    paddingLeft: 5,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
    alignContent: 'center',
  },
});
