import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        
        {/* Identity Block */}
        <View className="items-center pt-8 pb-6 border-b border-dark-border">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-dark-card border-2 border-brand-neon items-center justify-center mb-4">
              <MaterialCommunityIcons name="alien-outline" size={48} color="#00E5FF" />
            </View>
            <View className="absolute bottom-4 right-0 bg-brand-neon rounded-full p-1">
              <MaterialCommunityIcons name="pencil" size={12} color="#000" />
            </View>
          </View>
          <Text className="text-2xl font-bold text-white tracking-widest mb-1">GamerTag</Text>
          <Text className="text-gray-400 font-medium mb-3">Joined June 2026</Text>
          
          <View className="bg-dark-card px-4 py-2 rounded-xl flex-row items-center border border-brand-neon/30">
            <MaterialCommunityIcons name="star-four-points" size={20} color="#00E5FF" />
            <Text className="text-brand-neon font-bold text-lg ml-2">2,450 XP Total</Text>
          </View>
        </View>

        {/* Badge Display (Digital Trophy Case) */}
        <View className="px-5 mt-6 mb-8">
          <Text className="text-gray-400 font-semibold mb-4 uppercase tracking-widest text-xs">Trophy Case</Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { name: 'Day 1 User', icon: 'shield-star', color: '#FFD700' },
              { name: 'Quest Master', icon: 'sword-cross', color: '#FF2A55' },
              { name: 'Code Contributor', icon: 'github', color: '#FFF' },
              { name: 'Locked', icon: 'lock', color: '#334155' },
            ].map((badge, i) => (
              <View key={i} className="w-[23%] items-center mb-4">
                <View className={`w-16 h-16 rounded-full items-center justify-center mb-2 ${badge.name === 'Locked' ? 'bg-dark-bg border-2 border-dark-border' : 'bg-dark-card border border-dark-border'}`}>
                  <MaterialCommunityIcons name={badge.icon as any} size={28} color={badge.color} />
                </View>
                <Text className={`text-xs text-center font-medium ${badge.name === 'Locked' ? 'text-gray-600' : 'text-gray-300'}`}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Activity Ledger */}
        <View className="px-5">
          <Text className="text-gray-400 font-semibold mb-4 uppercase tracking-widest text-xs">Activity Ledger</Text>
          
          {[
            { action: 'Completed Quest: Retweet', amount: '+75', date: 'Today, 2:45 PM', positive: true },
            { action: 'Unlocked Vault: React Course', amount: '-500', date: 'Yesterday', positive: false },
            { action: 'Daily Login Bonus', amount: '+10', date: 'Yesterday', positive: true },
            { action: 'Joined Faction: Vercel', amount: '+100', date: 'June 14', positive: true },
          ].map((log, i) => (
            <View key={i} className="flex-row justify-between items-center py-3 border-b border-dark-border">
              <View>
                <Text className="text-white font-medium mb-1">{log.action}</Text>
                <Text className="text-gray-500 text-xs">{log.date}</Text>
              </View>
              <Text className={`font-bold ${log.positive ? 'text-brand-neon' : 'text-[#FF2A55]'}`}>
                {log.amount} XP
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
