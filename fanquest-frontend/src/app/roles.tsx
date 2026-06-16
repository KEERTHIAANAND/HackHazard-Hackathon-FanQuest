import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function RoleSelector() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Mapped to FanQuest roles with Dark Theme colors and custom illustrations
  const roles = [
    {
      id: 'fan',
      title: 'Fans',
      line1: 'Earn XP',
      line2: 'Unlock rewards',
      bg: '#161B28',
      image: require('../../assets/images/fans.svg'),
    },
    {
      id: 'creator',
      title: 'Creators',
      line1: 'Monetize',
      line2: 'Gamify community',
      bg: '#161B28',
      image: require('../../assets/images/creators.svg'),
    },
    {
      id: 'brand',
      title: 'Brands',
      line1: 'Fund Quests',
      line2: 'Zero ad-waste',
      bg: '#161B28',
      image: require('../../assets/images/brands.svg'),
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Stepper (Pagination dots) */}
        <View className="flex-row justify-center items-center gap-1.5 mb-10 mt-4">
          <View className="h-1.5 w-6 rounded-full bg-[#00E5FF]" />
          <View className="h-1.5 w-2.5 rounded-full bg-gray-800" />
          <View className="h-1.5 w-2.5 rounded-full bg-gray-800" />
          <View className="h-1.5 w-2.5 rounded-full bg-gray-800" />
        </View>

        {/* Title */}
        <View className="mb-10">
          <Text style={{ fontFamily: 'Poppins_800ExtraBold' }} className="text-5xl text-white tracking-tight leading-[54px]">Select</Text>
          <Text style={{ fontFamily: 'Poppins_800ExtraBold' }} className="text-5xl text-white tracking-tight leading-[54px]">user type</Text>
        </View>

        {/* Cards */}
        <View className="gap-6">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            
            return (
              <TouchableOpacity 
                key={role.id}
                activeOpacity={0.9}
                onPress={() => setSelectedRole(role.id)}
                className={`relative rounded-[24px] flex-row items-center p-5 h-[140px] ${isSelected ? 'border-2 border-[#00E5FF]' : 'border border-gray-800'}`}
                style={{ backgroundColor: isSelected ? '#00E5FF' : role.bg }}
              >
                {/* Illustration Image */}
                <View className="w-[35%] h-[110px] items-center justify-center">
                   <Image 
                     source={role.image} 
                     contentFit="contain"
                     transition={200}
                     // Slight opacity drop when inactive to make the active one pop even more
                     style={[{ width: '100%', height: '100%' }, !isSelected && { opacity: 0.8 }]}
                   />
                </View>

                {/* Text Content */}
                <View className="w-2/3 pl-4 justify-center">
                  <Text className={`text-[18px] font-black mb-1 ${isSelected ? 'text-[#0B0F19]' : 'text-white'}`}>
                    {role.title}
                  </Text>
                  <Text className={`text-[13px] font-bold ${isSelected ? 'text-[#0B0F19]/80' : 'text-gray-400'}`}>
                    {role.line1}
                  </Text>
                  <Text className={`text-[13px] font-bold ${isSelected ? 'text-[#0B0F19]/80' : 'text-gray-400'}`}>
                    {role.line2}
                  </Text>
                </View>

                {/* Selected Checkmark overlapping bottom center */}
                {isSelected && (
                  <View 
                    className="absolute -bottom-5 left-1/2 bg-[#0B0F19] rounded-full p-1"
                    style={{ transform: [{ translateX: -16 }] }} // perfectly center it
                  >
                    <View className="border-2 border-[#00E5FF] rounded-full p-1 bg-[#00E5FF]">
                      <MaterialCommunityIcons name="check" size={16} color="#0B0F19" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Continue Button to navigate to next screen (Quests) */}
        <TouchableOpacity 
          className={`mt-14 py-4 rounded-xl items-center shadow-lg ${selectedRole ? 'bg-[#00E5FF]' : 'bg-gray-800'}`}
          activeOpacity={selectedRole ? 0.8 : 1}
          onPress={() => {
            if (selectedRole) {
              router.push(`/onboarding/${selectedRole}` as any);
            }
          }}
        >
          <Text className={`font-black text-lg uppercase tracking-widest ${selectedRole ? 'text-[#0B0F19]' : 'text-gray-500'}`}>
            Continue
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
