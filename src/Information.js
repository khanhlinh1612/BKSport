import React from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity,ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
const render_calendar = (iconname,name,value) => {
  return (
    <View style={styles.infor_list}>
      <Icon name={iconname} size={30} color="#ffffff" style={{marginRight: 10, width: 30} } />
      <View style={{flexDirection:'column', marginLeft:10}}>
            <Text style={styles.text_list}>
                {name}
            </Text>
            <Text style={styles.text_list1}>
                {value}
            </Text>
      </View>
      
    </View>
  );
};
export default Information = function({navigation}){
  return (
    
    <ImageBackground source={require('./../img/background9.jpg')} style={styles.background}>
        <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <LottieView source={require('./../assets/avatar.json')} autoPlay loop speed={0.5} style={styles.avatar} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Lumine</Text>
      </View>
        
        <View style={styles.scheduleList}>
          {/* render list of schedules */}
          <TouchableOpacity onPress={() => navigation.navigate('Edit Infor')} style={{flexDirection:'row', marginLeft:120}}>
            <Icon name="pencil-square-o" size={20} color={'#fff'} style={{marginRight:0}} />
            <Text style={styles.Text_page}>Edit Information</Text>
          </TouchableOpacity>
          {render_calendar('user','Username','Lumine')}
          {render_calendar('envelope','Email','lumine@gmail.com')}
          {render_calendar('phone','Phone number','0123456789')}
          {render_calendar('lock','Password','lumine123')}
        </View>
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
  infor_list: {

    flexDirection: "row",
    marginBottom:10,
    alignItems: 'center',
    marginTop:13,
  },
  text_list:{
    marginRight: 100,
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:18,
  },
  text_list1:{
    marginTop:13,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
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
    fontWeight: 'bold',
    color: '#FF8E4F',
    justifyContent: 'center',
    paddingBottom: 15,
  },
 
  
  scheduleList: {
    // style for schedule list
    borderRadius:50,
    marginBottom:20,
    paddingTop:20,
    flexDirection:'column',
  },
  
  Text_page:{
    fontSize: 16,
    fontWeight:'600',
    marginLeft:10,
    color:'#fff',
    paddingBottom:10,
  },
});


