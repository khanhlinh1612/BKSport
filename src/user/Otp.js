import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import SportSchedRepo from "../repositories/SportSchedRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default OTP = function ({ navigation }) {
  const [sched, setSched] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleCheckTime = (date_time, start_time) => {
    var time = new Date();
    time = JSON.stringify(time);
    time = time.slice(1, -1);
    var year = Number(time.substring(0, 4));
    var month = Number(time.substring(5, 7));
    var date = Number(time.substring(8, 10));
    var hour = Number(time.substring(11, 13));
    var minute = Number(time.substring(14, 16));
    var reserved_date = date_time.split("-");
    var reserved_time = start_time.split(":");

    hour = hour - 17;
    if (hour < 0) {
      hour += 24;
    }

    minute = minute + hour * 60;

    var reserved_minute = Number(reserved_time[1]) + Number(reserved_time[0]) * 60;

    if (
      year === Number(reserved_date[2]) &&
      month === Number(reserved_date[1]) &&
      date === Number(reserved_date[0]) &&
      minute >= reserved_minute - 5 &&
      minute <= reserved_minute
    ) {
      return true;
    }
    return false;
  };

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

  const RenderEmptyOTP = () => {
    return (
      <View style={styles.matchtype}>
        <Text style={styles.matchtypeText}>Currently there is no OTP code</Text>
      </View>
    );
  };

  const handleAccept = (id) => {
    SportSchedRepo.updateVerificationByID(id)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
    navigation.navigate("Home");
  }

  const RenderNotEmptyOTP = () => {
    var list = [];
    sched.map((item) => {
      let flag = handleCheckTime(item.date_time, item.start_time);
      if (flag) {
        list.push(
          <SafeAreaView style={styles.container}>
            <View style={styles.lottielogo}>
              <LottieView
                source={require("../../assets/otp.json")}
                autoPlay
                loop
                speed={1}
                style={styles.logo}
              />
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.text}> Verify that it's you </Text>
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                onPress={() => handleAccept(item.id)}
                style={styles.button}
              >
                <Text style={styles.buttonText1}>Accept</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }
    });
    if (list.length !== 0) {
      return list[0];
    }
    return <RenderEmptyOTP />;
  };

  return (
    <React.Fragment>
      {sched.length === 0 ? <RenderEmptyOTP /> : <RenderNotEmptyOTP />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  lottielogo: {
    flex: 4,
  },
  logo: {
    width: 400,
    height: 400,
  },
  textcontainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Arial",
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  buttoncontainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF621F",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText1: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
