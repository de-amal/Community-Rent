import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function RequestScreen() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.SERVER_ENDPOINT}app/requests`);
      const data = response.data;
      if (data.success) {
        setProducts(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const filteredProducts = products.filter(
    item => item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <Image source={{ uri: item.photoUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text>{item.productDetails}</Text>
        <Text>Phone: {item.memberId.phone}</Text>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text>RequestScreen</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
