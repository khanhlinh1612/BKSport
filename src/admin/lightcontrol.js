import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import LottieView from "lottie-react-native";
const AIO_USERNAME = "doanladeproject";
const abc = "aio_Xein14SxFalZ412rCRLTAaljvEaQ";
const AIO_FEED = "led";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ControlPage = () => {
  const [selectedValue, setSelectedValue] = useState("white");
  const updateLightStatus = (value) => {
    axios
      .post(
        `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${AIO_FEED}/data`,
        {
          value,
        },
        {
          headers: {
            "X-AIO-Key": abc,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
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
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="White" value="white" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Yellow" value="yellow" />
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Orange" value="orange" />
      </Picker>
      <TouchableOpacity
        style={[styles.controlButton, { backgroundColor: "orange" }]}
        onPress={updateLightStatus(selectedValue)}
      >
        <Text style={styles.buttonText}>Change Color</Text>
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
