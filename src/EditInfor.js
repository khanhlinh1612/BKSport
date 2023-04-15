import React,{useState} from 'react';
import { StyleSheet, SafeAreaView,View, Text, Image,TouchableOpacity, Dimensions,TextInput} from 'react-native';
import LottieView from 'lottie-react-native'; //animation
import Icon from 'react-native-vector-icons/FontAwesome'; //icons
const {width, height} = Dimensions.get('screen');
export default EditInfor  = function({navigation}){
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleUpdate = () => {
        //Luu thong tin da cap nhat
        
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainbox}>
      <Text style={styles.label}>Username:</Text>
      <TextInput 
        style={styles.input}
        placeholder='Lumine'
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Phone number:</Text>
      <TextInput
        style={styles.input}
        placeholder='0123456789'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder='lumine@gmail.com'
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='••••••••••••'
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Confirm password:</Text>
      <TextInput
        style={styles.input}
        placeholder='••••••••••••'
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={{color:'#fff', fontWeight:'700', fontSize:16}}>Save</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#ff8c4d',
  },
  logo:{
    width: 400,
    height: 250,
  },
   mainbox:{
    marginTop:20,
    height: height * 0.8,
    width: width * 0.85,
    backgroundColor:'white',
    marginBottom:30,
    borderRadius:40,
    justifyContent:'center',
    alignContent:'center',
    padding:20,
   },
   label:{
    flexDirection:'column',
    marginBottom:10,
    color:'#A68787',
    fontWeight:'bold',
   },
    input:{
    flexDirection:'row',
    borderColor:'#deacac',
    borderWidth:1,
    padding:10,
    backgroundColor:'#FFF9F9',
    borderRadius:10,
    marginBottom:25,
   },   
   button:{
    marginTop:5,
    backgroundColor: '#20B2AA',
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
    alignSelf:'center',
   }, 
});


