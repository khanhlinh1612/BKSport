import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image , Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const url1 = 'https://io.adafruit.com/api/v2/doanladeproject/feeds/temp/data?limit=1';
const url2 = 'https://io.adafruit.com/api/v2/doanladeproject/feeds/humid/data?limit=1';
const url3 = 'https://io.adafruit.com/api/v2/doanladeproject/feeds/light/data?limit=1';
export default function Weather() {
  const navigation = useNavigation();
  const [temparature, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url1);
      const jsonData = response.data;
      const latestData = jsonData[jsonData.length - 1];
      const temp = latestData.value;
      setData(temp);
    };
    
    fetchData();

    const intervalId = setInterval(fetchData, 15000); // 5 minutes

    return () => clearInterval(intervalId);
  }, []);
  const [humid, sethumid] = useState(null);
  useEffect(() => {
    const fetchData1 = async () => {
      const response1 = await axios.get(url2);
      const jsonData1 = response1.data;
      const latestData1 = jsonData1[jsonData1.length - 1];
      const humid = latestData1.value;
      sethumid(humid);
    };
    
    fetchData1();

    const intervalId1 = setInterval(fetchData1, 15000); // 1 minutes

    return () => clearInterval(intervalId1);
  }, []);

  const [light, setlight] = useState(null);
  useEffect(() => {
    const fetchData2 = async () => {
      const response2 = await axios.get(url3);
      const jsonData2 = response2.data;
      const latestData2 = jsonData2[jsonData2.length - 1];
      const light = latestData2.value;
      setlight(light);
    };
    
    fetchData2();

    const intervalId2 = setInterval(fetchData2, 15000); // 5 minutes

    return () => clearInterval(intervalId2);
  }, []);
  const date1 = moment();
  const formattedDate1 = date1.format('dddd, D MMMM YYYY');
  const [date,setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{date.toLocaleTimeString()}</Text>
      <View style={styles.time1}><Text style={styles.date}>{formattedDate1}</Text></View>
      <View style={styles.box}>
        <LottieView source={require('./../assets/animation.json')} autoPlay loop speed={0.5}  style={styles.logo} />
       
        {temparature > 33 ? <Text>It's quite hot today</Text> : (temparature < 20 ? <Text>It's quite cold today</Text>: null)}
        {(temparature > 20 && temparature <33 && humid > 40 && humid < 70) ? <Text>It's great for a football game</Text>: null }
        {humid == 100 ? <Text>It's raining</Text>:null}
        <Text style={styles.temp}>{temparature ? <Text>{temparature}</Text> : <Text style={styles.script}>Loading...</Text>}{'\u00b0'}C</Text>
      </View>
      <View style={styles.box1}>
        <View style={styles.humid}>
          <Image source={require('./../img/humid.png')} style={styles.humid_img} />
          <Text style={styles.humid_value}>{humid ? <Text>{humid}</Text> : <Text style={styles.script}>Loading...</Text>}%</Text>
          <Text style={styles.humid_script}>Humidity</Text>
        </View>
        <View style={styles.humid}>
          <Image source={require('./../img/lighting.png')} style={styles.humid_img} />
          <Text style={styles.humid_value}>{light ? <Text>{light}</Text> : <Text style={styles.script}>Loading...</Text>} %</Text>
          <Text style={styles.humid_script}>Lighting</Text>
        </View>
        <View style={styles.humid}>
          <Image source={require('./../img/tempa.png')} style={styles.humid_img} />
          <Text style={styles.humid_value}>{temparature ? <Text>{temparature}</Text> : <Text style={styles.script}>Loading...</Text>}{'\u00b0'}C</Text>
          <Text style={styles.humid_script}>Temperature</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8eafa',
    alignItems: 'center',
  },
  time:{
    fontSize:43,
    fontWeight:'bold',
    marginTop: 50,
    color: '#ff5768',
  },
  time1:{
    marginTop:20,
    borderRadius:30,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:250,
    height: 40,
    backgroundColor: '#ffccd2',
    fontWeight:'bold',
    fontSize:10,
  },
  date:{
    fontWeight:'bold',
  },
  box:{
    backgroundColor: '#ddbbff',
    alignItems: 'center',
    height: 300,
    width: 300,
    borderRadius:30,
  },
  logo: {
    marginTop:20,
    width: 300,
    height: 150,
    marginBottom: 40,
  },
  temp:{
    marginTop:5,
    fontSize:50,
    color: '#FFFFFF',
  },
  box1:{
    marginTop:80,
    width:300,
    borderRadius:20,
    height:100,
    backgroundColor:'#FFA665',
    flexDirection: 'row', // Đặt phần tử con sẽ hiển thị dưới dạng flex row
    alignItems: 'center', // Canh giữa phần tử con theo trục Y
    marginBottom:10,
  },
  humid:{
    height:50,
    width:100,
    flexDirection: 'column', // Đặt phần tử con sẽ hiển thị dưới dạng flex row
    alignItems: 'center', // Canh giữa phần tử con theo trục Y
    justifyContent: 'center', // Canh giữa phần tử con theo trục x
  },

  humid_img:{
    height:30,
    width:30,
  },
  humid_value:{
    color:'#FFFFFF',
    marginTop:10,
    fontWeight:'bold',
  },
  humid_script:{
    color:'#333333',
    fontWeight:'bold',
    fontSize:11,
    marginTop:5,
  },
  script:{
    fontSize:10,
  },
});