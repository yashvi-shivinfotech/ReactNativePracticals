import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import colors from '../config/colors';
import Autocomplete from 'react-native-autocomplete-input';

const AddHobbyEdit = ({submitHandler, navigationn}) => {
  // For Main Data
  const [films, setFilms] = useState([
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
  ]);

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

  const [text, setText] = useState('');
  const changeHandler = (val) => {
    console.log('selected item change handler->', val);
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
  ];

  const findFilm = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredFilms(
        films.filter((film) => film.hobby_name.search(regex) >= 0),
      );
    } else {
      setFilteredFilms([]);
    }
  };

  return (
    <View style={styles.greyBox}>
      <Autocomplete
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.inputContainer}
        data={filteredFilms}
        defaultValue={
          JSON.stringify(selectedValue) === '{}' ? '' : selectedValue.hobby_name
        }
        onChangeText={(text) => findFilm(text)}
        placeholder="Enter the hobby"
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedValue(item);
              setFilteredFilms([]);
              changeHandler(item.hobby_name);
            }}>
            <Text style={styles.itemText}>{item.hobby_name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addHobbyView}
        onPress={() => {
          submitHandler(text);
          anotherFunc(text);
        }}>
        <Text style={styles.addHobby}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.infoView}
        onPress={() => navigationn.navigate('ShowHobby')}>
        <Image
          style={styles.infoImage}
          source={require('../assets/info.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  addHobbyView: {
    fontSize: 12,
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    right: 25,
  },
  addHobby: {
    fontSize: 12,
    alignSelf: 'center',
    color: colors.pink_gradient,
    fontFamily: 'Poppins-Medium',
    marginRight: 5,
  },
  infoView: {
    fontSize: 12,
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    right: 0,
  },
  infoImage: {
    marginRight: 5,
    height: 18,
    width: 18,
    tintColor: colors.pink_gradient,
    alignSelf: 'center',
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 25,
    elevation: 0,
    overflow: 'hidden',

    borderColor: colors.white,
  },
  inputContainer: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    elevation: 0,
    paddingLeft: 3,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  greyBox: {
    // backgroundColor: '#fff',
    // borderRadius: 25,
    marginTop: 10,
    width: '90%',
    // padding: 12,
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1,
  },
});
export default AddHobbyEdit;
