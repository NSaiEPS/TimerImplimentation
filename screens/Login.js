import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AppState,
  Dimensions,
  Button,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState();
  const [disableSubmit, setdisableSubmit] = useState();
  const [kewboardOPen, setkewboardOPen] = useState(false);

  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const [usersList, setusersList] = useState([]);

  let getUsersInfo = async () => {
    const users = await AsyncStorage.getItem('userslist');
    const reqArray = JSON.parse(users);
    if (Array.isArray(reqArray)) {
      setusersList(reqArray);
      console.log(reqArray, 'reqArray');
    }
  };
  useEffect(() => {
    getUsersInfo();
  }, []);
  const handleLogin = async () => {
    console.log('ugujh');
    if (userName === 'admin') {
      if (password === 'admin') {
        //     const customerToken = await AsyncStorage.getItem('USERVISITED');
        //   const authToken = await AsyncStorage.getItem('USERINFO');
        //   customerToken
        //     ? authToken
        //       ? NavigationService.reset(BOTTOM_NAVIGATION_STACK)
        //       : NavigationService.reset(AUTHSTACK)
        //     : // NavigationService.reset(ONBOARDING_SCREEN)
        //       NavigationService.reset(ONBOARDING_SCREEN);
        await AsyncStorage.setItem('currentuser', userName);
        navigation.replace('HOME_STACK');
      } else {
        Alert.alert('Password mistmatch');
      }
    } else {
      const isUserExist = usersList?.find(e => {
        return e?.userName === userName;
      });
      if (isUserExist) {
        let requser = '';
        let userinfo = usersList?.map(item => {
          if (item?.userName === userName) {
            requser = item;
          }
        });

        if (requser?.password === password) {
          console.log(userinfo, 'userinfo');
          await AsyncStorage.setItem('currentuser', userName);

          navigation.replace('HOME_STACK');
        } else {
          console.log(userinfo, 'userinfo');

          Alert.alert('Password mismatch');
        }
      } else {
        if (!userName) {
          Alert.alert('Plese enter username');
        } else {
          Alert.alert("usename doesn't exist");
        }
      }
    }
  };

  return (
    <View style={styles.container()}>
      <View style={styles.bottomContainer()}>
        <View>
          <Text style={styles.login()}>Please login to proceed further</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'enter your username'}
            value={userName}
            onChangeText={text => setuserName(text)}
            placeholderTextColor={'lightblack'}
            style={{
              height: 50,
              elevation: 2,

              backgroundColor: 'white',
              borderRadius: 5,
              paddingHorizontal: 16,
              color: '#000',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              textAlignVertical: 'center',
            }}
          />
          <TextInput
            placeholder={'enter your password'}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'lightblack'}
            style={{
              height: 50,
              elevation: 2,

              backgroundColor: 'white',
              borderRadius: 5,
              paddingHorizontal: 16,
              color: '#000',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              textAlignVertical: 'center',
              marginTop: 10,
            }}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            flexDirection: 'row',
            borderColor: 'white',
            borderWidth: 1,

            // marginLeft: 16,
            borderRadius: 10,
            height: 30,
            // width: 130,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            paddingHorizontal: 10,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              color: 'white',
              marginBottom: 3,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: colors => ({
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  }),
  image: {
    height: 152,
    width: 375,
  },
  login: colors => ({
    // fontSize: 32,
    color: 'black',
    marginTop: 20,
    // borderBottomColor: 'yellow',
    // borderBottomWidth: 2,
    zIndex: 1,
  }),

  bottomContainer: colors => ({
    marginHorizontal: 20,
    backgroundColor: 'white',
  }),
  imageContainer: colors => ({
    backgroundColor: 'red',
  }),

  email: colors => ({
    // fontSize: 16,
    color: 'silver',
    marginTop: 90,
  }),

  password: {
    marginTop: 20,
  },

  eyeIcon: {
    position: 'relative',
    alignSelf: 'flex-end',
    right: 30,
    bottom: 40,
  },
  button: {
    marginTop: 80,
  },
  forgotPassword: colors => ({
    // fontSize: 16,
    color: 'silver',
    marginRight: 16,
  }),
  passwordContainer: {
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  createAccount: colors => ({
    color: 'purple',
    // fontSize: 16,
  }),
  account: {
    alignSelf: 'center',
    marginTop: 70,
  },
  create: colors => ({
    // fontSize: 16,
    color: 'silver',
    // color: '#283667',
  }),
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  loginContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  labelStyle: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 40,
  },

  yellowLine: {
    borderBottomColor: 'yellow',
    borderBottomWidth: 5,
    position: 'relative',
    bottom: 8,
    left: 0,
  },
  skip: colors => ({
    color: 'white',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    // width: 70,
  }),
  skipContainer: cls => ({
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'purple',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,

    // marginLeft: 16,
    borderRadius: 130,
    height: 30,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    paddingHorizontal: 4,
    // backgroundColor: 'red',
    // width: 150,
  }),
});
