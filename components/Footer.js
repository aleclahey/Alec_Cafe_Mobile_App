import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';


const Footer = () =>{
  const navigation = useNavigation();

    return(
        <View>
        {/* Bottom Navigation */}
              <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton}
                onPress={() => navigation.navigate('HomePage')}>
                  <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}
                onPress={() => navigation.navigate('ProductPage')}>
                  <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                  <Ionicons name="location" size={24} color="black"
                  onPress={() => navigation.navigate('LocationsPage')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                  <Fontisto name="date" size={24} color="black"
                  onPress={() => navigation.navigate('ReservationPage')} />
                </TouchableOpacity>
              </View>
        </View>
    );

}

export default Footer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      },
      navButton: {
        alignItems: 'center',
      },
    
});