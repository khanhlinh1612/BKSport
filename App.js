import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Welcome';
import Weather from './src/Weather';
import Home from './src/Home';
import Login from './src/Login';
import Register from './src/Register';
import Calendar from './src/Calendar';
import Addtask from './src/Addtask';
import EditInfor from './src/EditInfor';
import Feedback from './src/Feedback';
import Information from './src/Information';
import ControlPage from './src//lightcontrol';
import HomeAdmin from './src/HomeAdmin';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Information" component={Information}  />
      <Drawer.Screen name="Calendar Management" component={Calendar}  />
      <Drawer.Screen name="Weather" component={Weather} />
      <Drawer.Screen name="Light Control" component={ControlPage} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="HomeAdmin" component={HomeAdmin} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Add a task" component={Addtask} />
        <Stack.Screen name="Edit Infor" component={EditInfor} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button1: {
    marginTop: 70,
    backgroundColor: '#F47229',
    padding: 10,
    width: 181.28,
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 49,
    gap: 10,
  },
  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
