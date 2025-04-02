import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import AppHeader from '../components/Header';
import Footer from '../components/Footer';

const LocationsPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fake restaurants near London, Ontario
  const [restaurants, setRestaurants] = useState([
    {
      id: '1',
      name: "Alec's Cafe - Richmond",
      description: 'Richmond and Queens, London ON',
      latitude: 42.9854, 
      longitude: -81.2498, 
    },
    {
      id: '2',
      name: "Alec's Cafe - Dufferin",
      description: 'Clearance and Dufferin, London ON',
      latitude: 42.9872,
      longitude: -81.2490,
    },
    {
      id: '3',
      name: "Alec's Cafe - Queens",
      description: 'Clearance and Queens, London ON',
      latitude: 42.9860,
      longitude: -81.2478,
    },
    {
      id: '4',
      name: "Alec's Cafe - Dundas",
      description: 'Clearance and Dundas, London ON',
      latitude: 42.9845,
      longitude: -81.2484,
    },
    {
      id: '5',
      name: "Alec's Cafe - King",
      description: 'Clearance and King, London ON',
      latitude: 42.9829,
      longitude: -81.2467,
    },
  ]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();

        //If denied
        if (status !== 'granted') {
          setErrorMessage('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get the current location
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching location:', error);
        setErrorMessage('Error fetching location');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <ScrollView  style={styles.container}>
      {/* <View> */}
        <ActivityIndicator size="large" />
        <Text>Loading your location...</Text>
      {/* </View> */}
      <Footer />
      </ScrollView>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  // If the location is fetched, show the map, otherwise use default region for London, ON
  const initialRegion = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 42.9854,  // Default to London, ON if location is unavailable
        longitude: -81.2498,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View style={styles.container}>
      <AppHeader />

      <Text style={styles.header}>Restaurants Near You</Text>

      {/* Map View */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={restaurant.description}
          />
        ))}
      </MapView>

      {/* List of Restaurants */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <Footer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor:"#fff"
  },
  map: {
    flex: 3,  // Give the map more space (3 parts of available space)
    marginBottom: 10,  // Small margin to avoid overlapping with the list
  },
  list: {
    flex: 1, // List takes up less space than the map
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationsPage;
