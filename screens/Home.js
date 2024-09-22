import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [userName, setUserName] = useState('');
  let getcurrentuser = async () => {
    const customerName = await AsyncStorage.getItem('currentuser');
    setUserName(customerName);
  };
  useEffect(() => {
    getcurrentuser();
    //  const storedArray = await AsyncStorage.getItem('USERINFO');
  }, []);
  return (
    <View>
      <View
        style={{
          margin: 25,
        }}>
        <Text>{`Hello ${userName}`}</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
