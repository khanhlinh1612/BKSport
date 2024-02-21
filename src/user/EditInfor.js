import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import LottieView from "lottie-react-native"; //animation
import Icon from "react-native-vector-icons/FontAwesome"; //icons
import CustomerRepo from "../repositories/CustomerRepo";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");
export default EditInfor = function ({ navigation }) {

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("CustomerID").then((val) => {
        if (val) {
          CustomerRepo.getCustomerByID(val)
            .then((result) => {
              setUsername(result.name);
              setPhone(result.phone_number);
              setEmail(result.email);
              setPassword(result.password);
              setConfirmPassword(result.password);
              setCustomerId(result.id);
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUpdate = () => {
    var flag = false;

    if (
      phone === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      alert("Please enter all register infomation");
      return;
    }

    if (password !== confirmpassword) {
      alert("The password confirmation does not match!");
      return;
    }

    if (flag) {
      return;
    }

    if (
      isNaN(phone) ||
      phone.includes("e") ||
      phone.includes(".") ||
      phone.length < 10 ||
      phone.length > 11
    ) {
      alert("Invalid phone number!");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email!");
      return;
    }

    if (customerId !== "") {
      CustomerRepo.updateCustomer(username, phone, password, email, customerId)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    }

    alert("Update successfully!");
    navigation.navigate("Information", {render: true});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainbox}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder={username}
          value={username}
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.label}>Phone number:</Text>
        <TextInput
          style={styles.input}
          placeholder={phone}
          value={phone}
          onChangeText={(newText) => setPhone(newText)}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder={email}
          value={email}
          onChangeText={(newText) => setEmail(newText)}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder={password}
          value={password}
          onChangeText={(newText) => setPassword(newText)}
        />
        <Text style={styles.label}>Confirm password:</Text>
        <TextInput
          style={styles.input}
          placeholder={confirmpassword}
          secureTextEntry
          value={confirmpassword}
          onChangeText={(newText) => setConfirmPassword(newText)}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff8c4d",
  },
  logo: {
    width: 400,
    height: 250,
  },
  mainbox: {
    marginTop: 20,
    height: height * 0.8,
    width: width * 0.85,
    backgroundColor: "white",
    marginBottom: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  label: {
    flexDirection: "column",
    marginBottom: 10,
    color: "#A68787",
    fontWeight: "bold",
  },
  input: {
    flexDirection: "row",
    borderColor: "#deacac",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFF9F9",
    borderRadius: 10,
    marginBottom: 25,
  },
  button: {
    marginTop: 5,
    backgroundColor: "#20B2AA",
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
    alignSelf: "center",
  },
});
