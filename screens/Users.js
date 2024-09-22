import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const Users = ({navigation}) => {
  const handleAdduser = () => {
    navigation.navigate('AddNewUser');
  };

  const [usersList, setusersList] = useState([]);

  let getUsersInfo = async () => {
    const users = await AsyncStorage.getItem('userslist');
    const reqArray = JSON.parse(users);
    if (Array.isArray(reqArray)) {
      setusersList(reqArray);
      console.log(reqArray, 'reqArray');
    }
  };

  let focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      getUsersInfo();
    }
  }, [focus]);

  const handleEdit = item => {
    console.log(item);
    navigation.navigate('AddNewUser', {
      items: item,
    });
  };
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Users List
      </Text>
      <FlatList
        data={usersList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                elevation: 5,
                padding: 10,
              }}>
              <Text
                onPress={() => handleEdit(item)}
                style={{
                  marginLeft: 'auto',
                }}>
                edit
              </Text>

              <Text>name:{item?.name}</Text>
              <Text>userName:{item?.userName}</Text>
            </TouchableOpacity>
          );
        }}
      />

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
          top: Dimensions.get('screen').height - 225,
          paddingHorizontal: 10,
          position: 'absolute',
          left: Dimensions.get('screen').width / 2 - 20,
          // paddingVertical: 5,
        }}
        onPress={handleAdduser}>
        <Text
          style={{
            color: 'white',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
