import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

//https://docs.expo.dev/versions/latest/sdk/picker/
import { Picker } from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationsPage = () => {
  const [date, setDate] = useState(new Date()); // State to store the selected date
  const [show, setShow] = useState(false); // State to show/hide the DateTimePicker
  const [mode, setMode] = useState('date'); // Mode to control date or time picker
  const [selectedPersonValue, setSelectedPersonValue] = useState("1");
  const [selectedLocationValue, setSelectedLocationValue] = useState("Alec's Cafe - Richmond");
  const [reservationConfirmed, setReservationConfirmed] = useState(false); // New state for reservation confirmation

  // Function to handle date/time change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // Hide the DateTimePicker after selection
    setDate(currentDate);
  };

  // Function to show the DateTimePicker in date mode
  const showDatepicker = () => {
    setMode('date'); // Set mode to 'date'
    setShow(true);
  };

  // Function to show the DateTimePicker in time mode
  const showTimepicker = () => {
    setMode('time'); // Set mode to 'time'
    setShow(true);
  };

  // Function to handle reservation save
  const handleSave = () => {
    if (date == null) return;

    setReservationConfirmed(true); // Set reservation as confirmed
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <AppHeader />
      <ScrollView>

        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Make a Reservation</Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={selectedPersonValue}
              style={{ height: 50, width: 300 }}
              onValueChange={(itemValue, itemIndex) => setSelectedPersonValue(itemValue)}
            >
              <Picker.Item label="1 Person" value="1 Person" />
              <Picker.Item label="2 People" value="2 Person" />
              <Picker.Item label="3 People" value="3 Person" />
              <Picker.Item label="4 People" value="4 Person" />
              <Picker.Item label="5 People" value="5 Person" />
              <Picker.Item label="More Than 5 People" value="More Than 5 People" />
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker
              selectedValue={selectedLocationValue}
              style={{ height: 50, width: 300 }}
              onValueChange={(itemValue, itemIndex) => setSelectedLocationValue(itemValue)}
            >
              <Picker.Item label="Alec's Cafe - Richmond" value="Alec's Cafe - Richmond" />
              <Picker.Item label="Alec's Cafe - Dufferin" value="Alec's Cafe - Dufferin" />
              <Picker.Item label="Alec's Cafe - Queens" value="Alec's Cafe - Queens" />
              <Picker.Item label="Alec's Cafe - Dundas" value="Alec's Cafe - Dundas" />
              <Picker.Item label="Alec's Cafe - King" value="Alec's Cafe - King" />
            </Picker>
          </View>
          {/* Button to select the date */}
          <TouchableOpacity onPress={showDatepicker} style={styles.button}>
            <Text style={styles.buttonText}>Pick a Date</Text>
          </TouchableOpacity>
          <Text>{date.toDateString()}</Text>

          {/* Button to select the time */}
          <TouchableOpacity onPress={showTimepicker} style={styles.button}>
            <Text style={styles.buttonText}>Pick a Time</Text>
          </TouchableOpacity>
          <Text>{date.toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Text>

          {/* DateTimePicker that changes mode based on the button pressed */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
          

          {/* Save button */}
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Reserve</Text>
          </TouchableOpacity>

          {/* Display successful reservation if confirmed */}
          {reservationConfirmed && (
            <View style={styles.successMessage}>
              <Text>Your reservation is set</Text>
              <Text>
                See you {date.toDateString()} at {date.toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' })}!
              </Text>
            </View>
          )}

        </View>
      </ScrollView>

      <Footer />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    marginBottom: 20,
  },
  datePickerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  successMessage: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ReservationsPage;
