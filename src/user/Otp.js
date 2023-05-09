import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";

export default OTP = function ({ navigation }) {

  const RenderEmptyOTP = () => {
    return(
      <View style={styles.matchtype}>
        <Text style={styles.matchtypeText}>
        Currently there is no OTP code</Text>
      </View>
    )
  }

  return (
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
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText1}>Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
