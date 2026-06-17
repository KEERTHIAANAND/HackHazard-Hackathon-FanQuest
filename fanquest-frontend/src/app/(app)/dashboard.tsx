import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function FanDashboard() {
  const router = useRouter();
  // Mock Data
  const communities = [
    { id: 1, name: 'Fireship', image: 'https://i.pravatar.cc/150?u=fireship', hasNewQuests: true },
    { id: 2, name: 'Primeagen', image: 'https://i.pravatar.cc/150?u=prime', hasNewQuests: true },
    { id: 3, name: 'Vercel', image: 'https://i.pravatar.cc/150?u=vercel', hasNewQuests: false },
    { id: 4, name: 'T3 Dot GG', image: 'https://i.pravatar.cc/150?u=t3', hasNewQuests: false },
    { id: 5, name: 'Solana', image: 'https://i.pravatar.cc/150?u=sol', hasNewQuests: true },
  ];

  const frequentCommunities = [
    { id: 101, name: 'Fireship', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&q=80' },
    { id: 102, name: 'ThePrimeagen', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
    { id: 103, name: 'Vercel', image: 'https://images.unsplash.com/photo-1541216970279-affbf182dc72?w=200&q=80' },
    { id: 104, name: 'Pirate Software', image: 'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=200&q=80' },
  ];

  const discoverFactions = [
    {
      title: "More from your Creators",
      creators: [
        { id: 10, name: 'React Native Animations, Expo Router, and Fullstack Next.js...', banner: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?w=400&q=80' },
        { id: 11, name: 'Web3 Auth, Smart Contracts, Solidity, Ethers.js...', banner: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&q=80' },
        { id: 14, name: 'ThePrimeagen, Fireship, Theo - t3.gg, Pirate Software...', banner: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80' }
      ]
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      {/* Header */}
      <View style={{ paddingRight: 20, paddingTop: 16, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image 
          source={require('../../../assets/images/Final Logo.svg')} 
          style={{ width: 180, height: 40 }} 
          contentFit="contain"
        />
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#161B28', borderRadius: 20 }}>
          <MaterialCommunityIcons name="bell-outline" size={20} color="#CBD5E1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        {/* SECTION 1: My Communities */}
        <View style={{ marginTop: 10, marginBottom: 24 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
            {/* "Add New" Button */}
            <View style={{ alignItems: 'center', width: 72 }}>
              <TouchableOpacity style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#161B28', borderWidth: 1, borderColor: '#334155', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <MaterialCommunityIcons name="plus" size={28} color="#00E5FF" />
              </TouchableOpacity>
              <Text style={{ color: '#94A3B8', fontSize: 12, fontWeight: '600' }}>Discover</Text>
            </View>

            {/* Communities */}
            {communities.map(c => (
              <View key={c.id} style={{ alignItems: 'center', width: 72 }}>
                <TouchableOpacity 
                  onPress={() => router.push('/(app)/quests')}
                  style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: 32, 
                    padding: 3, 
                    backgroundColor: '#0B0F19',
                    borderWidth: 2,
                    borderColor: c.hasNewQuests ? '#00E5FF' : '#334155',
                    shadowColor: c.hasNewQuests ? '#00E5FF' : 'transparent',
                    shadowOpacity: c.hasNewQuests ? 0.6 : 0,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 0 },
                    marginBottom: 8
                  }}
                >
                  <Image source={{ uri: c.image }} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                </TouchableOpacity>
                <Text style={{ color: c.hasNewQuests ? 'white' : '#94A3B8', fontSize: 12, fontWeight: c.hasNewQuests ? 'bold' : '600', textAlign: 'center' }} numberOfLines={1}>
                  {c.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* SECTION 2: Global XP Wallet */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <View 
            style={{ 
              backgroundColor: 'rgba(22, 27, 40, 0.8)', 
              borderRadius: 24, 
              paddingVertical: 40, 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.08)',
              shadowColor: '#00E5FF',
              shadowOpacity: 0.15,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 10 },
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialCommunityIcons name="star-four-points" size={32} color="#00E5FF" style={{ marginRight: 12 }} />
              <Text style={{ fontFamily: 'Poppins_800ExtraBold', fontSize: 56, color: 'white', letterSpacing: -1 }}>
                24,500
              </Text>
            </View>
            <Text style={{ color: '#94A3B8', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 }}>
              Total Platform XP
            </Text>
          </View>
        </View>

        {/* SECTION 2.5: Frequent Communities (Top 4) */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <Text style={{ fontFamily: 'Poppins_800ExtraBold', color: 'white', fontSize: 24, marginBottom: 16 }}>
            Jump Back In
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {frequentCommunities.map((community) => (
              <TouchableOpacity 
                key={community.id}
                onPress={() => router.push('/(app)/quests')}
                style={{ 
                  width: '48%', 
                  backgroundColor: '#2A3041', 
                  borderRadius: 6, 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  overflow: 'hidden',
                  marginBottom: 10
                }}
                activeOpacity={0.8}
              >
                <Image 
                  source={{ uri: community.image }} 
                  style={{ width: 56, height: 56, backgroundColor: '#161B28' }} 
                  contentFit="cover" 
                />
                <Text 
                  style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 13, paddingHorizontal: 10 }} 
                  numberOfLines={2}
                >
                  {community.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SECTION 3: Discover Factions */}
        <View style={{ paddingBottom: 40 }}>
          {discoverFactions.map((faction, i) => (
            <View key={i} style={{ marginBottom: 32 }}>
              <Text style={{ fontFamily: 'Poppins_800ExtraBold', color: 'white', fontSize: 24, paddingHorizontal: 20, marginBottom: 16 }}>
                {faction.title}
              </Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
                {faction.creators.map(creator => (
                  <TouchableOpacity 
                    key={creator.id}
                    style={{ 
                      width: 160, 
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={{ position: 'relative' }}>
                      <Image 
                        source={{ uri: creator.banner }} 
                        style={{ width: 160, height: 160, borderRadius: 8, backgroundColor: '#161B28' }} 
                        contentFit="cover" 
                      />
                    </View>
                    <Text 
                      style={{ color: '#A7A7A7', fontSize: 13, fontWeight: '500', marginTop: 10, lineHeight: 18 }} 
                      numberOfLines={2}
                    >
                      {creator.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
