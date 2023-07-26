// Database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Medica.db');

// Créer la table "medicines" si elle n'existe pas
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS medicines (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, unity TEXT, price REAL, stock INTEGER, date_exp DATE)',
      [],
      () => console.log('Table "medicines" créée avec succès !'),
      (_, error) => console.error('Erreur lors de la création de la table "medicines":', error)
    );
  });
};

// Insérer un médicament dans la base de données
const insertMedicine = (name, description, unity,  stock, price, date_exp) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO medicines (name, description, unity, stock, price, date_exp ) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, unity, stock, price, date_exp],
      (_, { insertId }) => console.log('Médicament inséré avec succès, ID : ', insertId),
      (_, error) => console.error('Erreur lors de l\'insertion du médicament:', error)
    );
  });
};

// Lire tous les médicaments de la base de données
const getAllMedicines = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM medicines',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error('Erreur lors de la lecture des médicaments:', error)
    );
  });
};

// Mettre à jour un médicament dans la base de données
const updateMedicine = (id, name, description, unity, price, stock, date_exp) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE medicines SET name = ?, description = ?, unity = ?, price = ?, stock = ?, date_exp = ? WHERE id = ?',
      [name, description, unity, price, stock, date_exp, id],
      () => console.log('Médicament mis à jour avec succès !'),
      (_, error) => console.error('Erreur lors de la mise à jour du médicament:', error)
    );
  });
};

// Mettre à jour le stock de médicament dans la base de données
const putMedicine = (id,qte) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE medicines SET  stock =stock + ? WHERE id = ?',
      [qte, id],
      () => console.log('Médicament mis à jour avec succès !'),
      (_, error) => console.error('Erreur lors de la mise à jour du médicament:', error)
    );
  });
};

// Supprimer un médicament de la base de données
const deleteMedicine = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM medicines WHERE id = ?',
      [id],
      () => console.log('Médicament supprimé avec succès !'),
      (_, error) => console.error('Erreur lors de la suppression du médicament:', error)
    );
  });
};

export default {
  createTable,
  insertMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
  putMedicine,
};
