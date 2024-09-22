import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashBoard = ({navigation}) => {
  const [userName, setUserName] = useState('');
  let getcurrentuser = async () => {
    const customerName = await AsyncStorage.getItem('currentuser');
    setUserName(customerName);
  };
  useEffect(() => {
    getcurrentuser();
    //  const storedArray = await AsyncStorage.getItem('USERINFO');
  }, []);

  const handleuserMenu = () => {
    navigation.navigate('Users');
  };
  return (
    <View>
      <View
        style={{
          margin: 25,
        }}>
        <Text>{`Hello ${userName}`}</Text>
      </View>
      {userName === 'admin' && (
        <TouchableOpacity onPress={handleuserMenu}>
          <Text
            style={{
              margin: 25,
              backgroundColor: 'blue',
              textAlign: 'center',
              color: 'white',
              padding: 2,
            }}>
            Users Menu
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
