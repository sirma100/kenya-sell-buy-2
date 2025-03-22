import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Mock data for user listings and stats
  const userListings = [
    {
      id: 'l1',
      title: 'Samsung Galaxy S21',
      price: 'KSh 65,000',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      status: 'active',
      views: 45
    },
    {
      id: 'l2',
      title: 'Leather Sofa Set',
      price: 'KSh 35,000',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      status: 'active',
      views: 23
    },
    {
      id: 'l3',
      title: 'MacBook Pro 2019',
      price: 'KSh 120,000',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      status: 'sold',
      views: 78
    }
  ];
  
  const userStats = {
    totalListings: 8,
    activeSelling: 5,
    sold: 3,
    totalViews: 342,
    favorited: 18,
    responseRate: '95%'
  };

  const changeProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // In a real app, you would upload this to your server
      Alert.alert('Success', 'Profile picture updated successfully!');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => logout()
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={changeProfilePicture}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                style={styles.avatar} 
              />
              <View style={styles.editAvatarButton}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.memberSince}>Member since May 2022</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>4.8 (24 reviews)</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.totalListings}</Text>
          <Text style={styles.statLabel}>Listings</Text>
        </View>
        <View style={styles.statD<boltAction type="file" filePath="kenya-marketplace/screens/ListingDetailsScreen.js">import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Share,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ListingDetailsScreen({ route, navigation }) {
  const { listing } = route.params;
  
  // Mock seller data
  const seller = {
    id: 's1',
    name: 'John Kamau',
    rating: 4.8,
    memberSince: 'May 2020',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '+254712345678'
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this listing on SokoKuu: ${listing.title} - ${listing.price}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${seller.phone}`);
  };

  const handleChat = () => {
    navigation.navigate('Chat', { 
      sellerId: seller.id,
      name: seller.name,
      avatar: seller.avatar,
      listingId: listing.id,
      listingTitle: listing.title
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: listing.image }} style={styles.image} />
        
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.category}>{listing.category}</Text>
              <Text style={styles.title}>{listing.title}</Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={22} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>{listing.price}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location}>{listing.location}</Text>
            <Text style={styles.date}>{listing.date}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {listing.description || 'This is a detailed description of the item. The seller has provided information about the condition, features, and other relevant details about the product.'}
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerContainer}>
            <Image source={{ uri: seller.avatar }} style={styles.sellerAvatar} />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{seller.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.sellerRating}>{seller.rating} • Member since {seller.memberSince}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: width * 0.75,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  shareButton: {
    padding: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
