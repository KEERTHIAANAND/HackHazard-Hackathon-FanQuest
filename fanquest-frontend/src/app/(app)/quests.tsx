import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

export default function QuestBoard() {
  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-dark-border">
        <Image 
          source={require('../../../assets/images/Final Logo.svg')} 
          style={{ width: 140, height: 28 }} 
          contentFit="contain"
        />
        <View className="bg-dark-card px-3 py-1.5 rounded-full flex-row items-center border border-brand-neon/30">
          <MaterialCommunityIcons name="star-four-points" size={16} color="#00E5FF" />
          <Text className="text-brand-neon font-bold ml-1.5">2,450 XP</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Quick Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4 px-5 max-h-16">
          {['All Factions', 'Primeagen', 'Fireship', 'Vercel'].map((filter, i) => (
            <TouchableOpacity 
              key={filter} 
              className={`mr-3 px-4 py-2 rounded-full border ${i === 0 ? 'bg-brand-neon/10 border-brand-neon' : 'bg-dark-card border-dark-border'}`}
            >
              <Text className={`${i === 0 ? 'text-brand-neon font-bold' : 'text-gray-400'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Quest Card */}
        <View className="px-5 mb-6">
          <Text className="text-gray-400 font-semibold mb-3 uppercase tracking-widest text-xs">Hero Bounty</Text>
          <View className="bg-dark-card rounded-2xl border border-brand-accent/40 overflow-hidden relative">
            <View className="absolute top-0 right-0 bg-brand-accent/20 px-3 py-1 rounded-bl-xl border-b border-l border-brand-accent/40">
              <Text className="text-brand-accent font-bold text-xs">LIMITED TIME</Text>
            </View>
            <View className="p-5">
              <View className="flex-row items-center mb-3 mt-2">
                <View className="w-10 h-10 rounded-full bg-black border border-dark-border items-center justify-center mr-3">
                  <MaterialCommunityIcons name="github" size={24} color="#FFF" />
                </View>
                <View>
                  <Text className="text-white font-bold">Vercel OSS</Text>
                  <Text className="text-gray-400 text-xs">Sponsor</Text>
                </View>
              </View>
              <Text className="text-xl font-bold text-white mb-2">Submit a valid PR to Next.js repo</Text>
              <Text className="text-gray-400 text-sm mb-4 leading-5">Our AI validator will review your PR. Earn massive XP for accepted contributions.</Text>
              
              <TouchableOpacity className="bg-brand-neon py-3 rounded-xl flex-row justify-center items-center">
                <Text className="text-black font-extrabold text-base mr-2">ACCEPT QUEST</Text>
                <MaterialCommunityIcons name="sword-cross" size={18} color="#000" />
              </TouchableOpacity>
            </View>
            <View className="bg-black/40 py-2.5 flex-row justify-center items-center border-t border-dark-border">
              <MaterialCommunityIcons name="star-circle" size={18} color="#7C3AED" />
              <Text className="text-brand-accent font-bold ml-1.5">+5,000 XP REWARD</Text>
            </View>
          </View>
        </View>

        {/* Action Feed */}
        <View className="px-5">
          <Text className="text-gray-400 font-semibold mb-3 uppercase tracking-widest text-xs">Action Feed</Text>
          
          {/* List Items */}
          {[
            { title: 'Watch Latest Devlog', creator: 'Fireship', xp: 50, icon: 'play-circle', color: '#FF0000' },
            { title: 'Join Discord Server', creator: 'Primeagen', xp: 100, icon: 'chat', color: '#5865F2' },
            { title: 'Retweet Launch Post', creator: 'Vercel', xp: 75, icon: 'share-variant', color: '#1DA1F2' }
          ].map((action, i) => (
            <TouchableOpacity key={i} className="bg-dark-card border border-dark-border rounded-xl p-4 flex-row items-center mb-3">
              <View className="w-12 h-12 rounded-lg bg-black border border-dark-border items-center justify-center mr-4">
                <MaterialCommunityIcons name={action.icon as any} size={24} color={action.color} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-base mb-1">{action.title}</Text>
                <Text className="text-gray-400 text-xs">{action.creator}</Text>
              </View>
              <View className="bg-dark-bg px-3 py-1.5 rounded-lg border border-dark-border">
                <Text className="text-brand-neon font-bold text-xs">+{action.xp} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
