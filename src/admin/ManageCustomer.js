import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomerRepo from "../repositories/CustomerRepo";

import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("screen");
export default function ManageCustomer({ navigation }) {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      CustomerRepo.getAllCustomer()
        .then((result) => {
          console.log(customer);
          setCustomer(result);
        })
        .catch((error) => {
          console.error("Error fetching customer:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const alert_delete = (id) => {
    Alert.alert("Warning", "Are you sure you want to delete this user? ", [
      {
        text: "OK",
        onPress: (id) => {
          try {
            CustomerRepo.deleteCustomerByID(id)
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error("Error deleting customer:", error);
              });
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Customer's Detail", { id: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity onPress={alert_delete} style={{flexDirection:'column' , alignContent:'flex-end', marginLeft:0.48*width}}>
              <Icon name="close" size={25}  color="#900" />
              </TouchableOpacity>
            
        </View>

        <View style={styles.nextMatch}>
          <Text style={styles.nextMatchText}>{item.phone_number}</Text>
          <Text style={styles.nextMatchTime}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatlistView}>
        <FlatList
          data={customer}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  flatlistView: {
    flex: 1,
    marginTop: 40,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: "#E1ECE9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Arial",
  },
  nextMatch: {
    flexDirection: "row",
  },
  nextMatchText: {
    color: "#555",
    marginRight: 5,
    fontFamily: "Arial",
    fontSize: 14,
  },
  nextMatchTime: {
    marginLeft: 20,
    color: "#8E8E93",
  },
});
