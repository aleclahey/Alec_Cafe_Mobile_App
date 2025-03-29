import React from 'react';
import { View,StyleSheet } from 'react-native';
import { Header } from 'react-native-elements'; 
import { useNavigation } from '@react-navigation/native';


const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        backgroundColor='#000000'
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: "Alec's Café", style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff',onPress: () => navigation.navigate('HomePage') }}
      />
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#000',
      //paddingHorizontal: 16,
      //marginTop:100
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