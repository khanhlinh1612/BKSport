import React from "react";
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
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("screen");
class FeedbackDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  render() {
    const info = this.props.route.params.info;
    var sched = this.props.route.params.sched;
    const schedID = this.props.route.params.id;

    this.props.route.params.sched.map((item) => {
      if(item.id === schedID) {
        sched = item;
      }
    });

    return (
      <SafeAreaView style={styles.container}>
        <LottieView
          source={require("../../assets/feedback2.json")}
          autoPlay={true}
          loop
          speed={1}
          style={styles.logo1}
        />
        <View style={styles.mainbox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.container1}>
              <Text style={styles.text_name}>Name</Text>
              <View style={styles.phone}>
                <Text>{info.name}</Text>
              </View>
            </View>
            <View style={styles.container1}>
              <Text style={styles.text_name}>Phone Number</Text>
              <View style={styles.phone}>
                <Text>{info.phone_number}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container1}>
            <Text style={styles.text_name}>Title Feedback</Text>
            <View style={styles.title}>
              <Text>{sched.feedback_title}</Text>
            </View>
          </View>
          <View style={styles.container1}>
            <Text style={styles.text_name}>Experience scaling</Text>
            {Number(sched.feedback_exp) < 20 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
            {Number(sched.feedback_exp) >= 20 && Number(sched.feedback_exp) < 40 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
            {Number(sched.feedback_exp) >= 40 && Number(sched.feedback_exp) < 60 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
            {Number(sched.feedback_exp) >= 60 && Number(sched.feedback_exp) < 80 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  source={require("../../img/lookgood2.png")}
                  style={styles.logo}
                />
                <Image
                  source={require("../../img/love1.png")}
                  style={styles.logo}
                />
              </View>
            ) : null}
            {Number(sched.feedback_exp) >= 80 ? (
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
          </View>

          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: true })}
              style={{
                justifyItems: "center",
                borderWidth: 1,
                padding: 10,
                borderRadius: 20,
                height: height * 0.15,
                width: width * 0.945,
                backgroundColor: "#FFF9F9",
              }}
            >
              <Text numberOfLines={5}> {sched.feedback_comment}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}> {sched.feedback_comment}</Text>
            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: false })}
            >
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text
          style={{
            fontSize: 16,
            color: "#000",
            fontWeight: 400,
            marginTop: 4,
            marginLeft: 130,
          }}
        >
          Date: {sched.feedback_date_time}
        </Text>
      </SafeAreaView>
    );
  }
}
export default FeedbackDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  logo1: {
    width: width * 0.8,
    height: height * 0.27,
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
  title: {
    flexDirection: "row",
    borderColor: "#deacac",
    borderWidth: 1,
    padding: 10,
    width: width * 0.945,
    backgroundColor: "#FFF9F9",
    borderRadius: 10,
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#FFF9F9",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: "auto",
    fontWeight: 400,
    marginBottom: 10,
  },
  closeButton: {
    color: "#007AFF",
    fontSize: 16,
  },
});
