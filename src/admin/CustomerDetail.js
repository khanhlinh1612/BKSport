import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";
import CustomerRepo from "../repositories/CustomerRepo";

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

export default CustomerDetail = function ({ route, navigation }) {

  const customerID = route.params.id;

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      CustomerRepo.getCustomerByID(customerID)
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

  return (
    <ImageBackground
      source={require("../../img/background2.jpg")}
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
          <Text style={styles.userName}>{customer ? customer.name : ""}</Text>
        </View>

        <View style={styles.scheduleList}>
          {/* render list of schedules */}
          {render_calendar("user", "Username", customer ? customer.name : "")}
          {render_calendar("envelope", "Email", customer ? customer.email : "")}
          {render_calendar("phone", "Phone number", customer ? customer.phone_number : "")}
          {render_calendar("lock", "Password", customer ? customer.password : "")}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Customer's Calendar", { id: customerID })}
          style={{ flexDirection: "row", marginLeft: 140, marginBottom: 15 }}
        >
          <Text style={styles.Text_page}>Show customer calendar</Text>
          <Icon
            name="arrow-right"
            size={20}
            color={"#ffffff"}
            style={{ marginLeft: 10 }}
          />
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
