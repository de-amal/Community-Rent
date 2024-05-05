import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../config';

export default function MyRequestsScreen() {
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    axios.get(`${config.SERVER_ENDPOINT}leader/join-requests`)
      .then(response => {
        if (response.data && response.data.joinRequests) {
          setJoinRequests(response.data.joinRequests);
        } else {
          setJoinRequests([]);
        }
      })
      .catch(error => {
        console.log("Error fetching join requests:", error);
      });
  }, []);

  const approveRequest = (requestId) => {
    axios.post(`${config.SERVER_ENDPOINT}leader/approve-request`, { userId:requestId })
      .then(response => {
        console.log("Join request approved:", requestId);
        // Remove the approved request from the local state
        setJoinRequests(joinRequests.filter(request => request._id !== requestId));
      })
      .catch(error => {
        console.log("Error approving join request:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Join Requests</Text>
      {joinRequests && joinRequests.length > 0 ? (
        joinRequests.map(request => (
          <View key={request._id} style={styles.requestContainer}>
            <Text>Name: {request.name}</Text>
            <Text>Email: {request.email}</Text>
            <Text>Phone: {request.phone}</Text>
            <TouchableOpacity onPress={() => approveRequest(request._id)} style={styles.button}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No join requests</Text>
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
  requestContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#B5C18E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
