import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import colors from '../config/colors';
import LinearGradientAuth from '../components/LinearGradientAuth';
import AuthButton from '../components/AuthButton';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email should be in correct format.')
    .required('Email is required'),
  password: Yup.string().required().label('Password'),
});
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      data: '',
      actionResponse: '',
      sendResponse: '',
      last_message_id: '',
      user_Id: '',
      userInfo: '',
      error: '',
      fbEmail: '',
      fbName: '',
      dataFB: '',
      ActionFb: '',
      responseFB: '',
      userIdRegister: '',
      dataUser: '',
      userMessage: '',
      active_status: 0,
    };
  }
  saveLoginDetail = async (values) => {
    try {
      const jsonValueUserId = JSON.stringify('1');

      await AsyncStorage.setItem('userId', jsonValueUserId);

      await AsyncStorage.setItem('isLoggedin', '1');
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    Promise.all([AsyncStorage.getItem('userIdRegister')]).then(
      ([userIdRegister]) => {
        this.setState({userIdRegister});
      },
    );
  }

  setEmailPassword = async (values) => {
    try {
      const jsonValueEmail = JSON.stringify(values.email);
      const jsonValuePass = JSON.stringify(values.password);

      await AsyncStorage.setItem('email', jsonValueEmail);
      await AsyncStorage.setItem('password', jsonValuePass);
      console.log(jsonValueEmail, jsonValuePass);
    } catch (e) {
      // saving error
    }
  };

  signIn = async (values) => {
    this.notifyMessage('You are login successfully.');
    this.saveLoginDetail(values);
    this.setEmailPassword(values);
    this.props.navigation.navigate('DashboardSearch', {
      userIdd: '1',
      listing: undefined,
    });
  };

  notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexStyle}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              this.signIn(values);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <ScrollView style={{width: Dimensions.get('window').width}}>
                  <View style={styles.mainView}>
                    <LinearGradientAuth>
                      <View style={styles.flexStyle}>
                        <Text style={styles.dating_txt}>L O G I N </Text>
                        <View>
                          <View style={styles.whiteBox}>
                            <TextInput
                              keyboardType={'email-address'}
                              style={styles.textInput}
                              placeholder={'Email'}
                              placeholderTextColor={colors.light_black}
                              onBlur={() => setFieldTouched('email')}
                              onChangeText={handleChange('email')}
                            />
                            {!touched.email || !errors.email ? null : (
                              <View style={styles.errorView}>
                                <Text style={{color: colors.white}}>!</Text>
                              </View>
                            )}
                          </View>
                          {!touched.email || !errors.email ? null : (
                            <View style={styles.errorMsgView}>
                              <Text style={styles.error}>
                                Email is required
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
                            <View style={styles.errorMsgView}>
                              <Text style={styles.error}>
                                Password is required
                              </Text>
                            </View>
                          )}
                        </View>

                        <AuthButton
                          buttonTxt={'LOGIN'}
                          onPressed={handleSubmit}
                        />

                        {/* connect with */}

                        {/* Register */}
                        <View style={styles.registerView}>
                          <Text style={styles.note1}>
                            Don't have an account?
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              this.state.userIdRegister == null
                                ? this.props.navigation.navigate(
                                    'RegisterAccountScreen',
                                  )
                                : this.props.navigation.navigate(
                                    'RegistrationStep1',
                                  );
                            }}
                            // onPress={() => {
                            //   this.props.navigation.navigate(
                            //     'RegistrationStep1',
                            //   );
                            // }}
                          >
                            <Text style={styles.registerTxt}>Register</Text>
                          </TouchableOpacity>
                        </View>

                        {/* text */}
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
  cookiesPolicy: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  privacyPolicy: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  terms: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  note2: {
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
    color: colors.white,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  registerTxt: {
    fontSize: 14.5,
    color: colors.yellow_button_gradient,
    fontFamily: 'Poppins-SemiBold',
  },
  note1: {
    color: colors.white,
    textAlign: 'center',
    margin: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  registerView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  socialMediaTxt: {
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    marginTop: 2,
    fontSize: 13,
    paddingRight: 2,
  },
  socialMediaImg: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  socialMediaView: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  emptyView: {
    alignSelf: 'center',
    height: 1,
    backgroundColor: colors.white,
    width: '100%',
    flex: 1,
    marginLeft: 3,
    marginRight: 25,
  },
  connectTxt: {
    color: colors.white,
    flex: 2,
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
  },
  connectView: {
    alignSelf: 'center',
    height: 1,
    backgroundColor: colors.white,
    width: '100%',
    flex: 1,
    marginLeft: 25,
    marginRight: 3,
  },
  viewAlign: {flexDirection: 'row'},

  errorMsgView: {
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
  },
  topView: {flexDirection: 'row', alignSelf: 'center'},
  mainView: {
    paddingTop: 200,
    width: Dimensions.get('window').width,
  },
  imgBackground: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height,
    flex: 1,
  },
  flexStyle: {flex: 1},

  dating_txt: {
    fontSize: 26,
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },

  whiteBox: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: colors.white,
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 13,
    fontFamily: 'Poppins-Light',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  fp: {
    color: colors.white,
    alignSelf: 'center',
    margin: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  whiteFacebook: {
    padding: 11,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
    borderRadius: 25,
    marginRight: 5,
    marginTop: 12,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    alignSelf: 'flex-end',
    padding: 5,
    marginBottom: 5,
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
});
