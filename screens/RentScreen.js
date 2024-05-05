import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import config from '../config';

export default function TabScreen1() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [rentTrigger, setRentTrigger] = useState(false); // Add state for triggering re-render
  const [loading, setLoading] = useState(false); // Add state for tracking loading status

  useEffect(() => {
    fetchProducts();
  }, [rentTrigger]); // Add rentTrigger as a dependency

  const fetchProducts = async () => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await axios.get(`${config.SERVER_ENDPOINT}app/products`);
      const data = response.data;
      console.log('Items:', data);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log('Error fetching items:', error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const filteredProducts = products.filter(
    item => item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <Image source={{ uri: item.photoUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text>{item.productDetails}</Text>
          <Text>Phone: {item.memberId.phone}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => rentItem(item)}>
          <Text style={styles.buttonText}>RENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const rentItem = async (product) => {
    try {
      setLoading(true); // Set loading to true before making the request
      await axios.post(`${config.SERVER_ENDPOINT}app/book/products`, {
        productId: product._id
      });
      // Toggle rentTrigger to trigger re-render
      setRentTrigger(prevState => !prevState);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
    console.log("Product rented:", product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rent Items</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      {loading ? ( // Display loading indicator if loading is true
        <ActivityIndicator size="large" color="#1c7337" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item._id}
          style={styles.productList}
        />
      )}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  productList: {
    marginTop: 10,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1c7337',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
