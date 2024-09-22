import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const TimerApp = () => {
  const [appsState, setAppsState] = useState(AppState.currentState);
  const [reqSeconds, setReqSeconds] = useState(0);
  const [checlIsRunning, setCheckIsRunning] = useState(false);

  useEffect(() => {
    const syncing = async () => {
      try {
        const storedSeconds = await AsyncStorage.getItem('storedSeconds');
        const storedIsRunning = await AsyncStorage.getItem('checkisRunning');
        const lastTimestamp = await AsyncStorage.getItem('lastTimestamp');

        if (storedSeconds !== null) {
          setReqSeconds(parseInt(storedSeconds));
        }
        if (storedIsRunning === 'true' && lastTimestamp) {
          const timediff = moment().diff(moment(lastTimestamp), 'seconds');
          setReqSeconds(prev => prev + timediff);
        }
        setCheckIsRunning(storedIsRunning === 'true');
      } catch (e) {
        console.error('check', e);
      }
    };

    syncing();
  }, []);

  const handleStartPause = async () => {
    setCheckIsRunning(!checlIsRunning);
    const currentTimestamp = moment().toISOString();

    await AsyncStorage.multiSet([
      ['storedSeconds', reqSeconds.toString()],
      ['checkisRunning', (!checlIsRunning).toString()],
      ['lastTimestamp', currentTimestamp],
    ]);
  };

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (
        appsState !== 'active' &&
        nextAppState === 'active' &&
        checlIsRunning
      ) {
        const lastTimestamp = await AsyncStorage.getItem('lastTimestamp');
        if (lastTimestamp) {
          const terminatedTime = moment().diff(
            moment(lastTimestamp),
            'seconds',
          );
          setReqSeconds(secnds => secnds + terminatedTime);
        }
      }

      if (nextAppState === 'background') {
        await AsyncStorage.multiSet([
          ['storedSeconds', reqSeconds.toString()],
          ['checkisRunning', checlIsRunning.toString()],
          ['lastTimestamp', moment().toISOString()],
        ]);
      }

      setAppsState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [appsState, checlIsRunning, reqSeconds]);

  useEffect(() => {
    let interval = null;
    if (checlIsRunning) {
      interval = setInterval(() => setReqSeconds(secnds => secnds + 1), 1000);
    } else if (!checlIsRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [checlIsRunning]);

  const getReqTime = totalSeconds => {
    const hourd = Math.floor(totalSeconds / 3600);
    const mints = Math.floor((totalSeconds % 3600) / 60);
    const secnds = totalSeconds % 60;
    const reqformatShow = time =>
      time?.toString()?.length > 1 ? time : `0${time}`;
    return `${reqformatShow(hourd)}:${reqformatShow(mints)}:${reqformatShow(
      secnds,
    )}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{getReqTime(reqSeconds)}</Text>
      <Button
        title={checlIsRunning ? 'Pause' : 'Start'}
        onPress={handleStartPause}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
});

export default TimerApp;
