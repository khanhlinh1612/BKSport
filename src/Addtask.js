import React from "react";
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
import moment from "moment";
import { Directions } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export default Addtask = function ({ navigation }) {
  const data = [
    { id: 1, label: "Round 1" },
    { id: 2, label: "Group Stage" },
    { id: 3, label: "Round 2" },
    { id: 4, label: "Friendly Match" },
    { id: 5, label: "Final Match" },
  ];

  const [selectedId, setSelectedId] = React.useState(null); // Trạng thái của button đang được chọn

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

  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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

  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(new Date());

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

  const [isTimePickerVisible2, setTimePickerVisible2] = React.useState(false);
  const [selectedTime2, setSelectedTime2] = React.useState(new Date());

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
              <Text style={styles.selectedDateText}>{moment(selectedDate).format("ddd DD, MMM, YYYY")}</Text>
            ) : null}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={handleDateCancel}
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
              <Text style={styles.selectedDateText}>{selectedTime ? moment(selectedTime).format("hh:mm A") : null}</Text>
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
              <Text style={styles.selectedDateText}>{selectedTime2 ? moment(selectedTime2).format("hh:mm A") : null}</Text>
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
      <TouchableOpacity onPress={() =>navigation.navigate('Calendar Management')} style={styles.button1}>
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
    justifyContent: 'center',
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
    color: '#fff',
    fontSize: 24,
    fontWeight:'bold',
},
});
