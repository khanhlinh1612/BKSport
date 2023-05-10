import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import LottieView from "lottie-react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default AddPumpTask = function ({ navigation }) {
  const [duration, setDuration] = useState("5");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottielogo}>
        <LottieView
          style={styles.pumpImage}
          source={require("../../assets/light.json")}
          autoPlay
          loop
          speed={2}
        />
      </View>
      <View style={styles.topic}>
        <Icon
          name="file-text-o"
          size={20}
          color="#666666"
          style={{ marginRight: 20, paddingLeft: 20 }}
        />
        <TextInput
          placeholder="Topic / Name"
          style={{
            flex: 0.8,
            paddingVertical: 0,
            fontSize: 18,
            fontWeight: "500",
          }}
          placeholderTextColor="#666666"
        />
      </View>
      
      <View style={styles.pickerContainer}>
        <Text style={styles.textPicker}>Pick Time For Pump</Text>
        <Picker
          selectedValue={duration}
          onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
          style={{ height: 50, width: 240 }}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="5 min" value="5" />
          <Picker.Item label="10 min" value="10" />
          <Picker.Item label="15 min" value="15" />
          <Picker.Item label="20 min" value="20" />
          <Picker.Item label="25 min" value="25" />
          <Picker.Item label="30 min" value="30" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Watering System")}
          style={styles.button1}
        >
          <Text style={styles.buttonText1}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // CSS LottieView
  lottielogo: {
    flex: 1.5,
  },
  pumpImage: {
    marginTop:'5%',
    width: 0.3 * windowWidth,
    height: 0.25 * windowHeight,
    marginBottom: 30,
    alignSelf:'center',
  },
  // CSS Topic's Name
  topic: {
    flex: 2,
    flexGrow: 0.3,
    flexDirection: "row",
    borderColor: "#fff",
    borderWidth: 1,
    marginHorizontal: 35,
    borderRadius: 20,
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#CFCFCF",
  },
  // CSS picker
  pickerContainer: {
    flex: 2,
    marginTop: 20,
    alignItems: "center",
    height: 0.3 * windowHeight,
    width: 1 * windowWidth,
  },
  pickerItem: {
    fontSize: 24,
    fontWeight: "500",
    color: "green",
  },
  textPicker: {
    margin: 20,
    color: "green",
    fontSize: 20,
    fontWeight: "700",
  },
  // CSS nút xác nhận
  buttonContainer: {
    flex: .5,
    justifyContent: "center",
  },
  button1: {
    backgroundColor: "#49B583",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText1: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
