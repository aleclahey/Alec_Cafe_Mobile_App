import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

const ReservationsPage = () => {

    
    return (
        <SafeAreaProvider>
            <AppHeader />
            
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
    
});

export default ReservationsPage;
