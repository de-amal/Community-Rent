import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import axios from 'axios';
import config from '../config';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('request');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      setPhoto(null);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setPhoto(null);
      setTitle('');
      setDescription('');
      setSelectedOption('request');
    }, [])
  );

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
    }
  };

  const sendData = () => {
    // Send data to server based on selected radio button option
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Selected Option:", selectedOption);
    console.log("Photo:", photo); // This will be null if no photo was taken
    
    if( selectedOption ==='rent'){
      console.log('post for rent');

      const formData = new FormData();

    // Append title and description as fields
    formData.append('productName', title);
    formData.append('productDetails', description);

    // Append the photo as a file
    if (photo) {
      const photoUriParts = photo.uri.split('.');
      const fileType = photoUriParts[photoUriParts.length - 1];
      const fileName = `photo.${fileType}`;
      formData.append('productPicture', {
        uri: photo.uri,
        type: `image/${fileType}`,
        name: fileName,
      });
    }

    axios.post(`${config.SERVER_ENDPOINT}app/post/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      console.log('Response from server:', response.data);
      if(response.data.message=="New product created"){
      Alert.alert("Post Created");
      setTitle('');
      setDescription('');
      setPhoto(null);

      }
    })
    .catch(error => {
      console.error('Error posting for rent:', error);
      // Handle error
    });
  }
    else{
      console.log('post for request');

      const formData = new FormData();

    // Append title and description as fields
    formData.append('productName', title);
    formData.append('productDetails', description);

    // Append the photo as a file
    if (photo) {
      const photoUriParts = photo.uri.split('.');
      const fileType = photoUriParts[photoUriParts.length - 1];
      const fileName = `photo.${fileType}`;
      formData.append('productPicture', {
        uri: photo.uri,
        type: `image/${fileType}`,
        name: fileName,
      });
    }

      axios.post(`${config.SERVER_ENDPOINT}app/post/requests`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      console.log('Response from server:', response.data);
      if(response.data.message=="New product created"){
      Alert.alert("Post Created");
      setTitle('');
      setDescription('');
      setPhoto(null);

      }
    })
    .catch(error => {
      console.error('Error posting for rent:', error);
      // Handle error
    });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {photo == null && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
              <TouchableOpacity style={styles.innerbutton} onPress={takePicture}/>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {photo && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.photo} />
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, selectedOption === 'request' && styles.radioButtonSelected]}
              onPress={() => setSelectedOption('request')}
            >
              <Text style={styles.radioButtonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, selectedOption === 'rent' && styles.radioButtonSelected]}
              onPress={() => setSelectedOption('rent')}
            >
              <Text style={styles.radioButtonText}>Rent</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={sendData} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent:'center',
    marginBottom: 20,
    paddingLeft:10,
    width:90,
    height:90
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 20,
    width:70,
    height:70,
    borderRadius: 90,
  },
  innerbutton:{
    backgroundColor: '#959994',
    padding: 15,
    width:50,
    height:50,
    paddingHorizontal: 20,
    borderRadius: 90,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: 200,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    marginHorizontal: 10,
    padding: 10,
    width :80,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems:'center'
  },
  radioButtonSelected: {
    backgroundColor: '#7c993e',
  },
  radioButtonText: {
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#043404',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
  },
});
