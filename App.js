// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
};


export default App;