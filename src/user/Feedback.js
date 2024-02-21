import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native"; //animation
import Icon from "react-native-vector-icons/FontAwesome"; //icons
import Slider from "@react-native-community/slider";
import SportSchedRepo from "../repositories/SportSchedRepo";
import CustomerRepo from "../repositories/CustomerRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const { width, height } = Dimensions.get("screen");
export default Feedback = function ({ route, navigation }) {
  const id = route.params.id;
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone_number: "",
  });
  const date1 = moment();
  const formattedDate1 = date1.format("DD-MM-YYYY");
  const handleSubmit = () => {
    SportSchedRepo.updateSportSchedByID(
      title,
      value,
      formattedDate1,
      comment,
      id
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error updating schedule:", error);
      });
      navigation.navigate("Calendar Management");
    };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("CustomerID").then((val) => {
        if (val) {
          CustomerRepo.getCustomerByID(val)
            .then((result) => {
              setCustomer(result);
            })
            .catch((error) => {
              console.error("Error fetching customer:", error);
            });
          SportSchedRepo.getSportSchedByID(val)
            .then((result) => {
              setComment(result.feedback_comment);
              setTitle(result.feedback_title);
              setValue(Number(result.feedback_exp));
              setDateTime(result.feedback_date_time);
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

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../assets/feedback2.json")}
        autoPlay={true}
        loop
        speed={1}
        style={styles.logo1}
      />
      <View style={styles.time1}>
        <Text style={styles.date}>{dateTime}</Text>
      </View>
      <View style={styles.mainbox}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.container1}>
            <Text style={styles.text_name}>Name</Text>
            <View style={styles.phone}>
              <TextInput
                placeholder="Lumine"
                placeholderTextColor="gray"
                style={{ flex: 1, paddingVertical: 0, fontSize: 13 }}
                value={customer.name}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
          <View style={styles.container1}>
            <Text style={styles.text_name}>Phone Number</Text>
            <View style={styles.phone}>
              <TextInput
                placeholder="+ 91 00000 00000"
                placeholderTextColor="gray"
                style={{ flex: 1, paddingVertical: 0, fontSize: 13 }}
                value={customer.phone_number}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.container1}>
          <Text style={styles.text_name}>Title Feedback</Text>
          <View style={styles.phone1}>
            <TextInput
              placeholder="title"
              placeholderTextColor="gray"
              style={{ flex: 1, paddingVertical: 0, fontSize: 13 }}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <Text style={styles.text_name}>Share your experience scaling</Text>
          {value < 20 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../img/worst.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/Notgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/fine1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/lookgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/love1.png")}
                style={styles.logo}
              />
            </View>
          ) : null}
          {value >= 20 && value < 40 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../img/worst2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/Notgood2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/fine1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/lookgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/love1.png")}
                style={styles.logo}
              />
            </View>
          ) : null}
          {value >= 40 && value < 60 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../img/worst2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/Notgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/fine2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/lookgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/love1.png")}
                style={styles.logo}
              />
            </View>
          ) : null}
          {value >= 60 && value < 80 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../img/worst2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/Notgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/fine1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/lookgood2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/love1.png")}
                style={styles.logo}
              />
            </View>
          ) : null}
          {value >= 80 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Image
                source={require("../../img/worst2.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/Notgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/fine1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/lookgood1.png")}
                style={styles.logo}
              />
              <Image
                source={require("../../img/love2.png")}
                style={styles.logo}
              />
            </View>
          ) : null}
          <Slider
            style={{ width: 0.9 * width }}
            minimumTrackTintColor={"#105955"}
            minimumValue={0}
            maximumValue={100}
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
          />
        </View>

        <View style={styles.container1}>
          <View style={{ justifyItems: "center" }}>
            <TextInput
              style={{
                borderWidth: 1,
                paddingLeft: 10,
                borderRadius: 20,
                height: height * 0.1,
                width: width * 0.9,
              }}
              placeholder="Add your comments..."
              placeholderTextColor="gray"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
        <Text style={styles.buttonText1}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  logo1: {
    width: width * 0.8,
    height: height * 0.25,
  },
  time1: {
    borderRadius: 30,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 30,
    backgroundColor: "#ffe2e2",
    fontWeight: "bold",
    fontSize: 10,
  },
  date: {
    fontWeight: "bold",
  },
  logo: {
    width: width * 0.14,
    height: height * 0.06,
  },

  container1: {
    flexDirection: "column",
    marginBottom: 10,
  },
  text_name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2071B2",
    marginBottom: 10,
    marginLeft: 5,
  },
  mainbox: {
    width: width * 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 40,
    justifyContent: "space-between",
    alignContent: "space-between",
    padding: 10,
  },
  phone: {
    flexDirection: "row",
    borderColor: "#deacac",
    borderWidth: 1,
    padding: 10,
    width: width * 0.4,
    backgroundColor: "#FFF9F9",
    borderRadius: 10,
    marginBottom: 10,
  },
  phone1: {
    flexDirection: "row",
    borderColor: "#deacac",
    borderWidth: 1,
    padding: 10,
    width: width * 0.945,
    backgroundColor: "#FFF9F9",
    borderRadius: 10,
    marginBottom: 10,
  },
  button1: {
    marginTop: 5,
    backgroundColor: "#20B2AA",
    padding: 10,
    width: 181.28,
    height: 38,
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
});
