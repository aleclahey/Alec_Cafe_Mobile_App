import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider
import * as MailComposer from 'expo-mail-composer';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

//import { useNavigation } from '@react-navigation/native';

const HomePage = () => {

    const sendMessageWithEmail = async () => {
        const isAvailable = await MailComposer.isAvailableAsync();
        
        if (isAvailable) {
          const options = {
            recipients: ['a_lahey150623@fanshaweonline.ca'],
            subject: 'Customer from Alec Cafe Website',
            body: 'Hello Alec Lahey,',
          };
    
          MailComposer.composeAsync(options).then((result) => console.log(result.status));
        } else {
          console.log("Email is not available on this device");
        }
      }

    const image = 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <SafeAreaProvider>
            <AppHeader />
            <ScrollView style={styles.container}>
                

                <View style={styles.textAreaOne}>
                    <Text style={styles.title}>Home Page</Text>
                    <Text style={styles.subtitle}>Welcome to our app!</Text>
                </View>

                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>

                <View style={styles.textAreaTwo}>
                    <Text style={styles.title}>About Us</Text>
                    <Text style={styles.description}>We provide exceptional services. Description Here.</Text>
                </View>

                <TouchableOpacity style={styles.contactButton}
                onPress={sendMessageWithEmail()}>
                    <Text style={styles.contactText}>Contact Us!</Text>
                </TouchableOpacity>

                
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
    textAreaOne: {
        marginVertical: 20,
        padding: 16,  // Add padding inside each section for spacing
        borderWidth: 1, // Add border width
        borderColor: '#ddd', // Light grey border color
        borderRadius: 8, // Rounded corners
        backgroundColor: '#f9f9f9', // Optional: background color for sections
    },
    textAreaTwo: {
        marginVertical: 20,
        padding: 16,  // Add padding inside each section for spacing
        borderColor: '#ddd', // Light grey border color
        backgroundColor: '#f9f9f9', // Optional: background color for sections
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
    },
    description: {
        fontSize: 16,
        color: '#777',
        marginTop: 8,
    },
    imageContainer: {
        marginVertical: 20,
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    contactButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width:150
    },
    contactText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomePage;
