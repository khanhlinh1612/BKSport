import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('screen');

export default ViewFeedback = function({navigation}) {
  const events = [
    {
      id: 1,
      title: 'Quality of pitch',
      username: 'Bùi Duy',
      phone: '0123456789',
      value: 70,
      description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
    },
    {
      id: 2,
      title: 'Lighting',
      username: 'Duy',
      phone: '0123456789',
      value: 90,
      description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
    },
    {
      id: 3,
      title: 'Cleanliness',
      username: 'Mạnh',
      phone: '0123456789',
      value: 50,
      description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
    },
    {
        id: 4,
        title: 'Accessibility',
        username: 'Hào',
        phone: '0123456789',
        value : 100,
        description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
      },
      {
        id: 5,
        title: 'Quality of equipment',
        username: 'Khánh Linh',
        phone: '0123456789',
        value: 30,
        description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
      },
      {
        id: 6,
        title: 'User interface',
        username: 'Khánh',
        phone: '0123456789',
        value:40,
        description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
      },
      {
        id: 7,
        title: 'Facilities',
        username: 'Hào',
        phone: '0123456789',
        value:10,
        description: "I was impressed with the overall quality of the pitch during our recent game. It was clear that the groundskeeping crew had taken great care to ensure that the surface was in excellent condition. The grass was cut to the perfect length, and there were no bare spots or uneven areas that would have affected gameplay. The ball moved smoothly and consistently throughout the game, and I felt confident in my footing as I ran and made quick turns. Thank you for maintaining such a high level of quality on the pitch, it really makes a difference in the overall experience of playing on your field.",
      },
    
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity  onPress={() => navigation.navigate("FeedbackDetail")} style={item.id %2 == 0 ? styles.eventItem : styles.eventItem1}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventusername}>{item.username}</Text>
      <Text style={styles.eventusername} numberOfLines={1}>
       <Text style={{fontWeight:500, fontSize:14}}>Description:</Text>  {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
     

      <View style={styles.eventListContainer}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.eventList}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5',
        padding: 5,
    },
    calendarContainer: {
        flex: 3, 
        justifyContent: 'flex-start', // Căn giữa theo chiều dọc
        paddingTop: 0, // Khoảng cách giữa lịch và nút "Add Task"
        paddingBottom: 0, // Khoảng cách giữa lịch và nút "Add Task"
    },
    button1: {
        marginTop:5,
        backgroundColor: '#49B583',
        padding: 10,
        width: 138,
        height: 46,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 0,
        gap: 10,
        position: 'absolute',
        marginBottom: 10,
        top: 110,
        right: 10,
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight:'bold',
    },
    icon: {
        marginRight: 3, 
    },
    calendar: {
        height: 100, 
        paddingTop: 20, 
        paddingBottom: 10, 
    },
    eventListContainer: {
        flex: 9,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    eventList: {
        // paddingTop: 10,
        paddingBottom: 20,
    },
    eventItem: {
        backgroundColor: '#c4e4e3',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 2,
    },
    eventItem1: {
        backgroundColor: '#ffe1e9',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    eventusername: {
        fontSize: 14,
        color: '#000',
        marginTop: 2,
    },
    eventTime: {
        fontSize: 14,
        color: 'black',
        marginTop: 4,
    },
});

