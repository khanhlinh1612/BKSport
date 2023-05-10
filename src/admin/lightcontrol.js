import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminRepo from "../repositories/AdminRepo";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ControlPage = () => {
  const [adminId, setAdminId] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("AdminID").then((val) => {
        if (val) {
          AdminRepo.getAdminByID(val)
            .then((result) => {
              setAdminId(result.id);
              setColor(result.light_color);
            })
            .catch((error) => {
              console.error("Error fetching admin:", error);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLightStatus = (color) => {
    AdminRepo.updateColorByID(color, adminId)
      .then((result) => {
        alert("Change color successfully");
        console.log(result);
      })
      .catch((error) => {
        console.error("Error updating admin:", error);
      });
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lightImage}
        source={require("../../assets/light.json")}
        autoPlay
        loop
        speed={2}
      />
      <Text style={styles.textPicker}>Choose the color</Text>
      <Picker
        style={styles.picker}
        selectedValue={color}
        onValueChange={(itemValue) => setColor(itemValue)}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="White" value="white" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Yellow" value="yellow" />
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Orange" value="orange" />
        <Picker.Item label="Indigo" value="indigo" />
        <Picker.Item label="Purple" value="purple" />
      </Picker>
      <TouchableOpacity
        style={[styles.controlButton, { backgroundColor: "orange" }]}
        onPress={() => updateLightStatus(color)}
      >
        <Text style={styles.buttonText}>
          Change Color
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textPicker: {
    margin: 20,
    color: "#5DBA22",
    fontSize: 17,
    fontWeight: "700",
  },
  picker: {
    height: 0.3 * windowHeight,
    width: 1 * windowWidth,
    alignSelf: "center",
  },
  pickerItem: {
    color: "purple",
  },
  lightImage: {
    marginTop: "5%",
    width: 0.3 * windowWidth,
    height: 0.3 * windowHeight,
    marginBottom: 30,
    alignSelf: "center",
  },
  controlButton: {
    width: 0.8 * windowWidth,
    height: 0.07 * windowHeight,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ControlPage;
