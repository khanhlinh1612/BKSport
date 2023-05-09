import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminRepo from "../repositories/AdminRepo";
import PumpSchedRepo from "../repositories/PumpSchedRepo";

export default Home_Admin = function ({ navigation }) {
  const url3 =
    "https://io.adafruit.com/api/v2/doanladeproject/feeds/light/data?limit=1";
  const date1 = moment();
  const formattedDate1 = date1.format("dddd, D MMMM YYYY");
  const [light, setlight] = useState(null);
  useEffect(() => {
    const fetchData2 = async () => {
      const response2 = await axios.get(url3);
      const jsonData2 = response2.data;
      const latestData2 = jsonData2[jsonData2.length - 1];
      const light = latestData2.value;
      setlight(light);
    };

    fetchData2();

    const intervalId2 = setInterval(fetchData2, 15000); // 5 minutes

    return () => clearInterval(intervalId2);
  }, []);

  const [info, setInfo] = useState(null);
  const [sched, setSched] = useState([]);

  const handleTime = (start_time, duration, flag) => {
    var time = start_time.substring(0, 5);
    if (flag) {
      return time;
    }
    const startArray = time.split(":");
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
    return hour + ":" + minute;
  };

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

    if (year > Number(reserved_date[2])) {
      return false;
    }
    if (year === Number(reserved_date[2]) && month > Number(reserved_date[1])) {
      return false;
    }
    if (
      year === Number(reserved_date[2]) &&
      month === Number(reserved_date[1]) &&
      date > Number(reserved_date[0])
    ) {
      return false;
    }
    if (
      year === Number(reserved_date[2]) &&
      month === Number(reserved_date[1]) &&
      date === Number(reserved_date[0]) &&
      hour > Number(reserved_time[0])
    ) {
      return false;
    }
    if (
      year === Number(reserved_date[2]) &&
      month === Number(reserved_date[1]) &&
      date === Number(reserved_date[0]) &&
      hour === Number(reserved_time[0]) &&
      minute > Number(reserved_time[1])
    ) {
      return false;
    }
    return true;
  };

  const RenderCalendar = () => {
    var list = [];
    sched.map((item, index) => {
      let flag = handleCheckTime(item.date_time, item.start_time);
      if (flag) {
        list.push(
          <View style={styles.calendar_list} key={index}>
            <Icon
              name="calendar"
              size={20}
              color="#ffffff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.text_list}>{item.date_time}</Text>
            <Text style={styles.text_list1}>
              {handleTime(item.start_time, item.duration, true)} -{" "}
              {handleTime(item.start_time, item.duration, false)}
            </Text>
          </View>
        );
      }
    });
    if (list.length > 6) {
      list = list.slice(0, 5);
    }
    return list;
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("AdminID").then((val) => {
        if (val) {
          AdminRepo.getAdminByID(val)
            .then((result) => {
              setInfo(result);
            })
            .catch((error) => {
              console.error("Error fetching admin:", error);
            });
          PumpSchedRepo.getPumpSchedByAdminID(val)
            .then((result) => {
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("./../../img/background4.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <LottieView
            source={require("../../assets/avatar.json")}
            autoPlay
            loop
            speed={0.5}
            style={styles.avatar}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{info ? info.name : ""}</Text>
        </View>
        <View style={styles.time1}>
          <Text style={styles.date}>{formattedDate1}</Text>
        </View>
        <View style={styles.box_scheduleTitle}>
          <Image
            source={require("./../../img/lighting.png")}
            style={styles.humid_img}
          />
          <Text style={styles.scheduleTitle}>
            Light status:{" "}
            <Text>
              {light ? (
                <Text>{light}</Text>
              ) : (
                <Text style={styles.script}>Loading...</Text>
              )}{" "}
              %
            </Text>
          </Text>
        </View>
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleList}>
            <RenderCalendar />
            <TouchableOpacity
              onPress={() => navigation.navigate("Watering System")}
              style={{
                flexDirection: "row",
                marginLeft: 140,
                marginBottom: 15,
              }}
            >
              <Text style={styles.Text_page}>Pump schedule</Text>
              <Icon
                name="arrow-right"
                size={20}
                color={"#ffffff"}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleLogout()} style={styles.button1}>
          <Text style={styles.buttonText1}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  calendar_list: {
    color: "#ffffff",
    flexDirection: "row",
    marginBottom: 10,
  },
  humid_img: {
    height: 30,
    width: 20,
    marginRight: 10,
  },
  text_list: {
    marginRight: 80,
    color: "#FF8E4F",
    fontWeight: "bold",
    width: 90,
  },
  text_list1: {
    color: "#FF8E4F",
    fontWeight: "bold",
  },
  spacer: {
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 200,
    height: 260,
    borderRadius: 50,
  },
  userInfoContainer: {
    marginTop: 10,
  },
  time1: {
    borderRadius: 30,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 40,
    backgroundColor: "#ffccd2",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },
  date: {
    fontWeight: "bold",
    color: "#ff5768",
  },
  userName: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8E4F",
    justifyContent: "center",
    paddingBottom: 10,
  },
  scheduleContainer: {
    marginTop: 40,
  },
  box_scheduleTitle: {
    flex: 0.2,
    width: "100%",
    backgroundColor: "#FFCCD2",
    flexDirection: "row",
    height: 10,
    padding: 10,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleTitle: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  scheduleList: {
    // style for schedule list
    borderRadius: 50,
    paddingLeft: 30,
  },
  button1: {
    marginTop: 15,
    backgroundColor: "#B53939",
    padding: 10,
    width: 181.28,
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 49,
    gap: 10,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  Text_page: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 30,
    marginTop: 5,
    color: "#fff",
  },
});
