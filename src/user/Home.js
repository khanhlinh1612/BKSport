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
import CustomerRepo from "../repositories/CustomerRepo";
import AdminRepo from "../repositories/AdminRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
const render_calendar = (weekday, start, end) => {
  return (
    <View style={styles.calendar_list}>
      <Icon
        name="calendar"
        size={20}
        color="#ffffff"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.text_list}>{weekday}</Text>
      <Text style={styles.text_list1}>
        {start} - {end}
      </Text>
    </View>
  );
};
export default Home = function ({ navigation }) {

  const [info, setInfo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  // console.log(info);

  const getData = () => {
    try {
      AsyncStorage.getItem("CustomerID").then((val) => {
        if (val) {
          CustomerRepo.getCustomerByID(val)
            .then((result) => {
              setInfo(result);
            })
            .catch((error) => {
              console.error("Error fetching customer:", error);
            });
        }
      });
      AsyncStorage.getItem("AdminID").then((val) => {
        if (val) {
          AdminRepo.getAdminByID(val)
            .then((result) => {
              setInfo(result);
            })
            .catch((error) => {
              console.error("Error fetching admin:", error);
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
      source={require("../../img/background4.jpg")}
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
        <View style={styles.box_scheduleTitle}>
          <Text style={styles.scheduleTitle}>This week's schedule</Text>
        </View>
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleList}>
            {/* render list of schedules */}
            {render_calendar("Monday", "12:00", "13:30")}
            {render_calendar("Wednesday", "09:00", "10:30")}
            {render_calendar("Friday", "15:30", "17:00")}
            {render_calendar("Saturday", "07:00", "08:30")}
            <TouchableOpacity
              onPress={() => navigation.navigate("Calendar Management")}
              style={{
                flexDirection: "row",
                marginLeft: 140,
                marginBottom: 15,
              }}
            >
              <Text style={styles.Text_page}>Show my calendar</Text>
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
    width: 150,
    height: 150,
    borderRadius: 75,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  avatar: {
    width: 200,
    height: 260,
    borderRadius: 50,
  },
  userInfoContainer: {
    marginTop: 10,
  },
  userName: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8E4F",
    justifyContent: "center",
    paddingBottom: 22,
  },
  scheduleContainer: {
    marginTop: 40,
  },
  box_scheduleTitle: {
    flex: 0.2,
    width: "100%",
    backgroundColor: "#FFCCD2",
    height: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleTitle: {
    justifyContent: "center",
    fontSize: 16,
    color: "#B53939",
    fontWeight: "bold",
  },
  scheduleList: {
    // style for schedule list
    borderRadius: 50,
    paddingLeft: 30,
  },
  button1: {
    marginTop: 25,
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
