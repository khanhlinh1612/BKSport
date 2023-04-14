import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarStrip from 'react-native-calendar-strip';
const {width, height} = Dimensions.get('screen');

export default Calendar = function({navigation}){

    const events = [ 
    { id: 1, title: 'Match 1', description: 'Friendly match' , startTime: '09:30', endTime: '10:00' },
    { id: 2, title: 'Match 2', description: 'Friendly match' , startTime: '14:00', endTime: '14:30' },
    { id: 3, title: 'Match 3', description: 'Friendly match' , startTime: '18:00', endTime: '19:00' },
    ];

    const renderItem = ({ item }) => ( // Hàm render item trong FlatList
    <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <Text style={styles.eventTime}>{item.startTime}{" - "}{item.endTime}</Text>
    </View>
    );

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
            <CalendarStrip
                style={styles.calendar} // Tùy chỉnh kiểu dáng của CalendarStrip
                calendarColor={'#49B583'} // Màu nền của lịch
                highlightDateNameStyle={{color:'black'}} // Kiểu dáng của ngày hiển thị hiện tại
                highlightDateNumberStyle={{color:'black'}} // Kiểu dáng của ngày hiển thị hiện tại
                daySelectionAnimation={{type: 'background', duration: 200, highlightColor: '#49B583'}} // Hiệu ứng khi chọn ngày
                calendarHeaderStyle={{color:'#000'}} // Kiểu dáng của tiêu đề lịch
                dateNumberStyle={{color:'#fff'}} // Kiểu dáng của số ngày
                dateNameStyle={{color:'#fff'}} // Kiểu dáng của tên ngày
            />
        </View>

        <TouchableOpacity onPress={() =>navigation.navigate('Add a task')} style={styles.button1}>
            <Icon name="plus" size={16} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText1}>Add Task</Text>
        </TouchableOpacity>

        <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.eventList}
        />


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
        flex: 1, // Sử dụng flex để kéo dãn CalendarStrip
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
        marginRight: 3, // Khoảng cách giữa icon và text
    },
    calendar: {
        height: 100, 
        paddingTop: 20, 
        paddingBottom: 10, 
    },
    eventList: {
        paddingTop: 10,
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