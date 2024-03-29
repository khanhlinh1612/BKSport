import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import CustomerRepo from "../repositories/CustomerRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";
const render_calendar = (iconname, name, value) => {
  return (
    <View style={styles.infor_list}>
      <Icon
        name={iconname}
        size={30}
        color="#ffffff"
        style={{ marginRight: 10, width: 30 }}
      />
      <View style={{ flexDirection: "column", marginLeft: 10 }}>
        <Text style={styles.text_list}>{name}</Text>
        <Text style={styles.text_list1}>{value}</Text>
      </View>
    </View>
  );
};
export default Information = function ({ route, navigation }) {

  const [info, setInfo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [route.params]);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../img/background9.jpg")}
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

        <View style={styles.scheduleList}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit Infor")}
            style={{ flexDirection: "row", marginLeft: 120 }}
          >
            <Icon
              name="pencil-square-o"
              size={20}
              color={"#fff"}
              style={{ marginRight: 0 }}
            />
            <Text style={styles.Text_page}>Edit Information</Text>
          </TouchableOpacity>
          {render_calendar("user", "Username", info ? info.name : "")}
          {render_calendar("envelope", "Email", info ? info.email : "")}
          {render_calendar("phone", "Phone number", info ? info.phone_number : "")}
          {render_calendar("lock", "Password", info ? info.password : "")}
        </View>
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
  infor_list: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    marginTop: 13,
  },
  text_list: {
    marginRight: 100,
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  text_list1: {
    marginTop: 13,
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
    marginTop: 20,
  },
  userName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8E4F",
    justifyContent: "center",
    paddingBottom: 15,
  },

  scheduleList: {
    // style for schedule list
    borderRadius: 50,
    marginBottom: 20,
    paddingTop: 20,
    flexDirection: "column",
  },

  Text_page: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    color: "#fff",
    paddingBottom: 10,
  },
});
