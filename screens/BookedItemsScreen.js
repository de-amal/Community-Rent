import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import config from '../config';

export default function BookedItems() {
  const [bookedProducts, setBookedProducts] = useState([]);

  useEffect(() => {
    fetchBookedProducts();
  }, []);

  const fetchBookedProducts = async () => {
    try {
      const response = await axios.get(`${config.SERVER_ENDPOINT}app/booked-products`);
      console.log(response.data);
      if (response.data.success) {
        setBookedProducts(response.data.bookedProducts || []);
      } else {
        console.log('Failed to fetch booked products:', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching booked products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booked Items</Text>
      <View style={styles.bookedItemsContainer}>
        {bookedProducts !== null && bookedProducts.length > 0 ? (
          bookedProducts.map((product, index) => (
            <View key={index} style={styles.bookedItem}>
              <Image source={{ uri: product.photoUrl }} style={styles.productImage} />
              <Text>Product Name: {product.productName}</Text>
              <Text>Member Name: {product.memberName}</Text>
              <Text>Member Phone: {product.memberPhone}</Text>
              {/* Add additional product details as needed */}
            </View>
          ))
        ) : (
          <Text>No booked items</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookedItemsContainer: {
    marginTop: 10,
  },
  bookedItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
});
