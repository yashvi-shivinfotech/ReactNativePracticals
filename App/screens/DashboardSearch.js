import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Pressable,
  FlatList,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import colors from '../config/colors';
import CurveImage from '../components/CurveImage';
import AuthButton from '../components/AuthButton';

export default class DashboardSearch extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      isLoggedin: '',
      email: '',
      firstName: '',
      phoneNumber: '',
      password: '',
      age: '',
      DATA: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          price: '200',
          category: 'Clothing',
        },
      ],
      addClick: false,
      pName: '',
      pPrice: '',
      category: [
        {
          itemName: 'Select Category',
        },
        {
          itemName: 'Clothing',
        },
        {
          itemName: 'Accessories',
        },
        {
          itemName: 'Foot Wear',
        },
        {
          itemName: 'Gadgets',
        },
        {
          itemName: 'Electronic Items',
        },
      ],
      selectedCat: '',
      editClick: false,
      selectedEditId: '',
      selectedEditName: '',
      selectedEditPrice: '',
    };
  }

  componentDidMount() {
    Promise.all([
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('isLoggedin'),
      AsyncStorage.getItem('email'),
      AsyncStorage.getItem('firstName'),
      AsyncStorage.getItem('phoneNumber'),
      AsyncStorage.getItem('password'),
      AsyncStorage.getItem('age'),
    ]).then(
      ([userId, isLoggedin, email, firstName, phoneNumber, password, age]) => {
        this.setState({
          userId,
          isLoggedin,
          email,
          firstName,
          phoneNumber,
          password,
          age,
        });
        console.log(
          '--->',
          this.state.userId,
          this.state.email,
          this.state.firstName,
          this.state.phoneNumber,
          this.state.password,
          this.state.age,
        );
      },
    );
  }

  async onValueChangeCat(value) {
    this.setState({selectedCat: value});
  }

  componentWillReceiveProps() {
    Promise.all([
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('isLoggedin'),
    ]).then(([userId, isLoggedin]) => {
      this.setState({userId, isLoggedin});

      const {userIdd} = this.props.route.params;
      if (userIdd !== undefined) {
        this.setState({userId: userIdd});
      }
      const {listing} = this.props.route.params;
      if (listing !== undefined) {
        this.setState({selectedCountry_name: listing});
      }
      const {hobby} = this.props.route.params;
      if (hobby !== undefined) {
        if (this.state.selectedHobbies.length > 0) {
          var newArray = this.state.selectedHobbies.concat(hobby);
          const jsonObject = newArray.map(JSON.stringify);
          const uniqueSet = new Set(jsonObject);
          const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
          this.setState({selectedHobbies: uniqueArray});
        } else {
          this.setState({selectedHobbies: hobby});
        }
      }
    });
  }

  addProduct = () => {
    this.setState({addClick: false});
    var array = {
      id: '90',
      title: this.state.pName,
      price: this.state.pPrice,
      category: this.state.selectedCat,
    };
    var dataCompany = this.state.DATA;
    dataCompany.unshift(array);
    this.setState({DATA: dataCompany});
  };

  editProduct = (item) => {
    this.setState({editClick: true});
    this.setState({selectedEditId: item.id});
    this.setState({selectedEditName: item.title});
    this.setState({selectedEditPrice: item.price});
  };

  editSelectedProduct = () => {
    this.setState({editClick: false});
    let objIndex = this.state.DATA.findIndex(
      (obj) => obj.id == this.state.selectedEditId,
    );

    //Update object's name property.
    this.state.DATA[objIndex].title = this.state.selectedEditName;
    this.state.DATA[objIndex].price = this.state.selectedEditPrice;
    console.log('this.state.', this.state.DATA);
    this.setState({DATA: this.state.DATA});
  };

  _logout = async () => {
    await AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor={'#fe2e79'} />
        <ScrollView>
          <CurveImage />
          {/* Header Navigation and search view______________ */}
          <Pressable>
            <View style={styles.headerView}>
              {/* search ______________________________ */}
              <View style={styles.greyBox}>
                <Text style={styles.searchTxt}>Home</Text>
                <TouchableOpacity
                  onPress={() => {
                    this._logout();
                  }}>
                  <Text style={{marginTop: 20}}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>

          <View style={styles.viewMain}>
            <Text style={styles.txtMain}>Email:</Text>
            <Text style={styles.txtMain}>{this.state.email}</Text>
          </View>
          <View style={styles.viewMain}>
            <Text style={styles.txtMain}>Name:</Text>
            <Text style={styles.txtMain}>{this.state.firstName}</Text>
          </View>
          <View style={styles.viewMain}>
            <Text style={styles.txtMain}>Age:</Text>
            <Text style={styles.txtMain}>{this.state.age}</Text>
          </View>
          <View style={styles.viewMain}>
            <Text style={styles.txtMain}>Phone Number:</Text>
            <Text style={styles.txtMain}>{this.state.phoneNumber}</Text>
          </View>
          <Pressable>
            <View style={styles.headerView}>
              {/* search ______________________________ */}
              <View style={styles.greyBox}>
                <Text style={styles.searchTxt}>Products</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({addClick: true});
                  }}>
                  <Text style={{marginTop: 20}}>Add Products</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
          {this.state.addClick ? (
            <>
              <View style={styles.whiteBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Product Name'}
                  placeholderTextColor={colors.light_black}
                  onChangeText={(e) => this.setState({pName: e})}
                />
              </View>
              <View style={styles.whiteBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Product Price'}
                  placeholderTextColor={colors.light_black}
                  onChangeText={(e) => this.setState({pPrice: e})}
                />
              </View>
              <View style={styles.greyBox11}>
                <Picker
                  mode="dropdown"
                  style={styles.pickerStyle}
                  selectedValue={this.state.selectedCat}
                  onValueChange={this.onValueChangeCat.bind(this)}>
                  {this.state.category.map((item, index) => (
                    <Picker.Item
                      color="#111111"
                      label={item.itemName}
                      value={item.itemName}
                      index={index}
                    />
                  ))}
                </Picker>
              </View>
              <AuthButton
                buttonTxt={'Add Product'}
                onPressed={() => this.addProduct()}
              />
            </>
          ) : null}
          <FlatList
            data={this.state.DATA}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.listView}
                onPress={() => {
                  this.editProduct(item);
                }}>
                <View style={styles.card}>
                  <View style={styles.flexView}>
                    <Text style={styles.titleTxt}>{item.title}</Text>
                    <Text style={styles.desTxt}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />

          {this.state.editClick ? (
            <>
              <Pressable>
                <View style={styles.headerView}>
                  {/* search ______________________________ */}
                  <View style={styles.greyBox}>
                    <Text style={styles.searchTxt}>Edit Product</Text>
                  </View>
                </View>
              </Pressable>
              <View style={styles.whiteBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Product Name'}
                  placeholderTextColor={colors.light_black}
                  onChangeText={(e) => this.setState({selectedEditName: e})}>
                  {this.state.selectedEditName}
                </TextInput>
              </View>
              <View style={styles.whiteBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Product Price'}
                  placeholderTextColor={colors.light_black}
                  onChangeText={(e) => this.setState({selectedEditPrice: e})}>
                  {this.state.selectedEditPrice}
                </TextInput>
              </View>

              <AuthButton
                buttonTxt={'Edit Product'}
                onPressed={() => this.editSelectedProduct()}
              />
            </>
          ) : null}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    padding: 0,
    flex: 1,
    fontFamily: 'Poppins-Light',
  },
  greyBox11: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '85%',
    padding: 15,
    fontSize: 12,
    paddingLeft: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },

  whiteBox: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: colors.white,
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'Poppins-Light',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 5,
  },

  listView: {width: '95%', alignSelf: 'center'},
  flexView: {flex: 1},
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
  },
  activeTxt: {
    fontSize: 11,
    color: colors.pink_gradient,
    fontFamily: 'Poppins-Regular',
  },
  desTxt: {
    fontSize: 12,
    color: colors.light_black,
    fontFamily: 'Poppins-Regular',
  },
  titleTxt: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  viewMain: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  txtMain: {
    fontSize: 12,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  sideMenu: {
    shadowColor: '#111',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 10,
  },
  flexDirection: {flexDirection: 'row'},
  heightWidth: {height: 30, width: 30},
  scrView: {marginTop: 0, flex: 1},
  commonAlignStyle: {
    alignItems: 'center',
    alignContent: 'center',
  },
  loaderUnFav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starImg: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    tintColor: '#fff',
    marginTop: 6,
    resizeMode: 'stretch',
  },
  circleView: {
    alignItems: 'center',
    alignContent: 'center',
  },
  favView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favFlagView: {alignSelf: 'center'},
  locationTxt: {
    color: '#111',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    marginTop: 5,
  },
  mapImg: {
    width: 15,
    height: 15,
    tintColor: colors.pink_gradient,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    marginBottom: 15,
    marginTop: 40,
  },
  yearTxt: {
    fontSize: 12,
    color: colors.light_black,
    fontFamily: 'Poppins-Medium',
  },
  ageFlagTxt: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  ageFlagTxt1: {
    fontSize: 12,
    color: colors.light_black,
    fontFamily: 'Poppins-Medium',
  },
  searchSecondView: {flex: 1, marginLeft: 10},
  searchListView: {width: '80%', alignSelf: 'center', flex: 1},
  userImg: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
  },
  recentViewedTxt: {
    color: '#111',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  recentViewedView: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  hobbyXTxt: {
    color: colors.pink_gradient,
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
    marginLeft: 15,
  },
  hobbyListTxt: {
    color: colors.black,
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
  },
  searchButton: {
    color: '#fff',
    textAlign: 'center',
    padding: 3,
    fontFamily: 'Poppins-SemiBold',
  },
  hobbyView: {
    flexDirection: 'row',
    margin: 2,
    color: colors.white,
    padding: 5,
    borderRadius: 20,
    borderColor: colors.pink_gradient,
    borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
  },
  hobbyList: {marginBottom: 10, marginTop: 5, marginLeft: 17},
  selectedHobbyTxt: {
    padding: 0,
    flex: 1,
    fontFamily: 'Poppins-Light',
  },
  smokingView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  genderView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  moreFilterTxt: {
    color: '#111',
    textAlign: 'right',
    padding: 3,
    fontFamily: 'Poppins-Light',
    paddingRight: 25,
    textDecorationLine: 'underline',
  },
  moreFilterView: {height: 0, flexDirection: 'row'},
  unSelectedSlider: {
    backgroundColor: '#fe2e79',
    height: 5,
    borderColor: '#fe2e79',
  },
  selectedSlider: {
    backgroundColor: '#fe2e79',
    height: 5,
    borderColor: '#fe2e79',
  },
  sliderView: {
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
  },
  secondAgeTxt: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    marginLeft: 5,
    marginRight: 25,
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    right: 0,
  },
  dashTxt: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    right: 0,
  },
  firstAgeTxt: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 5,
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  selectTxt: {padding: 0, flex: 1, fontFamily: 'Poppins-Light'},
  downImg: {width: 30, height: 30},
  showAgeTxt: {
    alignSelf: 'flex-start',
    flex: 1,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  searchTxt: {
    color: '#111',
    marginTop: 15,
    fontSize: 18,
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  menuImg: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '93%',
    marginLeft: 15,
    marginRight: 15,
    alignSelf: 'center',
    height: 50,
  },
  curveImg: {
    width: '100%',
    height: 55,
    resizeMode: 'stretch',
    marginBottom: 0,
  },
  boxShadowView: {flex: 1, marginRight: 5},
  boxElevation: {
    color: '#fff',
    padding: 10,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#111',
    borderRadius: 30,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    elevation: 5,
  },
  boxUnselectedElevation: {
    color: '#111',
    padding: 10,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    elevation: 5,
  },

  greyBox: {
    width: '80%',
    flexDirection: 'row',
    marginLeft: 10,
    padding: 5,
    flex: 1,
    marginBottom: 15,
  },
  greyBox1: {
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    padding: 14,
    fontSize: 12,
    paddingLeft: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
  },

  CircleShapeView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    shadowColor: '#111',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginRight: 2,
  },
  txt: {
    alignSelf: 'flex-start',
    flex: 1,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  },

  loginBox: {
    padding: 7,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    width: '90%',
  },
  containerf: {
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  greyBoxf: {
    backgroundColor: '#fff',
    borderRadius: 25,
    // marginLeft: 15,
    // marginRight: 15,
    width: '90%',
    flexDirection: 'row',
    padding: 5,
    flex: 1,
  },
  circleShapeViewF: {
    width: 30,
    height: 30,
    borderRadius: 40 / 2,
    shadowColor: '#111',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginRight: 3,
  },
  cardViewF: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    height: 85,
    // margin: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  greyBoxPicker: {
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 10,
    padding: 14,
    fontSize: 12,
    paddingLeft: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.black,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  pickerStyle: {
    width: '100%',
    height: 20,
    color: '#111111',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
});
