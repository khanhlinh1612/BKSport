import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SportSchedRepo from "../repositories/SportSchedRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default SuggestCalendar = function ({ navigation }) {
  const [sched, setSched] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleSchedResult = (result) => {
    var list = [];
    result.map((item) => {
      if (item.admin_id !== null) {
        list.push(item);
      }
    });
    if (list.length > 0) {
      return [list[0]];
    }
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

  const RenderEmptySched = () => {
    return(
      <View style={styles.matchtype}>
        <Text style={styles.matchtypeText}>Great, all matches are proceeding as normal and no schedules have been proposed.</Text>
      </View>
    )
  }

  const handleConvertTime = (start_time, duration) => {
    const startArray = start_time.split(":");
    var hour = Number(startArray[0]);
    var minute = Number(startArray[1]);
    var period = Number(duration);
    minute = minute + period;
    if (minute > 59) {
      minute = minute - 60;
      hour += 1;
    }
    if (hour < 10) {
      hour = "0" + hour.toString();
    }
    if (minute < 10) {
      minute = "0" + minute.toString();
    }
    return hour + ":" + minute + ":00";
  }

  const handleAcceptBtn = (id) => {
    SportSchedRepo.updateSportSchedByAdminID(id)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error accepting schedule:", error);
      });
    navigation.navigate("Home");
  }

  const handleDenyBtn = (id) => {
    SportSchedRepo.deleteSportSchedByID(id)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error denying schedule:", error);
      });
    navigation.navigate("Home");
  }

  return (
    <React.Fragment>
      {sched.length === 0 ? (
        <RenderEmptySched />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.containerRecommend}>
            <View style={styles.matchtype}>
              <Text style={styles.matchtypeText}>{sched[0].category}</Text>
            </View>

            <View style={styles.calendar}>
              <View style={styles.icon}>
                <Icon name="tag" size={30} color="#00559A" />
              </View>
              <Text style={styles.text}>{sched[0].name}</Text>
            </View>
            <View style={styles.calendar}>
              <View style={styles.icon}>
                <Icon name="calendar" size={30} color="#00559A" />
              </View>
              <Text style={styles.text}>{sched[0].date_time}</Text>
            </View>
            <View style={styles.fromto}>
              <Text style={styles.text}>From</Text>
            </View>
            <View style={styles.calendar}>
              <View style={styles.icon}>
                <Icon name="clock-o" size={30} color="orange" />
              </View>
              <Text style={styles.text}>{sched[0].start_time}</Text>
            </View>
            <View style={styles.fromto}>
              <Text style={styles.text}>To</Text>
            </View>
            <View style={styles.calendar}>
              <View style={styles.icon}>
                <Icon name="clock-o" size={30} color="orange" />
              </View>
              <Text style={styles.text}>{handleConvertTime(sched[0].start_time, sched[0].duration)}</Text>
            </View>
          </View>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              onPress={() => handleAcceptBtn(sched[0].id)}
              style={styles.button}
            >
              <Text style={styles.buttonText1}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDenyBtn(sched[0].id)}
              style={styles.button}
            >
              <Text style={styles.buttonText1}>Deny</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerRecommend: {
    flex: 6,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#FFDBE7",
  },
  matchtype: {
    flex: 0.6,
    flexGrow: 0.6,
    width: "80%",
    backgroundColor: "#FEC9C3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginLeft: 30,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D2C6E6",
    borderStyle: "solid",
    padding: 5,
  },
  matchtypeText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  calendar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 15,
  },
  icon: {
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    height: 50,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "black",
  },
  fromto: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 30,
  },
  buttoncontainer: {
    flex: 3,
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#20B2AA",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
