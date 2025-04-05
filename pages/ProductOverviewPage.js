import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

import { useNavigation } from '@react-navigation/native';

const ProductOverviewPage = ({ route }) => {

  const navigation = useNavigation();
    
  const { product } = route.params;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader />

        <ScrollView contentContainerStyle={styles.scrollContent}>
           
          <TouchableOpacity style={styles.imageContainer}>
            
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
          </TouchableOpacity>

          <View>
              <Text style={styles.productName}>{product.name}</Text>
          </View>

          <View style={styles.productDetailsContainer}>
            
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>

            <TouchableOpacity style={styles.reviewButton}
            onPress={() => navigation.navigate('ReviewsPage', { product: product }) }
            >
              <Text style={styles.reviewButtonText}>Read Reviews</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Footer />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 350,
    height: 350,
    borderRadius: 2,
    backgroundColor: '#e0e0e0', // Placeholder background
  },
  productDetailsContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    margin:10
    //elevation: 4,
  },
  productName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:'left',
    paddingLeft:15
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  reviewButton: {
    backgroundColor: '#fff', // White background
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,  // Border around button
    borderColor: '#000',  // Black border color
    alignItems: 'center',
},
  reviewButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default ProductOverviewPage;
