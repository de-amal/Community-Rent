import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

export default function RentOutScreen() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${config.SERVER_ENDPOINT}app/my-items/rent-out`);
        console.log('Server Response:', response.data);
        setProducts(response.data.myProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleBookingButtonPress = (product) => {
    setSelectedProduct(product);
    setShowBookingsModal(true);
  };

  const renderProductCard = (product) => {
    return (
      <View key={product._id} style={[styles.card, { backgroundColor: product.isRented ? '#FFC0CB' : '#90EE90' }]}>
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.details}>{product.productDetails}</Text>
        <TouchableOpacity style={styles.bookingButton} onPress={() => handleBookingButtonPress(product)}>
          <Text>Bookings</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBookingItem = ({ item }) => {
    return (
      <View style={styles.bookingItem}>
        <Text>Name: {item.name}</Text>
        <Text>Karma Points: {item.karma}</Text>
        <Text>Phone: {item.phone}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={()=>{
          // Pass productId and UserId to the server
          const productId = selectedProduct?._id;
          const userId = item._id;
          axios.post(`${config.SERVER_ENDPOINT}app/grant-booking`,{
            productId: productId,
            userId: userId
          }).then((response) => {
            // Handle success response
            console.log('Booking confirmed:', response.data);
          }).catch((error) => {
            // Handle error
            console.error('Error confirming booking:', error);
          });
        }}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {products.map(product => renderProductCard(product))}
      <Modal visible={showBookingsModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bookings for {selectedProduct?.productName}</Text>
          <Text style={styles.productId}>Product ID: {selectedProduct?._id}</Text>
          <FlatList
            data={selectedProduct?.bookedBy}
            renderItem={renderBookingItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowBookingsModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#90EE90',
    padding: 5,
    borderRadius: 5,
  },

  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookingButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productId: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});
