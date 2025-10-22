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
import { MenuItem, Course } from './src/types/types';


// --- Main App Function ---
export default function App() {
  //  State: store all menu items here
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  //  State: temporary input values for adding new dishes
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starter');

  //  Function: add a new menu item
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

  // Count items by course
  const totalItems = menuItems.length;
  const startersCount = menuItems.filter(m => m.course === 'Starter').length;
  const mainsCount = menuItems.filter(m => m.course === 'Main').length;
  const dessertsCount = menuItems.filter(m => m.course === 'Dessert').length;

  //  UI layout
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <Text style={styles.title}>NU CHEF</Text>
{/* Placeholder Bottom Bar */}
<View style={styles.bottomBar}>
  <Text style={styles.bottomText}> Home</Text>
  <Text style={styles.bottomText}> Add</Text>
  <Text style={styles.bottomText}>Menu</Text>
</View>
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
        /
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
    paddingHorizontal: 16,
    paddingTop: 30,
  },

  // ---------- HEADER ----------
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
  },

  // ---------- COUNTS ----------
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  countText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },

  // ---------- TABS ----------
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },

  // ---------- TOTAL ----------
  totalRow: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 10,
  },
  totalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ---------- FORM ----------
  form: {
    marginVertical: 15,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    color: '#000',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // ---------- MENU LIST ----------
  itemCard: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    marginBottom: 3,
  },
  itemDesc: {
    color: '#444',
    marginBottom: 4,
  },
  itemCourse: {
    fontStyle: 'italic',
    color: '#777',
    fontSize: 12,
  },
  itemPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
  },

  // ---------- BOTTOM BAR ----------
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  bottomText: {
    color: '#000',
    fontWeight: '600',
  },
});