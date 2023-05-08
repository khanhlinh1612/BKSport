import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default SuggestCalendar = function ({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerRecommend}>
        <View style={styles.matchtype}>
          <Text style={styles.matchtypeText}>Friendly match</Text>
        </View>
        
        
        <View style={styles.calendar}>
          <View style={styles.icon}>
            <Icon name="tag" size={30} color="#00559A" />
          </View>
          <Text style={styles.text}>Schedule_2</Text>
        </View>
        <View style={styles.calendar}>
          <View style={styles.icon}>
            <Icon name="calendar" size={30} color="#00559A" />
          </View>
          <Text style={styles.text}> Wed 15, March, 2023</Text>
        </View>
        <View style={styles.fromto}>
          <Text style={styles.text}>From</Text>
        </View>
        <View style={styles.calendar}>
          <View style={styles.icon}>
            <Icon name="clock-o" size={30} color="orange" />
          </View>
          <Text style={styles.text}> 09:30 AM</Text>
        </View>
        <View style={styles.fromto}>
          <Text style={styles.text}>To</Text>
        </View>
        <View style={styles.calendar}>
          <View style={styles.icon}>
            <Icon name="clock-o" size={30} color="orange" />
          </View>
          <Text style={styles.text}> 10:30 AM</Text>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText1}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText1}>Deny</Text>
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
    width: "60%",
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
    padding:5,
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
    backgroundColor: '#20B2AA',
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
