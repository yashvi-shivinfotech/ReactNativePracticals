import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loaderStyle: {
    color: '#111',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  emptySearchData: {
    color: '#111',
    marginTop: '20%',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  curveMatch: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'stretch',
    overflow: 'hidden',
  },
});
