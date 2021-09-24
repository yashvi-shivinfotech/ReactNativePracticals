import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import colors from '../config/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LinearGradientAuth from '../components/LinearGradientAuth';
import AuthButton from '../components/AuthButton';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Fullname is required.'),
  email: Yup.string()
    .email('Email should be in correct format.')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number should be 10 digit.')
    .max(10, 'Phone number should be 10 digit.'),

  age: Yup.string().required('Age is required'),

  password: Yup.string().required('Password is required'),
  confirmPass: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Password and confirm password should be same.',
    )
    .required('Confirm Password is required'),
});

export default class RegisterAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  registerAccount = async (values) => {
    const jsonEmail = JSON.stringify(values.email);
    await AsyncStorage.setItem('email', jsonEmail);
    const jsonFullName = JSON.stringify(values.firstName);
    await AsyncStorage.setItem('firstName', jsonFullName);
    const jsonPhone = JSON.stringify(values.phoneNumber);
    await AsyncStorage.setItem('phoneNumber', jsonPhone);
    const jsonPassword = JSON.stringify(values.password);
    await AsyncStorage.setItem('password', jsonPassword);
    const jsonAge = JSON.stringify(values.age);
    await AsyncStorage.setItem('age', jsonAge);
    this.props.navigation.navigate('Login');
  };
  textChangeHandler = async (key, val) => {
    await this.setState({[key]: val});
  };

  notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexView}>
          <Formik
            initialValues={{
              firstName: '',
              email: '',
              password: '',
              confirmPass: '',
              age: '',
              phoneNumber: '',
            }}
            onSubmit={(values) => {
              this.registerAccount(values);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              isValid,
            }) => (
              <>
                <ScrollView
                  style={{width: Dimensions.get('window').width}}
                  keyboardShouldPersistTaps={'handled'}>
                  <View style={styles.backView}>
                    <LinearGradientAuth>
                      <View style={styles.flexView}>
                        <View style={styles.flexAlign}>
                          <Text style={styles.dating_txt}>
                            R e g i s t e r{' '}
                          </Text>
                          <Text style={styles.dating_txt}> </Text>

                          <Text style={styles.dating_txt}> A c c o u n t </Text>
                        </View>
                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Full Name'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('firstName')}
                              onChangeText={handleChange('firstName')}
                            />
                            {!touched.firstName || !errors.firstName ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.firstName || !errors.firstName ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>
                                {errors.firstName}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Email'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('email')}
                              onChangeText={handleChange('email')}
                              autoCapitalize="none"
                            />
                            {!touched.email || !errors.email ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.email || !errors.email ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>{errors.email}</Text>
                            </View>
                          )}
                        </View>

                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Phone Number'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('phoneNumber')}
                              onChangeText={handleChange('phoneNumber')}
                              autoCapitalize="none"
                            />
                            {!touched.phoneNumber ||
                            !errors.phoneNumber ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.phoneNumber ||
                          !errors.phoneNumber ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>
                                {errors.phoneNumber}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Password'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('password')}
                              onChangeText={handleChange('password')}
                              secureTextEntry={true}
                            />
                            {!touched.password || !errors.password ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.password || !errors.password ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>
                                {errors.password}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Confirm Password'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('confirmPass')}
                              onChangeText={handleChange('confirmPass')}
                              secureTextEntry={true}
                            />
                            {!touched.confirmPass ||
                            !errors.confirmPass ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.confirmPass ||
                          !errors.confirmPass ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>
                                {errors.confirmPass}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              style={styles.textInput}
                              placeholder={'Age'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('age')}
                              onChangeText={handleChange('age')}
                            />
                            {!touched.age || !errors.age ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.age || !errors.age ? null : (
                            <View style={styles.errorView1}>
                              <Text style={styles.error}>{errors.age}</Text>
                            </View>
                          )}
                        </View>

                        <AuthButton
                          buttonTxt={'REGISTER'}
                          onPressed={handleSubmit}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Login');
                          }}>
                          <Text style={styles.fp}>
                            Already have an account ?{' '}
                            <Text style={styles.lp}>Login</Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradientAuth>
                  </View>
                </ScrollView>
              </>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  registerTxt: {
    color: '#fff',
    textAlign: 'center',
    padding: 3,
    fontFamily: 'Poppins-SemiBold',
  },
  addressImg: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  errorView1: {
    position: 'absolute',
    right: 30,
    marginTop: 50,
  },
  errorView: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 0,
    flex: 1,
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  flexAlign: {flexDirection: 'row', alignSelf: 'center'},
  backView: {
    marginTop: 180,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  imageBackground: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height,
    flex: 1,
  },
  flexView: {flex: 1},

  dating_txt: {
    fontSize: 26,
    color: '#111',
    alignSelf: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },

  whiteBox: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 14,
    fontFamily: 'Poppins-Light',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  loginBox: {
    padding: 9,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    fontFamily: 'Poppins-Light',
  },
  fp: {
    color: '#fff',
    alignSelf: 'center',
    margin: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',

    // fontWeight: 'bold',
  },
  lp: {
    color: '#FFFF00',
    alignSelf: 'center',
    margin: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',

    // fontWeight: 'bold',
  },
  whitefacebook: {
    padding: 12,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginRight: 5,
    marginTop: 12,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  error: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    alignSelf: 'flex-end',
    padding: 5,
    marginBottom: 10,
    marginRight: 25,
    backgroundColor: colors.black,
    color: colors.white,
    borderTopColor: 'red',
    borderTopWidth: 2,
    textAlign: 'right',
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 0,
  },
  greyBoxAddress: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '84%',
    marginTop: 15,
    paddingLeft: 20,
    fontFamily: 'Poppins-Medium',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    alignSelf: 'center',
  },
});
