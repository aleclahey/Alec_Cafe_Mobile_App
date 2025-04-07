//File to upload initial data to datebase for products

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from './FirebaseConfig.js';

// Initialize Firestore
const db = getFirestore(app);

//Reviews
const reviews = [
        
  // Reviews for Sourdough Bread Loaf
  { id: '1', product: 'Sourdough Bread Loaf', name: 'Eva Roberts', review: 'The sourdough is perfectly tangy and chewy!' },
  { id: '2', product: 'Sourdough Bread Loaf', name: 'Noah Williams', review: 'Great for sandwiches, very satisfying.' },
  { id: '3', product: 'Sourdough Bread Loaf', name: 'Oliver King', review: 'Crispy crust with a soft interior, just the way I like it.' },

  // Reviews for Baguette
  { id: '4', product: 'Baguette', name: 'John Doe', review: 'Amazing place, would visit again!' },
  { id: '5', product: 'Baguette', name: 'Jane Smith', review: 'Great ambiance and friendly staff.' },
  { id: '6', product: 'Baguette', name: 'Alex Johnson', review: 'Delicious food and excellent service!' },

  // Reviews for Focaccia Panini
  { id: '7', product: 'Focaccia Panini', name: 'Lucas Allen', review: 'The focaccia was warm and flavorful, loved the fresh basil.' },
 

  // Reviews for Sourdough Chicken Sandwich
  { id: '8', product: 'Sourdough Chicken Sandwich', name: 'Grace Walker', review: 'The chicken was tender and juicy, loved the sourdough!' },
 

  // Reviews for Latte
  { id: '9', product: 'Latte', name: 'Aiden Clark', review: 'The latte was rich and creamy, perfect for a chilly day.' },
  

  // Reviews for Cappuccino
  { id: '10', product: 'Cappuccino', name: 'Harper Lewis', review: 'Velvety foam and rich espresso, my favorite drink.' },
  

  // Reviews for Iced Latte
  { id: '11', product: 'Iced Latte', name: 'Samuel Hall', review: 'Cool and refreshing, perfect for hot summer days!' },
  
  // Reviews for Croissant
  { id: '12', product: 'Croissant', name: 'Oliver Adams', review: 'Flaky and buttery, the perfect start to my morning.' },
  

  // Reviews for Cream Puff
  { id: '13', product: 'Cream Puff', name: 'Lily Green', review: 'Light and fluffy, the filling was perfect!' },
  

  // Reviews for Raspberry Scone
  { id: '14', product: 'Raspberry Scone', name: 'Chloe Evans', review: 'Delicious, perfect crumb and raspberry flavor.' },
 

  // Reviews for Butter Tart
  { id: '15', product: 'Butter Tart', name: 'Oliver Cooper', review: 'A true Canadian classic. Rich, buttery filling with a perfect balance of sweetness.' },


  

];

const addReviewToFirestore = async (review) => {
    try {
      const reviewsCollectionRef = collection(db, 'reviews');
      
      const docRef = await addDoc(reviewsCollectionRef, review);
      console.log("Review added with ID:", docRef.id);
    } catch (e) {
      console.error("Error adding review: ", e);
    }
  };
  
  const addAllReviews = async () => {
    for (let review of reviews) {
      await addReviewToFirestore(review);
    }
  };
  
  addAllReviews();