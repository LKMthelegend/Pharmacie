// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import Database from '../Database';

const Input = ({medicine}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
    setModalVisible(!isModalVisible);
    }
  return (
    <View style={{ flex: 1 }}>
      <Button title="Entrer" onPress={toggleModal} />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal} // Android back button handling
        transparent={true} // Make the modal transparent to show the parent content
      >
        <View >
          {/* The modal content */}
          <View >
            <Text>{medicine.name}</Text>
            <Text>{medicine.description}</Text>
            <Text>{medicine.unity}</Text>
            <Text>{medicine.stock}</Text>
            <Text>{medicine.price}</Text>
            <Text>{medicine.Date_exp}</Text>

            {/* Close button (optional) */}
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default Input;