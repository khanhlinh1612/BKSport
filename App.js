import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Welcome';
import Weather from './src/Weather';
import Home from './src/Home';
import Login from './src/Login';
import Feedback from './src/Feedback';
import Information from './src/Information';
import EditInfor from './src/EditInfor';
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
      <Drawer.Screen name="Weather" component={Weather} />
      <Drawer.Screen name="Feedback" component={Feedback} />
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
        <Stack.Screen name="Edit Information" component={EditInfor}/>
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
