// App.tsx
// Part 2 - Basic UI + State Management for Menu
// ------------------------------------------------
// This is the main screen where the chef can add dishes,
// view menu counts, and browse by course (Starters, Mains, Desserts).

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import type { MenuItem, Course } from './src/types';

// --- Main App Function ---
export default function App() {
  // 1️⃣ State: store all menu items here
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // 2️⃣ State: temporary input values for adding new dishes
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starter');

  // 3️⃣ Function: add a new menu item
  const addMenuItem = () => {
    if (!dishName || !description || !price) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description,
      course: selectedCourse,
      price: parseFloat(price),
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setPrice('');
  };

  // 4️⃣ Count items by course
  const totalItems = menuItems.length;
  const startersCount = menuItems.filter(m => m.course === 'Starter').length;
  const mainsCount = menuItems.filter(m => m.course === 'Main').length;
  const dessertsCount = menuItems.filter(m => m.course === 'Dessert').length;

  // 5️⃣ UI layout
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <Text style={styles.title}>NU CHEF</Text>

      {/* Counts */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>Total: {totalItems}</Text>
        <Text style={styles.countText}>Starters: {startersCount}</Text>
        <Text style={styles.countText}>Mains: {mainsCount}</Text>
        <Text style={styles.countText}>Desserts: {dessertsCount}</Text>
      </View>

      {/* Course Tabs */}
      <View style={styles.tabRow}>
        {(['Starter', 'Main', 'Dessert'] as Course[]).map(course => (
          <TouchableOpacity
            key={course}
            style={[
              styles.tab,
              selectedCourse === course && styles.activeTab,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCourse === course && styles.activeTabText,
              ]}
            >
              {course}s
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Menu Item Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Dish name"
          placeholderTextColor="#888"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
          <Text style={styles.addButtonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      {/* Filtered Menu List */}
<FlatList
  data={menuItems.filter(item => item.course === selectedCourse)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemCourse}>{item.course}</Text>
            <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  countText: {
    color: '#000',
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  form: {
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 8,
    marginVertical: 6,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  itemDesc: {
    color: '#333',
  },
  itemCourse: {
    fontStyle: 'italic',
    color: '#555',
  },
  itemPrice: {
    color: '#000',
    fontWeight: 'bold',
  },
});
