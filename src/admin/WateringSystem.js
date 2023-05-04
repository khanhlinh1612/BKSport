import React from "react";
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
const { width, height } = Dimensions.get("screen");

export default WateringSystem = function ({ navigation }) {
  const events = [
    {
      id: 1,
      title: "Tưới nước lần 1",
      time: "30 minutes",
    },
    {
      id: 2,
      title: "Tưới nước lần 2",
      time: "10 minutes",
    },
    {
      id: 3,
      title: "Tưới nước lần 3",
      time: "20 minutes",
    },
    {
      id: 4,
      title: "Tưới nước lần 4",
      time: "40 minutes",
    },
    {
      id: 5,
      title: "Tưới nước lần 5",
      time: "50 minutes",
    },
    {
      id: 6,
      title: "Tưới nước lần 6",
      time: "60 minutes",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventTime}>{item.time}</Text>
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
        onPress={() => navigation.navigate("Add Pump Task")}
        style={styles.button1}
      >
        <Icon name="plus" size={16} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText1}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.eventListContainer}>
        <FlatList
          data={events}
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
