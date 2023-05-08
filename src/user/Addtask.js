import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SportSchedRepo from "../repositories/SportSchedRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Directions } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export default Addtask = function ({ route, navigation }) {
  const data = [
    { id: 1, label: "Round 1" },
    { id: 2, label: "Group Stage" },
    { id: 3, label: "Round 2" },
    { id: 4, label: "Friendly Match" },
    { id: 5, label: "Final Match" },
  ];

  const sportSchedule = route.params.sched;

  const [selectedId, setSelectedId] = useState(null); // Trạng thái của button đang được chọn
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible2, setTimePickerVisible2] = useState(false);
  const [selectedTime2, setSelectedTime2] = useState(new Date());
  const [customerID, setCustomerID] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("CustomerID").then((val) => {
        if (val) {
          setCustomerID(val);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={[
        styles.button,
        { backgroundColor: selectedId === item.id ? "#FF69B4" : "#7F86FF" },
      ]}
      underlayColor="#6F75FF" // Màu khi giữ nút
      onPress={() => setSelectedId(item.id)}
    >
      <Text style={styles.label}>{item.label}</Text>
    </TouchableHighlight>
  );

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toDateString());
    setDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

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

  const showTimePicker2 = () => {
    setTimePickerVisible2(true);
  };

  const handleTimeConfirm2 = (time) => {
    setSelectedTime2(time);
    setTimePickerVisible2(false);
  };

  const handleTimeCancel2 = () => {
    setTimePickerVisible2(false);
  };

  const convertTimeToNumber = (time) => {
    var timeArr = time.split(":");
    return Number(timeArr[0]) * 60 + Number(timeArr[1]);
  };

  const checkOverlapSched = (date, stime, etime) => {
    var flag = false;
    sportSchedule.map((item) => {
      if (item.date_time === date) {
        var reserved_start_time = convertTimeToNumber(stime);
        var reserved_end_time = convertTimeToNumber(etime);
        var start_time = convertTimeToNumber(item.start_time);
        var end_time = start_time + Number(item.duration);
        if (
          (reserved_end_time > start_time && reserved_end_time <= end_time) ||
          (reserved_start_time >= start_time && reserved_start_time < end_time) ||
          (reserved_start_time >= start_time && reserved_end_time <= end_time)
        ) {
          flag = true;
        }
      }
    });
    return flag;
  };

  const handleAddTask = async () => {
    var category = selectedId;
    var date = selectedDate;

    if (category === null) {
      alert("Please choose Category!");
      return;
    }

    data.map((item) => {
      if (item.id === selectedId) {
        category = item.label;
      }
    });

    if (topic.length === 0) {
      alert("Please enter Topic / Name!");
      return;
    }

    if (topic.length > 20) {
      alert("Topic / Name too long!");
      return;
    }

    date = JSON.stringify(date);
    date = date.slice(1, -1);
    date = date.substring(0, 10);
    const dateArray = date.split("-");
    date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    start_time = JSON.stringify(selectedTime);
    start_time = start_time.slice(1, -1);
    start_hour = Number(start_time.substring(11, 13));
    if (start_hour > 13 && start_hour < 22) {
      alert("The pitch doesn't work during 09PM to 05AM!");
      return;
    }
    start_hour = start_hour - 17;
    if (start_hour < 0) {
      start_hour += 24;
    }
    if (start_hour < 10) {
      start_hour = "0" + start_hour.toString();
    } else {
      start_hour = start_hour.toString();
    }
    start_time = start_hour + start_time.substring(13, 19);

    end_time = JSON.stringify(selectedTime2);
    end_time = end_time.slice(1, -1);
    end_hour = Number(end_time.substring(11, 13));
    end_hour = end_hour - 17;
    if (end_hour < 0) {
      end_hour += 24;
    }
    if (end_hour < 10) {
      end_hour = "0" + end_hour.toString();
    } else {
      end_hour = end_hour.toString();
    }
    end_time = end_hour + end_time.substring(13, 19);

    start_times = start_time.split(":");
    end_times = end_time.split(":");

    var start_moment = Number(start_times[0]);
    var end_moment = Number(end_times[0]);

    var duration = end_moment - start_moment;
    if (duration < 0 || duration > 1) {
      alert("Pitch reserved time is from 45 to 60 mins!");
      return;
    }

    start_moment = Number(start_times[1]);
    end_moment = Number(end_times[1]);
    let minute_value = end_moment - start_moment;
    if (duration === 0) {
      if (minute_value < 45) {
        alert("Pitch reserved time is from 45 to 60 mins!");
        return;
      }
    }
    if (duration === 1) {
      minute_value = end_moment + 60 - start_moment;
      if (minute_value < 45 || minute_value > 60) {
        alert("Pitch reserved time is from 45 to 60 mins!");
        return;
      }
    }

    if (checkOverlapSched(date, start_time, end_time)) {
      alert("Pitch was reserved during this time!");
      return;
    }

    await SportSchedRepo.createSportSched(
      topic,
      category,
      date,
      start_time,
      customerID,
      minute_value
    )
      .then((result) => {
        alert("Add schedule successfully!");
        console.log(result);
      })
      .catch((error) => {
        console.error("Error creating schedule:", error);
      });

    navigation.navigate("Calendar Management", { render: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
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
          onChangeText={(newText) => setTopic(newText)}
        />
      </View>

      <View style={styles.select}>
        <View style={styles.selectCalendar}>
          <View style={styles.selectIcon}>
            <TouchableOpacity onPress={showDatePicker}>
              <Icon name="calendar" size={30} color="#00559A" />
            </TouchableOpacity>
          </View>
          <View style={styles.selectText}>
            {selectedDate ? (
              <Text style={styles.selectedDateText}>
                {moment(selectedDate).format("ddd DD, MMM, YYYY")}
              </Text>
            ) : null}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setSelectedDate(moment(date).format("YYYY-MM-DD"));
                setDatePickerVisible(false);
              }}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>
        </View>
        <View style={styles.fromto}>
          <Text style={styles.text}>From</Text>
        </View>
        <View style={styles.selectCalendar}>
          <View style={styles.selectIcon}>
            <TouchableOpacity onPress={showTimePicker}>
              <Icon name="clock-o" size={30} color="orange" />
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
        <View style={styles.fromto}>
          <Text style={styles.text}>To</Text>
        </View>
        <View style={styles.selectCalendar}>
          <View style={styles.selectIcon}>
            <TouchableOpacity onPress={showTimePicker2}>
              <Icon name="clock-o" size={30} color="orange" />
            </TouchableOpacity>
          </View>
          <View style={styles.selectText}>
            {selectedTime2 ? (
              <Text style={styles.selectedDateText}>
                {selectedTime2 ? moment(selectedTime2).format("hh:mm A") : null}
              </Text>
            ) : null}
            <DateTimePickerModal
              isVisible={isTimePickerVisible2}
              mode="time"
              onConfirm={handleTimeConfirm2}
              onCancel={handleTimeCancel2}
            />
          </View>
        </View>
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
  // CSS Flatlist Categories
  flatlistContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 25,
  },
  button: {
    backgroundColor: "#7F86FF",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // CSS Topic's Name
  topic: {
    flex: 2,
    flexGrow: 0.8,
    flexDirection: "row",
    borderColor: "#fff",
    borderWidth: 1,
    marginHorizontal: 35,
    borderRadius: 20,
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#CFCFCF",
  },
  // CSS phần chọn ngày giờ
  select: {
    flex: 5,
  },
  selectCalendar: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
  },
  fromto: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  selectIcon: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  selectText: {
    marginLeft: 30,
    textAlign: "right",
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "600",
  },
  // CSS nút xác nhận
  buttonContainer: {
    flex: 2,
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
