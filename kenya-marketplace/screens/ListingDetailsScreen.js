import React from 'react';
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
              <Ionicons name="share-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>{listing.price}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={16} color="#666" /> {listing.location}
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a detailed description of the item. The seller has provided information about the condition, features, and other relevant details about this product.
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerContainer}>
            <Image source={{ uri: seller.avatar }} style={styles.sellerAvatar} />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{seller.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.sellerRating}>{seller.rating} • Member since {seller.memberSince}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Ionicons name="call-outline" size={20} color="#FF6B00" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
          <Text style={styles.chatButtonText}>Chat with Seller</Text>
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
    fontSize: 22,
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
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
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
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 8,
    marginRight: 12,
  },
  callButtonText: {
    color: '#FF6B00',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  chatButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FF6B00',
    borderRadius: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
