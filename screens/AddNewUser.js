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

const AddNewUser = ({navigation, route}) => {
  let items = route?.params?.items;
  console.log(items, 'items¯¯');
  const [userName, setuserName] = useState(items ? items?.userName : '');
  const [password, setPassword] = useState(items ? items?.password : '');
  const [name, setName] = useState(items ? items?.name : '');
  const [conformpassword, setconformpassword] = useState(
    items ? items?.conformpassword : '',
  );

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
  const handleAdduser = async () => {
    if (items) {
      let index = usersList?.findIndex(items);

      let requser = [...usersList];
      requser[index] = {
        userName: userName,
        name: name,
        password: password,
        conformpassword: conformpassword,
      };
      await AsyncStorage.setItem('userslist', JSON.stringify(requser));
      setuserName('');
      setPassword('');
      setName('');
      setconformpassword('');
      navigation.goBack();
    } else {
      if (password === conformpassword) {
        console.log({
          userName: userName,
          name: name,
          password: password,
          conformpassword: conformpassword,
        });
        console.log(usersList, 'usersList');
        let newusers = [
          ...usersList,
          {
            userName: userName,
            name: name,
            password: password,
            conformpassword: conformpassword,
          },
        ];
        await AsyncStorage.setItem('userslist', JSON.stringify(newusers));
        setuserName('');
        setPassword('');
        setName('');
        setconformpassword('');
        navigation.goBack();
      } else {
        Alert.alert("Password's must be same");
      }
    }
    // name username password
  };

  const handleDelete = async () => {
    Alert.alert(
      'Alert Title',
      'Are you sure to delete',
      [
        {
          text: 'Yes',
          onPress: async () => {
            let index = usersList?.indexOf(items);
            // // console.log(index, 'indexz');
            let requser = [...usersList];
            requser.splice(index, 1);
            await AsyncStorage.setItem('userslist', JSON.stringify(requser));
            navigation.goBack();
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

    // console.log(usersList, 'usersList');
  };

  return (
    <View style={styles.container()}>
      <View style={styles.bottomContainer()}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'enter users Name'}
            value={name}
            onChangeText={text => setName(text)}
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
          />
          <TextInput
            placeholder={'enter users UserName'}
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
              marginTop: 10,
            }}
          />
          <TextInput
            placeholder={'enter users password'}
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
            secureTextEntry={true}
          />
          <TextInput
            placeholder={'enter user conformPassword'}
            value={conformpassword}
            onChangeText={text => setconformpassword(text)}
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
            // secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            flexDirection: 'row',
            borderColor: 'white',
            borderWidth: 1,

            // marginLeft: 16,
            borderRadius: 130,
            height: 30,
            // width: 130,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            paddingHorizontal: 10,
            // paddingVertical: 5,
          }}
          onPress={handleAdduser}>
          <Text
            style={{
              color: 'white',
            }}>
            {items ? 'Edit user' : 'Add'}
          </Text>
        </TouchableOpacity>
        {items && (
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              flexDirection: 'row',
              borderColor: 'white',
              borderWidth: 1,

              // marginLeft: 16,
              borderRadius: 130,
              height: 30,
              // width: 130,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              paddingHorizontal: 10,
              // paddingVertical: 5,
            }}
            onPress={handleDelete}>
            <Text
              style={{
                color: 'white',
              }}>
              Delete this user
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddNewUser;

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
