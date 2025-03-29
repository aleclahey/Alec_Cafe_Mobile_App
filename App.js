import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductPage from './pages/ProductPage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="ProductOverviewPage" component={ProductOverviewPage} />
      <Stack.Screen name="ReviewsPage" component={ReviewsPage} />

      <Stack.Screen name="HomePage" component={HomePage} />

    </Stack.Navigator>
  </NavigationContainer>  );
}
