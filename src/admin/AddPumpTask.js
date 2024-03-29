import React, { useState, useEffect } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PumpSchedRepo from "../repositories/PumpSchedRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default AddPumpTask = function ({ route, navigation }) {
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  const handleTimeCancel = () => {
    setTimePickerVisible(false);
  };

  const pumpSched = route.params.sched;

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [duration, setDuration] = useState("5");
  const [topic, setTopic] = useState("");
  const [adminID, setAdminID] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("AdminID").then((val) => {
        if (val) {
          setAdminID(val);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const convertTimeToNumber = (time) => {
    var timeArr = time.split(":");
    return Number(timeArr[0]) * 60 + Number(timeArr[1]);
  };

  const checkOverlapSched = (stime, duration) => {
    var flag = false;
    pumpSched.map((item) => {
      var reserved_start_time = convertTimeToNumber(stime);
      var reserved_end_time = reserved_start_time + Number(duration);
      var start_time = convertTimeToNumber(item.start_time);
      var end_time = start_time + Number(item.duration);
      if (
        (reserved_end_time > start_time && reserved_end_time <= end_time) ||
        (reserved_start_time >= start_time && reserved_start_time < end_time) ||
        (reserved_start_time >= start_time && reserved_end_time <= end_time)
      ) {
        flag = true;
      }
    });
    return flag;
  };

  const handleAddTask = () => {
    if (topic.length === 0) {
      alert("Please enter Topic / Name!");
      return;
    }

    if (topic.length > 20) {
      alert("Topic / Name too long!");
      return;
    }

    start_time = JSON.stringify(selectedTime);
    start_time = start_time.slice(1, -1);
    start_hour = Number(start_time.substring(11, 13));
    start_hour = start_hour - 17;
    if (start_hour < 0) {
      start_hour += 24;
    }
    if (start_hour < 10) {
      start_hour = "0" + start_hour.toString();
    } else {
      start_hour = start_hour.toString();
    }
    start_time = start_hour + start_time.substring(13, 16) + ":00";

    if (checkOverlapSched(start_time, duration)) {
      alert("Overlap pumping schedule!");
      return;
    }

    PumpSchedRepo.createPumpSched(topic, start_time, duration, adminID)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });

    navigation.navigate("Watering System", { render: true })
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottielogo}>
        <LottieView
          style={styles.pumpImage}
          source={require("../../assets/watering.json")}
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
          onChangeText={(itemValue) => setTopic(itemValue)}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.textPicker}>Select start time and duration</Text>
        <View style={styles.selectCalendar}>
          <View style={styles.selectIcon}>
            <TouchableOpacity onPress={showTimePicker}>
              <Icon name="clock-o" size={30} color="#F7AFAF" />
            </TouchableOpacity>
          </View>
          <View style={styles.selectText}>
            {selectedTime ? (
              <Text style={styles.selectedDateText}>
                {selectedTime ? moment(selectedTime).format("hh:mm A") : null}
              </Text>
            ) : null}
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={handleTimeCancel}
            />
          </View>
        </View>
        <Picker
          selectedValue={duration}
          onValueChange={(itemValue) => setDuration(itemValue)}
          style={{ height: 50, width: 240 }}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="5 min" value="5" />
          <Picker.Item label="10 min" value="10" />
          <Picker.Item label="15 min" value="15" />
          <Picker.Item label="20 min" value="20" />
          <Picker.Item label="25 min" value="25" />
          <Picker.Item label="30 min" value="30" />
          <Picker.Item label="35 min" value="35" />
          <Picker.Item label="40 min" value="40" />
          <Picker.Item label="45 min" value="45" />
          <Picker.Item label="50 min" value="50" />
          <Picker.Item label="55 min" value="55" />
          <Picker.Item label="60 min" value="60" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleAddTask()}
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
    marginTop: "2.5%",
    width: 0.25 * windowWidth,
    height: 0.25 * windowHeight,
    marginBottom: 20,
    alignSelf: "center",
  },
  // CSS Topic's Name
  topic: {
    flex: 2,
    flexGrow: 0.4,
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
    flex: 2.5,
    marginTop: 20,
    alignItems: "center",
    height: 0.3 * windowHeight,
    width: 1 * windowWidth,
    // backgroundColor:'aqua',
  },
  // CSS Time Picker
  selectCalendar: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 60,
  },
  selectIcon: {
    backgroundColor: "#52B640",
    borderRadius: 15,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  selectText: {
    marginLeft: 20,
    textAlign: "right",
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#329B24",
  },
  // CSS scroll time
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
    flex: 0.5,
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
