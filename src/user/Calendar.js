import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarStrip from "react-native-calendar-strip";
import SportSchedRepo from "../repositories/SportSchedRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");

export default Calendar = function ({ route, navigation }) {
  const [sched, setSched] = useState([]);
  const [uptSched, setUptSched] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [route.params]);

  const handleSchedResult = (result) => {
    var list = [];
    result.map((item) => {
      if(item.admin_id === null) {
        list.push(item);
      }
    });
    return list;
  };

  const getData = () => {
    try {
      AsyncStorage.getItem("CustomerID").then((val) => {
        if (val) {
          SportSchedRepo.getSportSchedByUserID(val)
            .then((result) => {
              result = handleSchedResult(result);
              setSched(result);
              setUptSched(result);
            })
            .catch((error) => {
              console.error("Error fetching schedule:", error);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterDate = (date) => {
    // console.log(sched);
    // Convert string to array of time
    date = JSON.stringify(date);
    date = date.slice(1, -1);
    const dateArray = date.split("-");
    dateArray[2] = dateArray[2].substring(0, 2);

    // Compare date of sched and picked date
    var tmpSched = [];
    sched.map((item) => {
      const schedDate = item.date_time.split("-");
      if (
        schedDate[0] === dateArray[2] &&
        schedDate[2] === dateArray[0] &&
        schedDate[1] === dateArray[1]
      ) {
        tmpSched.push(item);
      } else {
        return;
      }
    });
    // console.log(tmpSched);
    setUptSched(tmpSched);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Feedback", { id: item.id })}
      style={styles.eventItem}
    >
      <Text style={styles.eventTitle}>{item.name}</Text>
      <Text style={styles.eventDescription}>{item.category}</Text>
      <Text style={styles.eventTime}>{`Date: ${item.date_time}`}</Text>
      <Text style={styles.eventTime}>{`Start time: ${item.start_time}`}</Text>
      <Text style={styles.eventTime}>
        {`Reserved time: ${item.duration} minutes`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarStrip
          style={styles.calendar}
          calendarColor={"#49B583"}
          highlightDateNameStyle={{ color: "black" }}
          highlightDateNumberStyle={{ color: "black" }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: "#49B583",
          }}
          calendarHeaderStyle={{ color: "#000" }}
          dateNumberStyle={{ color: "#fff" }}
          dateNameStyle={{ color: "#fff" }}
          onDateSelected={(date) => handleFilterDate(date)}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Add A Task", { sched: sched })}
        style={styles.button1}
      >
        <Icon name="plus" size={16} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText1}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.eventListContainer}>
        <FlatList
          data={uptSched}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  calendarContainer: {
    flex: 3,
    justifyContent: "flex-start", // Căn giữa theo chiều dọc
    paddingTop: 0, // Khoảng cách giữa lịch và nút "Add Task"
    paddingBottom: 0, // Khoảng cách giữa lịch và nút "Add Task"
  },
  button1: {
    marginTop: 5,
    backgroundColor: "#49B583",
    padding: 10,
    width: 138,
    height: 46,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 0,
    gap: 10,
    position: "absolute",
    marginBottom: 10,
    top: 110,
    right: 10,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 3,
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  eventListContainer: {
    flex: 9,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  eventList: {
    // paddingTop: 10,
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  eventDescription: {
    fontSize: 14,
    color: "#000",
  },
  eventTime: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
});
