import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import dburls from '../dburl/dburls';

import Autocomplete from 'react-native-autocomplete-input';

const EditCountryList = ({submitHandler, value}) => {
  const [countryData, setCountryData] = useState([]);

  const [films, setFilms] = useState([]);

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

  const [text, setText] = useState('');
  const changeHandler = (val) => {
    setText(val);
  };

  useEffect(() => {
    fetch(`${dburls.geturl}/getCountryNames`)
      .then((res) => res.json())
      .then((json) => {
        const {result: countryData} = json;

        var myObj = JSON.parse(countryData);
        setCountryData(myObj.message);
        setFilms(myObj.message);
      })
      .catch((e) => {
      });
  }, [films]);

  const findFilm = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredFilms(
        films.filter((film) => film.country_name.search(regex) >= 0),
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
          value != null
            ? value
            : JSON.stringify(selectedValue) === '{}'
            ? ''
            : selectedValue.hobby_name
        }
        onChangeText={(text) => findFilm(text)}
        placeholder="Enter Country"
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedValue(item);
              setFilteredFilms([]);
              changeHandler(item.country_name);
              submitHandler(item.country_name);
            }}>
            <Text style={styles.itemText}>{item.country_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  autocompleteContainer: {
    backgroundColor: colors.white,
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
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  greyBox: {
    width: '100%',
    fontSize: 12,
    paddingLeft: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
    alignContent: 'center',
    padding: 3,
  },
});
export default EditCountryList;
