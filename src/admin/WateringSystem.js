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
import PumpSchedRepo from "../repositories/PumpSchedRepo";
const { width, height } = Dimensions.get("screen");

export default WateringSystem = function ({ route, navigation }) {

  const [pumpSched, setPumpSched] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [route.params]);

  const getData = () => {
    try {
      PumpSchedRepo.getAllPumpSched()
        .then((result) => {
          setPumpSched(result);
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.name}</Text>
      <Text style={styles.eventTime}>{`Start time: ${item.start_time}`}</Text>
      <Text style={styles.eventTime}>{`Duration: ${item.duration} minutes`}</Text>
    </View>
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
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Add Pump Task", { sched: pumpSched })}
        style={styles.button1}
      >
        <Icon name="plus" size={16} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText1}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.eventListContainer}>
        <FlatList
          data={pumpSched}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
    justifyContent: "flex-start",
    paddingTop: 0,
    paddingBottom: 0, 
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
  eventTime: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
});
