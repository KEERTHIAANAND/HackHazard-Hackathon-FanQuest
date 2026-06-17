import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocalQuests() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Community Quests</Text>
      <Text style={{ color: '#94A3B8', marginTop: 10 }}>Complete bounties to earn XP here.</Text>
    </SafeAreaView>
  );
}
