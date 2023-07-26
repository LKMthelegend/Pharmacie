import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Modal,StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Database from '../Database';

export default function InputModal({medicine}) {
    const[showModal,setShowModal]=useState(false);
    const[qte,setQte]=useState(0);

  const handleSubmit = (values) => {
        // Insérer les valeurs dans la base de données SQLite
    Database.putMedicine(medicine.id,qte)
    };
 
    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
          <Modal visible={showModal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
             <MaterialIcons
                 name="close"
                size={24}
                onPress={()=>{setShowModal(false)}}
            />
        <Text>Entrée du médicamenent {medicine.name}</Text>   
  
                <TextInput
                style={styles.input}
                placeholder="Prix"
                keyboardType="numeric"
                value={qte}
                onChangeText={setQte}
            />  
                    <Button title="Faire entrée" onPress={handleSubmit} />
           </View>             
         </TouchableWithoutFeedback>
         </Modal>
        <Button
            onPress={()=>{setShowModal(true)}}
            title="Entrée"
        />  
    </View>
  );
}

