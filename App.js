import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/general/Welcome";
import Weather from "./src/user/Weather";
import Home from "./src/user/Home";
import Login from "./src/general/Login";
import Register from "./src/general/Register";
import Calendar from "./src/user/Calendar";
import Addtask from "./src/user/Addtask";
import EditInfor from "./src/user/EditInfor";
import Feedback from "./src/user/Feedback";
import Information from "./src/user/Information";
import ControlPage from "./src/admin/lightcontrol";
import HomeAdmin from "./src/admin/HomeAdmin";
import SuggestCalendar from "./src/user/SuggestCalendar";
import OTP from "./src/user/Otp";
import ManageCustomer from "./src/admin/ManageCustomer";
import CustomerDetail from "./src/admin/CustomerDetail";
import CustomerCalendar from "./src/admin/CustomerCalendar";
import AddCalendar from "./src/admin/AddCalendar";
import WateringSystem from "./src/admin/WateringSystem";
import AddPumpTask from "./src/admin/AddPumpTask";
import FeedbackDetail from "./src/admin/FeedbackDetail";
import ViewFeedbackAdmin from "./src/admin/ViewFeedbackAdmin";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Drawer1 = createDrawerNavigator(); 
async function openDatabase() {
  const database = SQLite.openDatabase("BKSPORT.db");
  database._db.close();

  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }

  else {
   return SQLite.openDatabase("BKSPORT.db");
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(require("./assets/BKSPORT.db")).uri,
    FileSystem.documentDirectory + "SQLite/BKSPORT.db"
  );

  return SQLite.openDatabase("BKSPORT.db");
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Information" component={Information} />
      <Drawer.Screen name="Calendar Management" component={Calendar} />
      <Drawer.Screen name="Weather" component={Weather} />     
      <Drawer.Screen name="Feedback" component={Feedback} /> 
      <Drawer.Screen name="Suggestion" component={SuggestCalendar} />
      <Drawer.Screen name="OTP" component={OTP} />
    </Drawer.Navigator>
  );
}


function MyDrawer1() {
  return (
    <Drawer1.Navigator>
      <Drawer1.Screen name="HomeAdmin" component={HomeAdmin} />
      <Drawer1.Screen name="Weather" component={Weather} />
      <Drawer1.Screen name="Light Control" component={ControlPage} />
      <Drawer1.Screen name="Customer Management" component={ManageCustomer} />
      <Drawer1.Screen name="Watering System" component={WateringSystem} />
      <Drawer1.Screen name="ViewFeedback" component={ViewFeedbackAdmin} />
    </Drawer1.Navigator>
  );
}






export default function App() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    async function loadDatabase() {
      const database = await openDatabase();
      setDb(database);
    }
    loadDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyDrawer1"
          component={MyDrawer1}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add A Task" component={Addtask} />
        <Stack.Screen name="Edit Infor" component={EditInfor} />
        <Stack.Screen name="Customer's Detail" component={CustomerDetail} />
        <Stack.Screen name="Customer's Calendar" component={CustomerCalendar} />
        <Stack.Screen name="Add Calendar" component={AddCalendar} />
        <Stack.Screen name="Add Pump Task" component={AddPumpTask} />
        <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
