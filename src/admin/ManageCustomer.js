import React from "react";
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
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("screen");
export default function ManageCustomer({ navigation }) {
  const alert_delete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete this user? ',
  [   { text: 'OK', onPress: () => console.log('OK Pressed') }  ]
    );
  }
  const DATA = [
    {
      id: "1",
      name: "User 1",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Tuesday, 09:30 AM",
    },
    {
      id: "2",
      name: "User 2",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Wednesday, 10:00 AM",
    },
    {
      id: "3",
      name: "User 3",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Thursday, 11:00 PM",
    },
    {
      id: "4",
      name: "User 4",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Tuesday, 09:30 AM",
    },
    {
      id: "5",
      name: "User 5",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Wednesday, 10:00 AM",
    },
    {
      id: "6",
      name: "User 6",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Thursday, 11:00 PM",
    },
    {
      id: "7",
      name: "User 7",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Tuesday, 09:30 AM",
    },
    {
      id: "8",
      name: "User 8",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Wednesday, 10:00 AM",
    },
    {
      id: "9",
      name: "User 9",
      avatar: "https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-dep-chat-nu-390x390.jpg",
      nextMatch: "Thursday, 11:00 PM",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Customer's Detail")}
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
          <Text style={styles.nextMatchText}>Next match</Text>
          <Text style={styles.nextMatchTime}>{item.nextMatch}</Text>
        </View>
        
      </View>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatlistView}>
        <FlatList
          data={DATA}
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
    flexDirection:'column',
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
