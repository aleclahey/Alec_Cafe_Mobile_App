import React, { useState } from 'react'; // Import useState
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import AppHeader from '../components/Header';

const ProductPage = () => {
  const navigation = useNavigation();


  const categories = ['Drinks', 'Mains', 'Snacks/Bread', 'Dessert'];
  const categoryImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1679503586721-2d50b2a811b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1665669248059-0a70291944f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  const products = [
    { 
        id: '1', 
        name: 'Sourdough Bread Loaf', 
        price: '$8.99', 
        category: categories[2], 
        image: 'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A hearty, tangy, and slightly chewy sourdough loaf, perfect for sandwiches or enjoying with a bit of butter.'
    },
    { 
        id: '2', 
        name: 'Baguette', 
        price: '$3.99', 
        category: categories[2], 
        image: 'https://plus.unsplash.com/premium_photo-1661324486690-c0b8b68d3eaf?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A classic French baguette with a crispy golden crust and soft, airy interior—ideal for pairing with cheese or dipping in olive oil.'
    },
    { 
        id: '3', 
        name: 'Focaccia Panini', 
        price: '$10.99', 
        category: categories[1], 
        image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'An Italian-inspired sandwich made with focaccia bread, filled with savory fillings like mozzarella, tomatoes, and basil.'
    },
    { 
        id: '4', 
        name: 'Sourdough Chicken Sandwich', 
        price: '$10.99', 
        category: categories[1], 
        image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A delicious sandwich with tender grilled chicken, fresh veggies, and a tangy sauce, all served on a toasted sourdough bun.'
    },
    { 
        id: '5', 
        name: 'Latte', 
        price: '$4.49', 
        category: categories[0], 
        image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A smooth espresso with steamed milk and a touch of foam. A perfect pick-me-up for any time of day.'
    },
    { 
        id: '6', 
        name: 'Cappuccino', 
        price: '$4.49', 
        category: categories[0], 
        image: 'https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A rich espresso-based drink topped with velvety foam, offering a perfect balance of bold coffee and creamy texture.'
    },
    { 
        id: '7', 
        name: 'Iced Latte', 
        price: '$4.49', 
        category: categories[0], 
        image: 'https://images.unsplash.com/photo-1620360289473-bfafadc16c57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A refreshing twist on the classic latte, served chilled with ice for a cool, invigorating coffee experience.'
    },
    { 
        id: '8', 
        name: 'Croissant', 
        price: '$2.99', 
        category: categories[2], 
        image: 'https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?q=80&w=2004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'Flaky, buttery, and golden brown, this French pastry is perfect for breakfast or a delightful snack.'
    },
    { 
        id: '9', 
        name: 'Cream Puff', 
        price: '$2.49', 
        category: categories[3], 
        image: 'https://images.unsplash.com/photo-1643311927292-46c6478ad4e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'Light and airy choux pastry filled with sweet and creamy filling, perfect for a light dessert or afternoon treat.'
    },
    { 
        id: '10', 
        name: 'Raspberry Scone', 
        price: '$2.49', 
        category: categories[3], 
        image: 'https://images.unsplash.com/photo-1741790302593-814904ba249f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A crumbly and tender scone studded with fresh raspberries and a hint of sweetness, perfect with tea or coffee.'
    },
    { 
        id: '11', 
        name: 'Butter Tart', 
        price: '$2.29', 
        category: categories[3], 
        image: 'https://images.unsplash.com/photo-1677740929617-e8d3679f6ad1?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A traditional Canadian dessert featuring a rich, gooey filling made of butter, sugar, and eggs, encased in a flaky pastry shell.'
    },
    { 
        id: '12', 
        name: 'Pie Slice', 
        price: '$3.99', 
        category: categories[3], 
        image: 'https://images.unsplash.com/photo-1595904567075-f143cbe1f0c8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        description: 'A slice of freshly baked pie, available in various flavors such as apple, cherry, or pecan, with a buttery, flaky crust. \n\nFlavours change daily, come in store to see today\'s flavour!'
    }
];

  const [searchValue, setSearchValue] = useState("");

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

// Modify the ProductPage component structure
return (
  <View style={styles.container}>
    <AppHeader/>
    <SearchBar
    placeholder="Type Here..."
    onChangeText={setSearchValue}
    value={searchValue}
    lightTheme
    ></SearchBar>
    
    {/* Categories */}
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity style={styles.categoryButton} onPress={() => sortProducts(index)}>
          <Image source={{ uri: categoryImages[index] }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryList}
    />

 
    {/* Menu title */}
    <Text style={styles.menuTitle}>Menu</Text>
    
    {/* Product Grid */}
    <FlatList
      data={showProducts}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.productCard}
          onPress={() => navigation.navigate('ProductOverviewPage', { product: item })}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.productList}
    />

    <Footer />
  </View>
);
};

export default ProductPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryList: {
    marginTop: 10,
    //paddingBottom: 50,
    paddingHorizontal: 10,
    height: 300
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    width: 100, // Smaller images
    height: 100, // Smaller images
    borderRadius: 50,
  },
  categoryImage: {
    width: 100, // Smaller images
    height: 100, // Smaller images
    borderRadius: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    elevation: 1,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 4,
  },
  productName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});