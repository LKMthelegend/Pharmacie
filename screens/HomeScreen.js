// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList, TextInput, TouchableOpacity, StyleSheet, Button, Alert  } from 'react-native';
import Database from '../Database';
// import Input from './Input';


const HomeScreen = () => {
  const [medicines, setMedicines] = useState([]);
  const [quantityOutput, setQuantityOutput] = useState(0);
  const [quantityInput, setQuantityInput] = useState(0);
  const [newMedicineName, setNewMedicineName] = useState('');
  const [newMedicineDescription, setNewMedicineDescription] = useState('');
  const [newMedicineUnity, setNewMedicineUnity] = useState('');
  const [newMedicineStock, setNewMedicineStock] = useState('');
  const [newMedicinePrice, setNewMedicinePrice] = useState('');
  const [newMedicineDate_exp, setNewMedicineDate_exp] = useState('');

   //verifier si le médicament est expiré
   const isExpired = (date) => {
    const currentDate = new Date();
    const expirationDate = new Date(date);
    return expirationDate < currentDate;
    };
  // Charger les médicaments depuis la base de données lors du chargement de l'application
  useEffect(() => {
    Database.createTable();
    Database.getAllMedicines(medicines => setMedicines(medicines));
  }, []);

  // Fonction pour ajouter un nouveau médicament dans la base de données
  const addMedicine = () => {
    if (newMedicineName && setNewMedicineDescription) {
      Database.insertMedicine(newMedicineName, newMedicineDescription, newMedicineUnity, parseInt(newMedicineStock), parseInt(newMedicinePrice), newMedicineDate_exp);
      setNewMedicineName('');
      setNewMedicineDescription('');
      setNewMedicineUnity('');
      setNewMedicineStock('');
      setNewMedicinePrice('');
      setNewMedicineDate_exp('');
      Database.getAllMedicines(medicines => setMedicines(medicines));
    }
  };

  // Fonction pour supprimer un médicament de la base de données
  const deleteMedicine = (id) => {
    Database.deleteMedicine(id);
    Database.getAllMedicines(medicines => setMedicines(medicines));
  };
  const inputMed=(id,qte) =>{
    Database.putMedicine(id,qte);
    Database.getAllMedicines(medicines => setMedicines(medicines));
  }
  const outputMed=(id,qte,stock) =>{
    const qteOut=-qte;
    if(stock>=qte){
      Database.putMedicine(id,qteOut);
      Database.getAllMedicines(medicines => setMedicines(medicines));
    }else{
      Alert.alert("Stock insuffisant")
    }
  }

  return (
    <View style={styles.container}>
      

<Text style={styles.title}>Gestion de stock de médicaments</Text>

{/* Afficher la liste des médicaments */}
<FlatList
  style={styles.medicinesList}
  data={medicines}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text> {item.description}</Text>
      <Text> {item.unity}</Text>
      <Text> {item.stock}</Text>
      <Text> {item.price}</Text>
      <Text> {item.date_exp} {isExpired(item.date_exp)?("Expiré"):("Non expiré")}</Text>
      <TouchableOpacity onPress={() => deleteMedicine(item.id)}>
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
      <View>
        <TextInput
         style={styles.input}
         placeholder="Entrer"
         keyboardType="numeric"
         value={quantityInput}
         onChangeText={setQuantityInput}
        />
        <Button
        title='Entrer'
        onPress={() =>inputMed(item.id,parseInt(quantityInput))}
        />
      
        <TextInput
         style={styles.input}
         placeholder="Sortie"
         keyboardType="numeric"
         value={quantityOutput}
         onChangeText={setQuantityOutput}
        />
        <Button
        title='Sortie'
        onPress={() =>outputMed(item.id,parseInt(quantityOutput),item.stock)}
        />
      </View>
      
      {/* <TouchableOpacity >
        <Input medicine={item} />
      </TouchableOpacity> */}
    </View>
  )}
/>

{/* Ajouter un nouveau médicament */}
<View style={styles.addMedicineContainer}>
  <TextInput
    style={styles.input}
    placeholder="Nom du médicament"
    value={newMedicineName}
    onChangeText={setNewMedicineName}
  />
  <TextInput
    style={styles.input}
    placeholder="Description"
    value={newMedicineDescription}
    onChangeText={setNewMedicineDescription}
  />
  <TextInput
    style={styles.input}
    placeholder="Unité"
    value={newMedicineUnity}
    onChangeText={setNewMedicineUnity}
  />
  <TextInput
    style={styles.input}
    placeholder="Quantité"
    keyboardType="numeric"
    value={newMedicineStock}
    onChangeText={setNewMedicineStock}
  />
  <TextInput
    style={styles.input}
    placeholder="Prix"
    keyboardType="numeric"
    value={newMedicinePrice}
    onChangeText={setNewMedicinePrice}
  />
  <TextInput
    style={styles.input}
    placeholder="YYYY-MM-DD"
    value={newMedicineDate_exp}
    onChangeText={setNewMedicineDate_exp}
  />
  <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
    <Text style={styles.addButtonText}>Ajouter</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginVertical: 20,
  //   textAlign: 'center',
  // },
  // medicinesList: {
  //   marginBottom: 20,
  // },
  // medicineItem: {
  //   backgroundColor: '#f0f0f0',
  //   padding: 10,
  //   marginBottom: 10,
  //   borderRadius: 5,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // medicineName: {
  //   flex: 1,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginRight: 10,
  // },
  // // deleteButton: {
  // //   backgroundColor: 'red',
  // //   borderRadius: 5,
  // //   padding: 5,
  // // },
  // // deleteButtonText: {
  // //   color: 'white',
  // //   fontWeight: 'bold',
  // // },
  // addMedicineContainer: {
  //   padding: 10,
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 5,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // addButton: {
  //   backgroundColor: 'blue',
  //   borderRadius: 5,
  //   padding: 10,
  //   alignItems: 'center',
  // },
  // addButtonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
});

export default HomeScreen;
