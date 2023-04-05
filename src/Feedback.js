import React, {useState}from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity, Dimensions,TextInput,SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native'; //animation
import Icon from 'react-native-vector-icons/FontAwesome'; //icons
import Slider from '@react-native-community/slider';
const {width, height} = Dimensions.get('screen');
export default Feedback  = function({navigation}){
    const [value,setValue] = useState(0);
    const [comment,setComment] = useState('');
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const handleSubmit =() =>{
        console.log('Gửi bình luận : ,comment');
        setComment('');
        setName('');
        setEmail('');
        setPhone('');
        setValue(0);
    }
  return (
    <SafeAreaView style={styles.container}>
        <LottieView source={require('./../assets/feedback2.json')} autoPlay={true} loop speed={1}  style={styles.logo1} />
      <View style={styles.mainbox}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={styles.container1}>
                    <Text style={styles.text_name}>Name</Text>
                    <View style={styles.phone}>              
                    <TextInput placeholder="Lumine" style={{flex:1,paddingVertical:0,fontSize:13}} value={name}
                        onChangeText={(text) => setName(text)} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.text_name}>Phone Number</Text>
                    <View style={styles.phone}>              
                    <TextInput placeholder="+ 91 00000 00000" style={{flex:1,paddingVertical:0,fontSize:13}} value={phone}
                        onChangeText={(text) => setPhone(text)}/>
                    </View>
                </View>
            </View>
            <View style={styles.container1}>
                    <Text style={styles.text_name}>Email Address</Text>
                    <View style={styles.phone}>              
                    <TextInput placeholder="+ 91 00000 00000" style={{flex:1,paddingVertical:0,fontSize:13}} value={email}
                        onChangeText={(text) => setEmail(text)} />
                    </View>
            </View>
            <View style={styles.container1}>
                    <Text style={styles.text_name}>Share your experience scaling</Text>
                    {value < 20 ? <View style={{flexDirection:'row',justifyContent:'space-between'}}><Image source={require('./../img/worst.png')} style={styles.logo} /> 
                                <Image source={require('./../img/Notgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/fine1.png')} style={styles.logo} />   
                                <Image source={require('./../img/lookgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/love1.png')} style={styles.logo} />   
                          </View>
                    :  null}
                    {value >= 20 && value <40 ? <View style={{flexDirection:'row',justifyContent:'space-between'}}><Image source={require('./../img/worst2.png')} style={styles.logo} /> 
                                <Image source={require('./../img/Notgood2.png')} style={styles.logo} />   
                                <Image source={require('./../img/fine1.png')} style={styles.logo} />   
                                <Image source={require('./../img/lookgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/love1.png')} style={styles.logo} />   
                          </View>
                    :  null}
                    {value >= 40 && value <60 ? <View style={{flexDirection:'row',justifyContent:'space-between'}}><Image source={require('./../img/worst2.png')} style={styles.logo} /> 
                                <Image source={require('./../img/Notgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/fine2.png')} style={styles.logo} />   
                                <Image source={require('./../img/lookgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/love1.png')} style={styles.logo} />   
                          </View>
                    :  null}
                    {value >= 60 && value <80 ? <View style={{flexDirection:'row',justifyContent:'space-between'}}><Image source={require('./../img/worst2.png')} style={styles.logo} /> 
                                <Image source={require('./../img/Notgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/fine1.png')} style={styles.logo} />   
                                <Image source={require('./../img/lookgood2.png')} style={styles.logo} />   
                                <Image source={require('./../img/love1.png')} style={styles.logo} />   
                          </View>
                    :  null}
                    {value >= 80  ? <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10,}}><Image source={require('./../img/worst2.png')} style={styles.logo} /> 
                                <Image source={require('./../img/Notgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/fine1.png')} style={styles.logo} />   
                                <Image source={require('./../img/lookgood1.png')} style={styles.logo} />   
                                <Image source={require('./../img/love2.png')} style={styles.logo} />   
                          </View>
                    :  null}
            <Slider
                style={{ width: 200 }}
                minimumTrackTintColor={'#105955'}
                minimumValue={0}
                maximumValue={100}
                value={value}
                onValueChange={(newValue) => setValue(newValue)}
            />
            </View>

            <View style={styles.container1}>
                <View style={{ justifyItems: 'center' }}>
                    <TextInput
                        style={{ borderWidth: 1, paddingLeft:10,borderRadius: 20,height:height*0.1,width:width*0.7}}
                        placeholder="Add your comments..."
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                    />
                    
                </View>
            </View>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
                        <Text style={styles.buttonText1}>Submit</Text>
                    </TouchableOpacity>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding:5,
  },
  logo1:{  
    width: width * 0.8,
    height: height * 0.27,

  },
  logo:{
    width: width * 0.14,
    height: height * 0.06,
  },
  container1:{
    flexDirection:'column',
    marginBottom:10,
  },  
  text_name:{
    fontSize:14,
    fontWeight:'600',
    color:'#2071B2',
    marginBottom:10,
    marginLeft:5,
  },
  mainbox:{
    width: width * 1,
    backgroundColor:'#f5f5f5',
    borderRadius:40,
    justifyContent:'space-between',
    alignContent:'space-between',
    padding:10,
   },
   phone:{
    flexDirection:'row',
    borderColor:'#deacac',
    borderWidth:1,
    padding:10,
    width:width*0.4,
    backgroundColor:'#FFF9F9',
    borderRadius:10,
    marginBottom:10,
   },   
   button1: {
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
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
    
  },
});


