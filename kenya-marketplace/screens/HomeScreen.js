import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for listings
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'iPhone 12 Pro Max',
    price: 'KSh 85,000',
    location: 'Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    category: 'Electronics',
    date: '2 days ago'
  },
  {
    id: '2',
    title: 'Toyota Prado TX 2018',
    price: 'KSh 4,500,000',
    location: 'Westlands, Nairobi',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Vehicles',
    date: '1 day ago'
  },
  {
    id: '3',
    title: '3 Bedroom Apartment for Rent',
    price: 'KSh 45,000/month',
    location: 'Kilimani, Nairobi',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Property',
    date: '3 hours ago'
  },
  {
    id: '4',
    title: 'Samsung 55" Smart TV',
    price: 'KSh 65,000',
    location: 'Mombasa Road',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Electronics',
    date: '5 days ago'
  },
  {
    id: '5',
    title: 'Office Desk and Chair',
    price: 'KSh 18,500',
    location: 'Ngong Road',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    category: 'Furniture',
    date: 'Just now'
  },
  {
    id: '6',
    title: 'MacBook Pro 2020',
    price: 'KSh 150,000',
    location: 'Karen, Nairobi',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    category: 'Electronics',
    date: '1 week ago'
  },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'property', name: 'Property' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'services', name: 'Services' },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings, setListings] = useState(MOCK_LISTINGS);

  // Filter listings based on search and category
  useEffect(() => {
    let filteredListings = MOCK_LISTINGS;
    
    // Filter by search query
    if (searchQuery) {
      filteredListings = filteredListings.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredListings = filteredListings.filter(listing => 
        listing.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setListings(filteredListings);
  }, [searchQuery, selectedCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => navigation.navigate('ListingDetails', { listing: item })}
    >
      <Image source={{ uri: item.image }} style={styles.listingImage} />
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.listingPrice}>{item.price}</Text>
        <View style={styles.listingMeta}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.listingLocation} numberOfLines={1}>{item.location}</Text>
          </View>
          <Text style={styles.listingDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SokoKuu</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />
      
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listingsContainer}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No listings found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  categoriesList: {
    maxHeight: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryButton: {
    backgroundColor: '#FF6B00',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  listingsContainer: {
    padding: 8,
  },
  listingCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listingImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  listingInfo: {
    padding: 10,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  listingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listingLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
    flex: 1,
  },
  listingDate: {
    fontSize: 10,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
});
