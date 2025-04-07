import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import Footer from '../components/Footer';
import AppHeader from '../components/Header';
import * as ImagePicker from 'expo-image-picker'; // Import the image picker
import { db } from '../data/FirebaseConfig'; // Firebase configuration
import { getDocs, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore methods
import { use } from 'react';

const ReviewsPage = ({ route }) => {
    const { product } = route.params; // Get the product passed as a parameter
    
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [newName, setNewName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to fetch reviews from Firestore
    const fetchReviews = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'reviews')); // Fetch reviews from 'reviews' collection
            const reviewsList = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(item => item.product === product.name); // Filter reviews by product name

            setReviews(reviewsList);
        } catch (error) {
            console.error('Error fetching reviews: ', error);
        }
    };

    // Fetch reviews when the component mounts
    useEffect(() => {
        fetchReviews();
    }, []);

    // Function to add a new review to Firestore
    const handleAddReview = async () => {
        if (newReview && newName) {
            const newReviewData = {
                name: newName,
                review: newReview,
                image: selectedImage,  // Store the selected image with the review
                product: product.name, // Store product name
                timestamp: new Date(),
            };

            try {
                // Add new review to Firestore
                await addDoc(collection(db, 'reviews'), newReviewData);
                setNewReview('');
                setNewName('');
                setSelectedImage(null);
                fetchReviews(); // Fetch updated reviews from Firestore
                Alert.alert('Success', 'Review submitted successfully!');
            } catch (error) {
                console.error('Error adding review: ', error);
                Alert.alert('Error', 'Failed to submit the review.');
            }
        } else {
            Alert.alert('Oops!', 'Please fill your name and review.');
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
