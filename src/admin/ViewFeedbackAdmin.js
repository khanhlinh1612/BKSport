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
import SportSchedRepo from "../repositories/SportSchedRepo";
import CustomerRepo from "../repositories/CustomerRepo";
const { width, height } = Dimensions.get("screen");

export default ViewFeedback = function ({ navigation }) {
  const [sched, setSched] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getInfo = (uid) => {
    for(let i = 0; i < customer.length; i++) {
      if(customer[i].id === uid) {
        return customer[i];
      }
    }
  }

  const handleSchedResult = (result) => {
    var list = [];
    result.map((item) => {
      if (item.admin_id === null) {
        list.push(item);
      }
    });
    return list;
  };

  const getData = () => {
    try {
      SportSchedRepo.getAllSportSched()
        .then((result) => {
          result = handleSchedResult(result);
          setSched(result);
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
      CustomerRepo.getAllCustomer()
        .then((result) => {
          setCustomer(result);
        })
        .catch((error) => {
          console.error("Error fetching customer:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getNameById = (uid) => {
    var name = "";
    customer.map((item) => {
      if(item.id === uid) {
        name = item.name;
      }
    });
    return name;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FeedbackDetail", { sched: sched, info: getInfo(item.uid), id: item.id })}
      style={item.id % 2 == 0 ? styles.eventItem : styles.eventItem1}
    >
      <Text style={styles.eventTitle}>{item.feedback_title}</Text>

      <Text style={styles.eventusername}>{getNameById(item.uid)}</Text>

      <Text style={styles.eventusername} numberOfLines={1}>
        <Text style={{ fontWeight: 500, fontSize: 14 }}>Description:</Text>{" "}
        {item.feedback_comment}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#000",
          fontWeight: 400,
          marginTop: 4,
          marginLeft: 200,
        }}
      >
        {item.feedback_date_time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.eventListContainer}>
        <FlatList
          data={sched}
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
    backgroundColor: "#c4e4e3",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 2,
  },
  eventItem1: {
    backgroundColor: "#ffe1e9",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  eventusername: {
    fontSize: 14,
    color: "#000",
    marginTop: 2,
  },
  eventTime: {
    fontSize: 14,
    color: "black",
    marginTop: 4,
  },
});
