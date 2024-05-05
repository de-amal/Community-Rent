import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function MyRequestsScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${config.SERVER_ENDPOINT}app/my-items/requests`);
      const data = response.data;
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      await axios.delete(`${config.SERVER_ENDPOINT}app/my-items/requests/${requestId}`);
      // Refetch requests after deletion
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
      <Text style={styles.name}>{item.productName}</Text>
      <TouchableOpacity onPress={() => deleteRequest(item._id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
