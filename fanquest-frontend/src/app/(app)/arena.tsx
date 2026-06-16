import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

export default function Arena() {
  const leaderboard = [
    { rank: 1, name: 'CyberNinja', xp: '12,450', isMe: false },
    { rank: 2, name: 'CodeSlayer', xp: '10,200', isMe: false },
    { rank: 3, name: 'NeonMage', xp: '8,900', isMe: false },
    { rank: 42, name: 'PixelPusher', xp: '2,500', isMe: false, isRival: true },
    { rank: 43, name: 'You (GamerTag)', xp: '2,450', isMe: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-dark-border">
        <Image 
          source={require('../../../assets/images/Final Logo.svg')} 
          style={{ width: 140, height: 28 }} 
          contentFit="contain"
        />
        <TouchableOpacity className="bg-dark-card px-3 py-1.5 rounded-full border border-dark-border">
          <Text className="text-white font-bold text-xs">Global Ranking</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24, paddingTop: 20 }}>
        
        {/* Top 3 Podium (Visual concept) */}
        <View className="px-5 mb-8 flex-row justify-center items-end h-40">
          <View className="items-center mr-4">
            <Text className="text-gray-400 font-bold mb-2">2</Text>
            <View className="w-16 h-20 bg-dark-card border-t border-l border-r border-[#C0C0C0] rounded-t-lg justify-center items-center">
              <MaterialCommunityIcons name="account" size={32} color="#C0C0C0" />
            </View>
          </View>
          
          <View className="items-center mr-4 z-10">
            <MaterialCommunityIcons name="crown" size={32} color="#FFD700" className="mb-1" />
            <Text className="text-[#FFD700] font-bold mb-2">1</Text>
            <View className="w-20 h-28 bg-dark-card border-t border-l border-r border-[#FFD700] rounded-t-lg justify-center items-center shadow-lg shadow-[#FFD700]/20">
              <MaterialCommunityIcons name="account" size={40} color="#FFD700" />
            </View>
          </View>

          <View className="items-center">
            <Text className="text-gray-400 font-bold mb-2">3</Text>
            <View className="w-16 h-16 bg-dark-card border-t border-l border-r border-[#CD7F32] rounded-t-lg justify-center items-center">
              <MaterialCommunityIcons name="account" size={32} color="#CD7F32" />
            </View>
          </View>
        </View>

        {/* Leaderboard List */}
        <View className="px-5">
          {leaderboard.map((player, i) => (
            <View 
              key={i} 
              className={`flex-row items-center justify-between p-4 mb-2 rounded-xl border ${player.isMe ? 'bg-brand-neon/10 border-brand-neon' : player.isRival ? 'bg-[#FF2A55]/10 border-[#FF2A55]' : 'bg-dark-card border-dark-border'}`}
            >
              <View className="flex-row items-center">
                <Text className={`w-8 font-bold ${player.rank <= 3 ? 'text-white' : 'text-gray-500'}`}>#{player.rank}</Text>
                <View className="w-10 h-10 rounded-full bg-black mx-3 items-center justify-center border border-dark-border">
                  <MaterialCommunityIcons name="account" size={20} color="#64748B" />
                </View>
                <View>
                  <Text className={`font-bold text-base ${player.isMe ? 'text-brand-neon' : player.isRival ? 'text-[#FF2A55]' : 'text-white'}`}>{player.name}</Text>
                  {player.isRival && <Text className="text-[#FF2A55] text-xs font-bold uppercase tracking-widest">Your Rival</Text>}
                </View>
              </View>
              
              <View className="items-end">
                <Text className={`font-bold ${player.isMe ? 'text-brand-neon' : 'text-white'}`}>{player.xp} XP</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
