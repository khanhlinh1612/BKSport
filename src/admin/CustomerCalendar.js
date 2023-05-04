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
import CalendarStrip from 'react-native-calendar-strip';
const {width, height} = Dimensions.get('screen');

export default CustomerCalendar = function({navigation}) {
  const events = [
    {
      id: 1,
      title: 'Match 1',
      description: 'Friendly match',
      startTime: '09:30',
      endTime: '10:00',
    },
    {
      id: 2,
      title: 'Match 2',
      description: 'Friendly match',
      startTime: '14:00',
      endTime: '14:30',
    },
    {
      id: 3,
      title: 'Match 3',
      description: 'Friendly match',
      startTime: '18:00',
      endTime: '19:00',
    },
    {
        id: 4,
        title: 'Match 4',
        description: 'Friendly match',
        startTime: '09:30',
        endTime: '10:00',
      },
      {
        id: 5,
        title: 'Match 5',
        description: 'Friendly match',
        startTime: '14:00',
        endTime: '14:30',
      },
      {
        id: 6,
        title: 'Match 6',
        description: 'Friendly match',
        startTime: '18:00',
        endTime: '19:00',
      },
      {
        id: 7,
        title: 'Match 7',
        description: 'Friendly match',
        startTime: '09:30',
        endTime: '10:00',
      },
      {
        id: 8,
        title: 'Match 8',
        description: 'Friendly match',
        startTime: '14:00',
        endTime: '14:30',
      },
      {
        id: 9,
        title: 'Match 9',
        description: 'Friendly match',
        startTime: '18:00',
        endTime: '19:00',
      },
  ];

  const renderItem = ({item}) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventTime}>
        {item.startTime} {' - '} {item.endTime}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarStrip
          style={styles.calendar}
          calendarColor={'#49B583'}
          highlightDateNameStyle={{color: 'black'}}
          highlightDateNumberStyle={{color: 'black'}}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            highlightColor: '#49B583',
          }}
          calendarHeaderStyle={{color: '#000'}}
          dateNumberStyle={{color: '#fff'}}
          dateNameStyle={{color: '#fff'}}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Add Calendar')}
        style={styles.button1}>
        <Icon name="plus" size={16} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText1}>Add Task</Text>
      </TouchableOpacity>

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
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    eventDescription: {
        fontSize: 14,
        color: '#000',
    },
    eventTime: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
});

