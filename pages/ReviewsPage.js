import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView,Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import Footer from '../components/Footer';
import AppHeader from '../components/Header';
import * as ImagePicker from 'expo-image-picker'; // Import the image picker

const ReviewsPage = ({ route }) => {

    const { product } = route.params; // Get the product passed as a parameter
    // Sample reviews
    const initialReviews = [
        { id: '1', name: 'John Doe', review: 'Amazing place, would visit again!' },
        { id: '2', name: 'Jane Smith', review: 'Great ambiance and friendly staff.' },
        { id: '3', name: 'Alex Johnson', review: 'Delicious food and excellent service!' },
    ];

    const [reviews, setReviews] = useState(initialReviews);
    const [newReview, setNewReview] = useState('');
    const [newName, setNewName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to add a new review
    const handleAddReview = () => {
        if (newReview && newName) {
            const newReviewData = {
                id: String(reviews.length + 1),  // Simple ID generation
                name: newName,
                review: newReview,
                image: selectedImage,  // Store the selected image with the review
            };
            setReviews([newReviewData, ...reviews]);
            setNewReview('');
            setNewName('');
            setSelectedImage(null); // Clear the image after submitting

            //Send a notification here
            //Thanks for writing a review! As a thank you, receive 30% off your next visit...
        } else {
            Alert.alert('Oops!','Please fill your name and review.');
        }
    };

    // Function to launch the image picker
    const pickImage = async () => {
        // Request permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Error!','Permission to access media library is required. Edit permission to upload an image.');
            return;
        }

        // Launch the image picker
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            setSelectedImage(pickerResult.assets[0].uri);
        }
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <AppHeader />
            <ScrollView style={styles.container}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Reviews for {product.name}</Text>
                </View>

                {/* Loop through the reviews array to display all reviews */}
                <View style={styles.reviewsList}>
                    {reviews.map(item => (
                        <View key={item.id} style={styles.reviewCard}>
                            {item.image && <Image source={{ uri: item.image }} style={styles.reviewImage} />}
                            <Text style={styles.reviewName}>{item.name}</Text>
                            <Text style={styles.reviewText}>{item.review}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Leave a Review</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={newName}
                        onChangeText={setNewName}
                    />
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Write your review"
                        value={newReview}
                        onChangeText={setNewReview}
                        multiline
                        numberOfLines={4}
                    />

                    {/* Button to pick an image */}
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        <Text style={styles.imageButtonText}>Upload an Image</Text>
                    </TouchableOpacity>

                    {/* Display selected image below the review text input */}
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                    )}

                    <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
                        <Text style={styles.submitText}>Submit Review</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    section: {
        marginTop: 10,
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    titleSection:{
        paddingTop:20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    reviewsList: {
        marginBottom: 20,
    },
    reviewCard: {
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    reviewName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    reviewText: {
        fontSize: 16,
        color: '#555',
        marginTop: 6,
    },
    reviewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 10,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageButton: {
        backgroundColor: '#899499',
        paddingVertical: 2,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        width:150
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    selectedImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default ReviewsPage;
