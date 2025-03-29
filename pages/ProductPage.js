import React, { useState } from 'react'; // Import useState
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

const ProductPage = () => {
  const navigation = useNavigation();


  const categories = ['Drinks', 'Mains', 'Snacks', 'Dessert'];
  const categoryImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1679503586721-2d50b2a811b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1665669248059-0a70291944f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  const products = [
    { id: '1', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '2', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://plus.unsplash.com/premium_photo-1661324486690-c0b8b68d3eaf?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '4', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '5', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '6', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '7', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1620360289473-bfafadc16c57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '8', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?q=80&w=2004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '9', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1643311927292-46c6478ad4e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '10', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1741790302593-814904ba249f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '11', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1677740929617-e8d3679f6ad1?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '12', name: 'Product name', price: '$10.99', category: categories[1], image: 'https://images.unsplash.com/photo-1595904567075-f143cbe1f0c8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  // State for filtered products
  const [showProducts, setShowProducts] = useState(products);
  const [numColumns, setNumColumns] = useState(2); // Default to 2 columns

  const filterByDrinks = () => {
    return products.filter(product => product.category === categories[0]);
  };

  const filterByMains = () => {
    return products.filter(product => product.category === categories[1]);
  };

  const filterBySnacks = () => {
    return products.filter(product => product.category === categories[2]);
  };

  const filterByDesserts = () => {
    return products.filter(product => product.category === categories[3]);
  };

  const sortProducts = (index) => {
    if (index === 0) {
      setShowProducts(filterByDrinks());
    } else if (index === 1) {
      setShowProducts(filterByMains());
    } else if (index === 2) {
      setShowProducts(filterBySnacks());
    } else if (index === 3) {
      setShowProducts(filterByDesserts());
    } else {
      setShowProducts(products); // Show all products when no filter is applied
    }
  };

    return (
    <View style={styles.container}>
      <AppHeader/>

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.categoryButton} onPress={() => sortProducts(index)}>
            <Image source={{ uri: categoryImages[index] }} style={styles.categoryImage} />
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />

      {/* Product Grid */}
      <Text>Menu</Text>
      <FlatList
        data={showProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <>
          <TouchableOpacity 
          style={styles.productCard}
          onPress={() =>
            navigation.navigate('ProductOverviewPage', { product: item })
          }>

            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>

          </TouchableOpacity>
          </>
        )}
        contentContainerStyle={styles.productList}
        key={numColumns} // Key prop forces a re-render when numColumns changes
      />

      <Footer />
    </View>
  );
};

export default ProductPage;


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    //paddingVertical: 16,
    //margin:20
  },
  categoryList: {
    marginTop: 30,
    //marginBottom: 16,
    height:175,
    paddingHorizontal: 10,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    //marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom:50
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    elevation: 1,
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: 175,
    height: 175,
    borderRadius: 2,
  },
  productName: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  header:{
    marginTop:50
  }
  

});
