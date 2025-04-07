import { React, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { db } from '../data/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
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

  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const initProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(initProducts);
      setFilteredProducts(initProducts); // Initially, show all products
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  // Filter products by category
  const filterByCategory = (category) => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered); // Only update filtered products
  };

  // Handle category selection
  const sortProducts = (index) => {
    const selectedCategory = categories[index];

    if (selectedCategory == 'All') {
      setFilteredProducts(products); // Show all products if "All" is selected
    } 
    else {
      filterByCategory(selectedCategory); // Filter by the selected category
    }
    
  };

  // Handle search filtering
  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    if (searchText.trim() == '' || searchText==null) {
      // Show all products if search is empty
      setFilteredProducts(products); 
    } 
    else {
      const filtered = products.filter(product =>product.name.toLowerCase()
      .includes(searchText.toLowerCase()));
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader />
      <SearchBar
        placeholder="Search for products..."
        onChangeText={handleSearch}
        value={searchValue}
        lightTheme
      />

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => sortProducts(index)}>
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
        data={filteredProducts}  // Use filtered products here
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
    paddingHorizontal: 10,
    height: 300,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoryImage: {
    width: 100,
    height: 100,
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
