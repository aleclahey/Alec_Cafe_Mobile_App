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
        
        // Reviews for Sourdough Bread Loaf
        { id: '4', product: 'Sourdough Bread Loaf', name: 'Eva Roberts', review: 'The sourdough is perfectly tangy and chewy!' },
        { id: '5', product: 'Sourdough Bread Loaf', name: 'Noah Williams', review: 'Great for sandwiches, very satisfying.' },
        { id: '6', product: 'Sourdough Bread Loaf', name: 'Oliver King', review: 'Crispy crust with a soft interior, just the way I like it.' },

        // Reviews for Baguette
        { id: '1', product: 'Baguette', name: 'John Doe', review: 'Amazing place, would visit again!' },
        { id: '2', product: 'Baguette', name: 'Jane Smith', review: 'Great ambiance and friendly staff.' },
        { id: '3', product: 'Baguette', name: 'Alex Johnson', review: 'Delicious food and excellent service!' },
    
        // Reviews for Focaccia Panini
        { id: '7', product: 'Focaccia Panini', name: 'Lucas Allen', review: 'The focaccia was warm and flavorful, loved the fresh basil.' },
        { id: '8', product: 'Focaccia Panini', name: 'Isabella Scott', review: 'This panini is an amazing combo of cheese and tomatoes!' },
        { id: '9', product: 'Focaccia Panini', name: 'James Moore', review: 'Delicious sandwich, definitely recommend for lunch!' },
    
        // Reviews for Sourdough Chicken Sandwich
        { id: '10', product: 'Sourdough Chicken Sandwich', name: 'Grace Walker', review: 'The chicken was tender and juicy, loved the sourdough!' },
        { id: '11', product: 'Sourdough Chicken Sandwich', name: 'Henry Green', review: 'A great combo of flavors, the sauce was spot on.' },
        { id: '12', product: 'Sourdough Chicken Sandwich', name: 'Jack Evans', review: 'Delicious sandwich, but could use more sauce for my liking.' },
    
        // Reviews for Latte
        { id: '13', product: 'Latte', name: 'Aiden Clark', review: 'The latte was rich and creamy, perfect for a chilly day.' },
        { id: '14', product: 'Latte', name: 'Chloe Walker', review: 'Nice balance of espresso and steamed milk, highly recommend.' },
        { id: '15', product: 'Latte', name: 'Mason Lewis', review: 'A bit too strong for my taste, but overall good.' },
    
        // Reviews for Cappuccino
        { id: '16', product: 'Cappuccino', name: 'Harper Lewis', review: 'Velvety foam and rich espresso, my favorite drink.' },
        { id: '17', product: 'Cappuccino', name: 'Mia Young', review: 'A perfect cappuccino, just the right amount of foam.' },
        { id: '18', product: 'Cappuccino', name: 'Lucas Martin', review: 'Nice and strong with the perfect texture, highly recommend.' },
    
        // Reviews for Iced Latte
        { id: '19', product: 'Iced Latte', name: 'Samuel Hall', review: 'Cool and refreshing, perfect for hot summer days!' },
        { id: '20', product: 'Iced Latte', name: 'Olivia Allen', review: 'The perfect combination of iced coffee and milk.' },
        { id: '21', product: 'Iced Latte', name: 'Mason Harris', review: 'Chilled and delicious, really enjoyed this iced drink.' },
    
        // Reviews for Croissant
        { id: '22', product: 'Croissant', name: 'Oliver Adams', review: 'Flaky and buttery, the perfect start to my morning.' },
        { id: '23', product: 'Croissant', name: 'Emma Nelson', review: 'Golden and crispy, love the texture and flavor.' },
        { id: '24', product: 'Croissant', name: 'James White', review: 'A little too flaky for my taste, but the butter flavor was great.' },
    
        // Reviews for Cream Puff
        { id: '25', product: 'Cream Puff', name: 'Lily Green', review: 'Light and fluffy, the filling was perfect!' },
        { id: '26', product: 'Cream Puff', name: 'Jack Taylor', review: 'Delicious and creamy, a wonderful dessert.' },
        { id: '27', product: 'Cream Puff', name: 'Oliver Harris', review: 'Perfectly balanced sweetness and fluffiness, loved it!' },
    
        // Reviews for Raspberry Scone
        { id: '28', product: 'Raspberry Scone', name: 'Chloe Evans', review: 'Delicious, perfect crumb and raspberry flavor.' },
        { id: '29', product: 'Raspberry Scone', name: 'Ethan Scott', review: 'A great scone, loved the balance of sweetness and fruit.' },
        { id: '30', product: 'Raspberry Scone', name: 'Liam Walker', review: 'The raspberry was a nice touch, perfect with tea.' },

        // Reviews for Butter Tart
        { id: '34', product: 'Butter Tart', name: 'Emma Carter', review: 'Absolutely delicious! The filling was sweet and gooey, and the crust was perfectly flaky.' },
        { id: '35', product: 'Butter Tart', name: 'Oliver Cooper', review: 'A true Canadian classic. Rich, buttery filling with a perfect balance of sweetness.' },
        { id: '36', product: 'Butter Tart', name: 'Mason Parker', review: 'One of the best butter tarts I\'ve had—sweet, rich, and melt-in-your-mouth good!' },

        

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
                    {reviews.filter(item => item.name = product.name)
                    .map(item => (
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
