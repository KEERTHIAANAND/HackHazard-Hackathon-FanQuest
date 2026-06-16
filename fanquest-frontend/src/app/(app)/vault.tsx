import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

export default function Vault() {
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

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24, paddingTop: 20 }}>
        
        {/* The Paywall Teasers (Locked Content) */}
        <View className="px-5 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Locked Rewards</Text>
            <MaterialCommunityIcons name="lock" size={14} color="#64748B" />
          </View>
          
          {/* Locked Card */}
          <View className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden relative opacity-80">
            {/* Fake Blur Effect Layer */}
            <View className="absolute inset-0 bg-black/60 z-10 items-center justify-center backdrop-blur-md">
              <MaterialCommunityIcons name="lock-outline" size={48} color="#fff" style={{ opacity: 0.5 }} />
              <Text className="text-white font-bold text-lg mt-2">VIP Source Code</Text>
              <Text className="text-gray-300 text-sm mb-4">Requires 5,000 XP to Unlock</Text>
              <TouchableOpacity className="bg-dark-bg border border-brand-accent px-6 py-2.5 rounded-xl flex-row items-center">
                <Text className="text-brand-accent font-bold mr-2">NOT ENOUGH XP</Text>
              </TouchableOpacity>
            </View>

            <View className="p-5 opacity-20">
              <View className="flex-row items-center mb-3 mt-2">
                <View className="w-10 h-10 rounded-full bg-black border border-dark-border mr-3" />
                <View>
                  <View className="w-24 h-4 bg-dark-border rounded mb-1" />
                  <View className="w-16 h-3 bg-dark-border rounded" />
                </View>
              </View>
              <View className="w-full h-6 bg-dark-border rounded mb-2" />
              <View className="w-3/4 h-6 bg-dark-border rounded mb-4" />
            </View>
          </View>
        </View>

        {/* Loot Grid (Unlocked Content) */}
        <View className="px-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-brand-neon font-semibold uppercase tracking-widest text-xs">Your Loot</Text>
            <MaterialCommunityIcons name="treasure-chest" size={14} color="#00E5FF" />
          </View>
          
          <View className="flex-row flex-wrap justify-between">
            {[
              { title: 'React Course P1', type: 'Video', icon: 'play-circle' },
              { title: 'Discord Role', type: 'Social', icon: 'chat' },
            ].map((loot, i) => (
              <View key={i} className="w-[48%] bg-dark-card border border-brand-neon/20 rounded-2xl p-4 mb-4">
                <View className="w-10 h-10 rounded-full bg-brand-neon/10 items-center justify-center mb-3 border border-brand-neon/30">
                  <MaterialCommunityIcons name={loot.icon as any} size={20} color="#00E5FF" />
                </View>
                <Text className="text-white font-bold text-base mb-1" numberOfLines={1}>{loot.title}</Text>
                <Text className="text-gray-400 text-xs mb-3">{loot.type}</Text>
                
                <TouchableOpacity className="bg-brand-neon w-full py-2 rounded-lg items-center">
                  <Text className="text-black font-extrabold text-sm">CLAIM</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
