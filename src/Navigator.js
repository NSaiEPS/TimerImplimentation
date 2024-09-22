import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Users from '../screens/Users';
import DashBoard from '../screens/DashBoard';
import AddNewUser from '../screens/AddNewUser';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DashBoard {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="AddNewUser" component={AddNewUser} />
    </Drawer.Navigator>
  );
}

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  const RootStackScreen = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={'AUTHSTACK'}
        component={AuthStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={'HOME_STACK'}
        component={MyDrawer}
      />
    </Stack.Navigator>
  );

  const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={'LOGIN_SCREEN'} component={Login} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
