import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming
} from 'react-native-reanimated';

function TabItem({ tab, isFocused, isLeaveButton, onPress, index, isGlobal }: any) {
  // We use a simple animated value to create a pop-in effect when tabs mount/swap
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Reset when swapping contexts
    scale.value = 0.5;
    opacity.value = 0;
    
    // Staggered entrance animation
    const timeout = setTimeout(() => {
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 250 });
    }, index * 50);

    return () => clearTimeout(timeout);
  }, [isGlobal, tab.name]); // Re-run when context switches

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      flex: 1,
    };
  });

  const color = isFocused && !isLeaveButton ? '#00E5FF' : '#64748B';

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onPress}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name={tab.icon as any} size={28} color={color} />
        <Text style={{ 
          color, 
          fontSize: 11, 
          marginTop: 4, 
          fontWeight: isFocused && !isLeaveButton ? 'bold' : '600' 
        }}>
          {tab.title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  
  // Guard against undefined state during initial render
  if (!state) return null;

  const currentRouteName = state.routes[state.index].name;
  
  // These 3 routes belong to the Global Hub
  const isGlobal = ['dashboard', 'communities', 'profile'].includes(currentRouteName);

  const globalTabs = [
    { name: 'dashboard', title: 'Home', icon: 'home' },
    { name: 'communities', title: 'Communities', icon: 'earth' },
    { name: 'profile', title: 'Profile', icon: 'account-circle' }
  ];

  const localTabs = [
    { name: 'dashboard', title: 'Leave', icon: 'arrow-left' }, // Navigates back to Home
    { name: 'quests', title: 'Quests', icon: 'sword-cross' },
    { name: 'vault', title: 'Vault', icon: 'treasure-chest' },
    { name: 'arena', title: 'Rank', icon: 'trophy' }
  ];

  const activeTabs = isGlobal ? globalTabs : localTabs;

  return (
    <View style={{
      backgroundColor: '#0B0F19',
      borderTopColor: '#2A3041',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 80,
      paddingBottom: 20, // Bottom inset approximation
      paddingTop: 10,
    }}>
      {activeTabs.map((tab, index) => {
        const isFocused = currentRouteName === tab.name;
        const isLeaveButton = !isGlobal && tab.name === 'dashboard';

        const onPress = () => {
          if (isLeaveButton) {
            router.navigate('/(app)/dashboard');
          } else {
            router.navigate(`/(app)/${tab.name}` as any);
          }
        };

        return (
          <TabItem 
            key={tab.name + (isGlobal ? '-G' : '-L')} 
            tab={tab} 
            index={index}
            isFocused={isFocused} 
            isLeaveButton={isLeaveButton} 
            onPress={onPress}
            isGlobal={isGlobal}
          />
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* All screens must be registered here so Expo Router knows they exist */}
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="communities" />
      <Tabs.Screen name="profile" />
      
      <Tabs.Screen name="quests" />
      <Tabs.Screen name="vault" />
      <Tabs.Screen name="arena" />
    </Tabs>
  );
}
