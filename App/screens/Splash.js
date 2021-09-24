import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  AsyncStorage,
  AppState,
  Platform,
  StatusBar,
} from 'react-native';
import colors from '../config/colors';
import {firebase} from '@react-native-firebase/iid';
import RNFirebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Axios from 'axios';

async function getInstanceId() {
  const id = await firebase.iid().getToken();
  console.log('FCM ID========> ', id);
  return id;
}

const checkPermission = async () => {
  const enabled = await RNFirebase.messaging()
    .isRegisteredForRemoteNotifications;
  if (enabled) {
    await firebase.messaging().registerForRemoteNotifications();
    getFcmToken();
  } else {
    requestPermission();
  }
};

const getFcmToken = async () => {
  const fcmToken = await firebase.iid().getToken();
  if (fcmToken) {
    console.log('TOKEN=====>', fcmToken);
    firebase
      .messaging()
      .subscribeToTopic('djx')
      .then((response) => console.log('Successfully subscribed to topic:'))
      .catch((error) => console.log('unsuccessfully ', error));
  } else {
  }
};

const requestPermission = async () => {
  try {
    await RNFirebase.messaging().requestPermission();
  } catch (error) {
    // User has rejected permissions
  }
};

let messageListener = async () => {
  messageListener = RNFirebase.messaging().onMessage((message) => {});
};
class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: '',
      userId: 0,
      email: '',
      password: '',
      appState: AppState.currentState,
      logged_in: 0,
    };
    setTimeout(() => {
      this._loadData();
    }, 5000);
  }

  _loadData = async () => {
    const userId = await AsyncStorage.getItem('userId');

    if (userId == null) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('DashboardSearch', {listing: userId});
    }
  };
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({appState: nextAppState});

    if (nextAppState === 'background') {
      // Do something here on app background.
      console.log('App is in Background Mode.');
      this.logged_out();
    }

    if (nextAppState === 'active') {
      // Do something here on app active foreground mode.
      console.log('App is in Active Foreground Mode.');
      console.log('Call Api here....');
      this.logged_in();
    }

    if (nextAppState === 'inactive') {
      // Do something here on app inactive mode.
      console.log('App is in inactive Mode.');
    }
  };

  async componentDidMount() {
    Promise.all([
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('isLoggedin'),
      AsyncStorage.getItem('email'),
      AsyncStorage.getItem('password'),
    ]).then(([userId, isLoggedin, email, password]) => {
      this.setState({userId, isLoggedin, email, password});
      console.log(
        'Splash',
        this.state.userId,
        this.state.isLoggedin,
        this.state.email,
        this.state.password,
      );
      AppState.addEventListener('change', this._handleAppStateChange);
    });

    let _this = this;
    PushNotification.configure({
      onRegister: function (tok) {
        //process token
        console.log('TOKEN', JSON.stringify(tok));
      },

      senderId: '414013504852',

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
    //configure();
    await checkPermission();
    await messageListener();
    if (Platform.OS === 'ios') {
      getInstanceId().then((id) => {
        console.log('ID => ', id);
        this.setState(
          {
            ...this.state,
            auth: {...this.state.auth, fcm_id: id},
          },
          () => {},
        );
      });
    } else {
      getInstanceId().then((id) => {
        console.log('ID => ', id);
        console.log('STORE => ', id);
        this.setState(
          {
            ...this.state,
            auth: {...this.state.auth, fcm_id: id},
          },
          () => {},
        );
      });
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <ImageBackground
            style={styles.imgBack}
            source={require('../assets/splashNew.jpg')}>
            {/* <LinearGradient
            colors={[
              'transparent',
              'transparent',
              'rgba(246,8,83,0.5)',
              'rgba(246,8,83,0.8)',
              'rgba(246,8,83,0.9)',
            ]}
            style={styles.linearGradient}>
            <View style={styles.datingView}>
              <Text style={styles.dating_txt}>D a t i n g </Text>
              <Text style={styles.dating_txt}> </Text>

              <Text style={styles.dating_txt}> A p p </Text>
            </View>
          </LinearGradient> */}
          </ImageBackground>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  datingView: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    marginBottom: 50,
  },
  imgBack: {width: '100%', height: '100%'},
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  dating_txt: {
    fontSize: 26,
    color: colors.white,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Splash;
