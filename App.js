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
import ControlPage from './src/admin/lightcontrol';
import HomeAdmin from './src/admin/HomeAdmin';
import SuggestCalendar from './src/SuggestCalendar';
import OTP from './src/Otp';
import ManageCustomer from './src/admin/ManageCustomer';
import CustomerDetail from './src/admin/CustomerDetail';
import CustomerCalendar from './src/admin/CustomerCalendar';
import AddCalendar from './src/admin/AddCalendar';
import WateringSystem from './src/admin/WateringSystem';
import AddPumpTask from './src/admin/AddPumpTask';

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
      <Drawer.Screen name="Suggestion" component={SuggestCalendar} />
      <Drawer.Screen name="OTP" component={OTP} />
      <Drawer.Screen name="Customer Management" component={ManageCustomer} />
      <Drawer.Screen name="Watering System" component={WateringSystem} />
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
        <Stack.Screen name="Add A Task" component={Addtask} />
        <Stack.Screen name="Edit Infor" component={EditInfor}  />
        <Stack.Screen name="Customer's Detail" component={CustomerDetail} />
        <Stack.Screen name="Customer's Calendar" component={CustomerCalendar} />
        <Stack.Screen name="Add Calendar" component={AddCalendar} />
        <Stack.Screen name="Add Pump Task" component={AddPumpTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
