import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight, SafeAreaView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const {width, height} = Dimensions.get('screen');

export default Addtask = function({navigation}){
    const data = [
        { id: 1, label: 'Round 1' },
        { id: 2, label: 'Group Stage' },
        { id: 3, label: 'Round 2' },
        { id: 4, label: 'Friendly Match' },
        { id: 5, label: 'Final Match' },
    ];

    const [selectedId, setSelectedId] = React.useState(null); // Trạng thái của button đang được chọn

    const renderItem = ({ item }) => (
        <TouchableHighlight
            style={[
                styles.button,
                { backgroundColor: selectedId === item.id ? '#FF69B4' : '#7F86FF' } 
            ]}
            underlayColor="#6F75FF" // Màu khi giữ nút
            onPress={() => setSelectedId(item.id)} 
        >
            <Text style={styles.label}>{item.label}</Text>
        </TouchableHighlight>
    );

        const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
        const [selectedDate, setSelectedDate] = React.useState('');
      
        const showDatePicker = () => {
          setDatePickerVisible(true);
        }
      
        const handleDateConfirm = (date) => {
          setSelectedDate(date.toDateString()); 
          setDatePickerVisible(false); 
        }
      
        const handleDateCancel = () => {
          setDatePickerVisible(false); 
        }

        const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);
        const [selectedTime, setSelectedTime] = React.useState('');

        const showTimePicker = () => {
            setTimePickerVisible(true);
        }
        
          const handleTimeConfirm = (time) => {
            setSelectedTime(time.toTimeString()); 
            setTimePickerVisible(false); 
        }
        
          const handleTimeCancel = () => {
            setTimePickerVisible(false); 
        }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flatListContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.contentContainer}
                showsHorizontalScrollIndicator={false}
            />
            </View>

            <View style={styles.topic}>
            <Icon
                name="file-text-o"
                size={20}
                color="#666666"
                style={{ marginRight: 10 }}
            />
            <TextInput
                placeholder="Topic / Name"
                style={{ flex: 0.8, paddingVertical: 0 }}
                placeholderTextColor="#666666"
            />
            </View>

            <View style={styles.select}>
            <View style={styles.selectIcon}>
            <TouchableOpacity onPress={showDatePicker}>
                <Icon name="calendar" size={30} color="#00559A" />
            </TouchableOpacity>
            </View>
            <View style={styles.selectText}>
            {selectedDate ? (<Text style={styles.selectedDateText}>{selectedDate}</Text>) : null}
            

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={handleDateCancel}
            />
            </View>

            <View style={styles.selectTime}>
                <Text style={styles.text}>From</Text>
            </View>
            <View style={styles.selectTime}>
                <Text style={styles.text}>To</Text>
            </View>

            <TouchableOpacity onPress={showTimePicker}>
                <Icon name="clock-o" size={30} color="orange" />
            </TouchableOpacity>
            {selectedTime ? (<Text style={styles.selectedDateText}>{selectedTime}</Text>) : null}
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={handleTimeCancel}
            />

            </View>

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    flatListContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: 100,
    },
    button: {
        backgroundColor: '#7F86FF',
        borderRadius: 20,
        height: 30,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
      color: 'white',
    },
    contentContainer: {
        paddingVertical: 25,
    },
    topic: {
        flexDirection: "row",
        borderColor: "#fff",
        borderWidth: 1,
        padding: 15,
        backgroundColor: "#CFCFCF",
        borderRadius: 20,
        marginTop: 120,
    },
    selectedDateText: {
        fontSize: 18,
        fontWeight: 500,
    },
    select: {
        flex: 1,
        marginLeft: 50,
        marginTop: -300,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectIcon: {
        flex: 1,
    },
    selectText: {
        flex: 1,
        marginLeft: -200,
    },
});