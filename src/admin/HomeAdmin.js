import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import axios from 'axios';
const render_calendar = (weekday,start,end) => {

  return (
    <View style={styles.calendar_list}>
      <Icon name="calendar" size={20} color="#ffffff" style={{marginRight: 10}} />
      <Text style={styles.text_list}>
        {weekday}
      </Text>
      <Text style={styles.text_list1}>
        {start} - {end}
      </Text>
    </View>
  );
};
export default Home_Admin = function({navigation}){
    const url3 = 'https://io.adafruit.com/api/v2/doanladeproject/feeds/light/data?limit=1';
    const date1 = moment();
    const formattedDate1 = date1.format('dddd, D MMMM YYYY');
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
    return (
    <ImageBackground source={require('./../../img/background4.jpg')} style={styles.background}>
        <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <LottieView source={require('../../assets/avatar.json')} autoPlay loop speed={0.5} style={styles.avatar} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Admin</Text>
      </View>
      <View style={styles.time1}><Text style={styles.date}>{formattedDate1}</Text></View>
      <View style={styles.box_scheduleTitle}>
            <Image source={require('./../../img/lighting.png')} style={styles.humid_img} />
            <Text style={styles.scheduleTitle}>Light status:  <Text>{light ? <Text>{light}</Text> : <Text style={styles.script}>Loading...</Text>} %</Text></Text>
      </View>
      <View style={styles.scheduleContainer}>
        
        
        <View style={styles.scheduleList}>
          {/* render list of schedules */}
          {render_calendar('Monday','12:00','13:30')}
          {render_calendar('Wednesday','09:00','10:30')}
          {render_calendar('Friday','15:30','17:00')}
          {render_calendar('Saturday','07:00','08:30')}
          <TouchableOpacity onPress={() => navigation.navigate('Watering System')} style={{flexDirection:'row', marginLeft:140, marginBottom:15}}>
          <Text style={styles.Text_page}>Pump schedule</Text>
          <Icon name="arrow-right" size={20} color={'#ffffff'} style={{marginLeft: 10}} />
      </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button1}>
          <Text style={styles.buttonText1}>Log out</Text>
      </TouchableOpacity>
      
    </View>
      
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  calendar_list: {
    color:'#ffffff',
    flexDirection: "row",
    marginBottom:10,
  },
  humid_img:{
    height:30,
    width:20,
    marginRight:10,
  },
  text_list:{
    marginRight: 80,
    color:'#FF8E4F',
    fontWeight:'bold',
    width:90,
  },
  text_list1:{
    color:'#FF8E4F',
    fontWeight:'bold',
  },
  spacer: {
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
    marginBottom:10,
  },
  avatar: {
    width: 200,
    height: 260,
    borderRadius: 50,
  },
  userInfoContainer: {
    marginTop: 10,
  },
  time1:{

    borderRadius:30,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:250,
    height: 40,
    backgroundColor: '#ffccd2',
    fontWeight:'bold',
    fontSize:12,
    marginBottom:10,
  },
  date:{
    fontWeight:'bold',
    color: '#ff5768',
  },
  userName: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8E4F',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  scheduleContainer: {
    marginTop: 40,
  },
  box_scheduleTitle:{
    flex:0.2,
    width: '100%',
    backgroundColor: '#FFCCD2',
    flexDirection:'row',
    height:10,
    padding:10,
    paddingLeft: 15,
    justifyContent:'center',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  scheduleList: {
    // style for schedule list
    borderRadius:50,
    paddingLeft:30,
  },
  button1: {
    marginTop:15,
    backgroundColor: '#B53939',
    padding: 10,
    width: 181.28,
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 49,
    gap: 10,
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
    
  },
  Text_page:{
    fontSize: 16,
    fontWeight:'600',
    marginLeft:30,
    marginTop:5,
    color:'#fff',
  },
});


