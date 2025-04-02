import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { Header } from 'react-native-elements'; 
import { useNavigation } from '@react-navigation/native';


const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Header
        backgroundColor='#000000'
        leftComponent={{ icon: 'menu', color: '#fff' }}
        rightComponent={{ icon: 'home', color: '#fff',onPress: () => navigation.navigate('HomePage') }}
      /> */}
      <View style={styles.bottomNav}>
        <Text style={styles.navText}>Alec's Cafe</Text>
      </View>

    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //backgroundColor: '#000000 ',
      //paddingHorizontal: 16,
      //marginTop:100,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        //backgroundColor: '#000000 ',

        //backgroundColor: '#ffffff ',
        //borderTopColor: '#fff',
      },
      navText:{
        color:"#000000",
        fontSize:25,
        fontWeight:'bold',
        //backgroundColor: '#ffffff ',

      }
});