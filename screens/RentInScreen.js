import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import config from '../config';

export default function RentInScreen() {
  const [rentedProducts, setRentedProducts] = useState([]);

  useEffect(() => {
    fetchRentedProducts();
  }, []);

  const fetchRentedProducts = async () => {
    try {
      const response = await axios.get(`${config.SERVER_ENDPOINT}app/my-items/rent-in`);
      console.log('Server Response:', response.data);
      if (response.data.success) {
        setRentedProducts(response.data.rentedProducts);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rented Products</Text>
      {rentedProducts.map((product) => (
        <View key={product._id} style={styles.productItem}>
          <Image source={{ uri: product.photoUrl }} style={styles.productImage} />
          <View>
            <Text style={styles.productName}>{product.productName}</Text>
            {product.memberId && (
              <View>
                <Text style={styles.memberName}>Member: {product.memberId.name}</Text>
                <Text style={styles.memberPhone}>Phone: {product.memberId.phone}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  memberPhone: {
    fontSize: 14,
  },
});
