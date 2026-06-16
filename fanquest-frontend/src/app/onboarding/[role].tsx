import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const ONBOARDING_CONFIG: Record<string, any[]> = {
  fan: [
    { id: 'auth', type: 'auth_options', question: 'Start your Account', emoji: '', fieldLabel: '' },
    { id: 'gamer_tag', type: 'text', question: 'Choose your Gamer Tag', emoji: '👾', fieldLabel: 'Gamer Tag', placeholder: '@username' },
    { id: 'selected_factions', type: 'multiselect', question: 'Select your factions', emoji: '⚔️', fieldLabel: 'Choose at least 3', options: ['Tech', 'Web3', 'Gaming', 'Esports', 'Anime', 'Music'] }
  ],
  creator: [
    { id: 'youtube_auth', type: 'youtube_oauth', question: 'Connect your Command Center.', emoji: '', fieldLabel: '' },
    { id: 'content_territory', type: 'multiselect', question: 'What is your content territory?', emoji: '', fieldLabel: 'Select 1 or 2 tags', options: ['Gaming', 'Tech', 'Web3', 'Esports', 'Vlogs', 'Music', 'Education', 'Other'], submitText: 'ENTER DASHBOARD' }
  ],
  brand: [
    { id: 'corporate_gateway', type: 'corporate_auth', question: 'Access the Sponsor Terminal.', emoji: '', fieldLabel: '' },
    { id: 'brand_identity', type: 'brand_setup', question: 'Set Up Your Workspace.', emoji: '', fieldLabel: '', submitText: 'LAUNCH SPONSOR TERMINAL' }
  ]
};

const normalizeRole = (r: string | undefined) => {
  if (!r) return 'fan';
  const lowered = r.toLowerCase();
  if (lowered === 'fans') return 'fan';
  if (lowered === 'creators') return 'creator';
  if (lowered === 'brands') return 'brand';
  return ONBOARDING_CONFIG[lowered] ? lowered : 'fan';
};

export default function DynamicOnboarding() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  
  const activeRole = normalizeRole(role);
  const steps = ONBOARDING_CONFIG[activeRole];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  const currentStep = steps[currentStepIndex];

  // Validation logic
  const isGmail = (formData['work_email'] || '').toLowerCase().includes('@gmail.com');
  const isButtonDisabled = currentStep.type === 'corporate_auth' && isGmail;

  const handleNext = () => {
    if (isButtonDisabled) return; // Block advancing if invalid

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      router.push('/(app)/quests');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const toggleMultiselect = (option: string) => {
    const currentSelected = formData[currentStep.id] || [];
    if (currentSelected.includes(option)) {
      setFormData({ ...formData, [currentStep.id]: currentSelected.filter((item: string) => item !== option) });
    } else {
      setFormData({ ...formData, [currentStep.id]: [...currentSelected, option] });
    }
  };

  const renderInputField = () => {
    if (currentStep.type === 'text' || currentStep.type === 'email') {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
            {currentStep.fieldLabel}
          </Text>
          <TextInput
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#00E5FF', // Directly cyan like the green in design
              paddingBottom: 8,
              outlineStyle: 'none',
            } as any}
            placeholderTextColor="#475569"
            placeholder={currentStep.placeholder}
            keyboardType={currentStep.type === 'email' ? 'email-address' : 'default'}
            value={formData[currentStep.id] || ''}
            onChangeText={(text) => setFormData({ ...formData, [currentStep.id]: text })}
            autoFocus
          />
        </View>
      );
    }

    if (currentStep.type === 'multiselect') {
      const selectedOptions = formData[currentStep.id] || [];
      const showOtherInput = selectedOptions.includes('Other');

      return (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 16 }}>
            {currentStep.fieldLabel}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {currentStep.options.map((option: string) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => toggleMultiselect(option)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: isSelected ? '#00E5FF' : '#334155',
                    backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.1)' : '#161B28',
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: isSelected ? '#00E5FF' : '#CBD5E1' }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Conditional Input Field for "Other" */}
          {showOtherInput && (
            <View style={{ marginTop: 32 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
                Please specify your territory:
              </Text>
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600',
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: '#00E5FF',
                  paddingBottom: 8,
                  outlineStyle: 'none',
                } as any}
                placeholderTextColor="#475569"
                placeholder="e.g. Comedy, Fitness, etc."
                value={formData[`${currentStep.id}_other`] || ''}
                onChangeText={(text) => setFormData({ ...formData, [`${currentStep.id}_other`]: text })}
                autoFocus
              />
            </View>
          )}
        </View>
      );
    }

    if (currentStep.type === 'oauth') {
      return (
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: '#161B28', 
              borderRadius: 16, 
              borderWidth: 1, 
              borderColor: '#334155', 
              paddingVertical: 18,
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
            }}
            onPress={() => setFormData({ ...formData, [currentStep.id]: 'verified_token_123' })}
          >
            <MaterialCommunityIcons 
              name={formData[currentStep.id] ? "check-circle" : "link"} 
              size={24} 
              color={formData[currentStep.id] ? "#00E5FF" : "white"} 
              style={{ marginRight: 12 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: formData[currentStep.id] ? '#00E5FF' : 'white' }}>
              {formData[currentStep.id] ? 'Account Connected' : currentStep.fieldLabel}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentStep.type === 'auth_options') {
      return (
        <View style={{ marginTop: 20, width: '100%', gap: 16 }}>
          {/* Continue with Google */}
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: 'white', 
              borderRadius: 30, 
              paddingVertical: 18, 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderWidth: formData[currentStep.id] === 'google' ? 2 : 1,
              borderColor: formData[currentStep.id] === 'google' ? '#00E5FF' : '#E2E8F0'
            }}
            onPress={() => setFormData({ ...formData, [currentStep.id]: 'google' })}
          >
            <Image 
              source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} 
              style={{ width: 24, height: 24, marginRight: 12 }} 
              contentFit="contain"
            />
            <Text style={{ color: '#334155', fontWeight: 'bold', fontSize: 16 }}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Continue with Discord */}
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: 'white', 
              borderRadius: 30, 
              paddingVertical: 18, 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderWidth: formData[currentStep.id] === 'discord' ? 2 : 1,
              borderColor: formData[currentStep.id] === 'discord' ? '#00E5FF' : '#E2E8F0'
            }}
            onPress={() => setFormData({ ...formData, [currentStep.id]: 'discord' })}
          >
            <Image 
              source={{ uri: 'https://img.icons8.com/color/48/000000/discord-logo.png' }} 
              style={{ width: 24, height: 24, marginRight: 12 }} 
              contentFit="contain"
            />
            <Text style={{ color: '#334155', fontWeight: 'bold', fontSize: 16 }}>Continue with Discord</Text>
          </TouchableOpacity>

          {/* Sign up */}
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: '#00E5FF', 
              borderRadius: 30, 
              paddingVertical: 18, 
              alignItems: 'center', 
              justifyContent: 'center',
              borderWidth: formData[currentStep.id] === 'signup' ? 2 : 0,
              borderColor: 'white'
            }}
            onPress={() => setFormData({ ...formData, [currentStep.id]: 'signup' })}
          >
            <Text style={{ color: '#0B0F19', fontWeight: 'bold', fontSize: 16 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentStep.type === 'youtube_oauth') {
      return (
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: '#FF0808', // YouTube Red
              borderRadius: 16, 
              paddingVertical: 20,
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              shadowColor: '#FF0000',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
            onPress={() => setFormData({ ...formData, [currentStep.id]: 'verified_youtube' })}
          >
            <MaterialCommunityIcons 
              name={formData[currentStep.id] ? "check-circle" : "youtube"} 
              size={28} 
              color="white" 
              style={{ marginRight: 12 }}
            />
            <Text style={{ fontWeight: '900', fontSize: 18, color: 'white' }}>
              {formData[currentStep.id] ? 'YouTube Connected' : 'Verify with YouTube'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentStep.type === 'corporate_auth') {
      return (
        <View style={{ marginTop: 10, width: '100%' }}>
          {/* Google Workspace Button */}
          <TouchableOpacity 
            style={{ 
              width: '100%', 
              backgroundColor: 'white', 
              borderRadius: 16, 
              paddingVertical: 18, 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 32
            }}
            onPress={() => setFormData({ ...formData, 'workspace_auth': 'google' })}
          >
            <Image 
              source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} 
              style={{ width: 24, height: 24, marginRight: 12 }} 
              contentFit="contain"
            />
            <Text style={{ color: '#334155', fontWeight: 'bold', fontSize: 16 }}>Continue with Google Workspace</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#334155' }} />
            <Text style={{ color: '#64748B', paddingHorizontal: 16, fontWeight: 'bold' }}>OR</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#334155' }} />
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
              Work Email
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: isGmail ? '#EF4444' : '#00E5FF',
                paddingBottom: 8,
                outlineStyle: 'none',
              } as any}
              placeholderTextColor="#475569"
              placeholder="you@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData['work_email'] || ''}
              onChangeText={(text) => setFormData({ ...formData, 'work_email': text })}
            />
            {isGmail && (
              <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 8, fontWeight: 'bold' }}>
                Please use a professional domain (not @gmail.com)
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
              Password
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#00E5FF',
                paddingBottom: 8,
                outlineStyle: 'none',
              } as any}
              placeholderTextColor="#475569"
              placeholder="••••••••"
              secureTextEntry
              value={formData['password'] || ''}
              onChangeText={(text) => setFormData({ ...formData, 'password': text })}
            />
          </View>
        </View>
      );
    }

    if (currentStep.type === 'brand_setup') {
      return (
        <View style={{ marginTop: 10, width: '100%' }}>
          {/* Company Name */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
              Company / Organization Name
            </Text>
            <TextInput
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#00E5FF',
                paddingBottom: 8,
                outlineStyle: 'none',
              } as any}
              placeholderTextColor="#475569"
              placeholder="e.g. Acme Corp"
              value={formData['company_name'] || ''}
              onChangeText={(text) => setFormData({ ...formData, 'company_name': text })}
            />
          </View>

          {/* Upload Logo Placeholder */}
          <View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>
              Upload Brand Logo
            </Text>
            <TouchableOpacity 
              style={{
                width: '100%',
                height: 120,
                borderWidth: 2,
                borderColor: '#334155',
                borderStyle: 'dashed',
                borderRadius: 16,
                backgroundColor: 'rgba(51, 65, 85, 0.2)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setFormData({ ...formData, 'logo_uploaded': true })}
            >
              <MaterialCommunityIcons 
                name={formData['logo_uploaded'] ? "check-circle" : "cloud-upload"} 
                size={36} 
                color={formData['logo_uploaded'] ? "#00E5FF" : "#94A3B8"} 
                style={{ marginBottom: 8 }}
              />
              <Text style={{ color: formData['logo_uploaded'] ? '#00E5FF' : '#94A3B8', fontWeight: 'bold' }}>
                {formData['logo_uploaded'] ? 'Logo Uploaded' : 'Tap to browse files'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0F19' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
          
          {/* Header Row: Back Arrow + Centered Progress Dots */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 50 }}>
            {/* Absolute positioning to guarantee true centering for the dots */}
            <TouchableOpacity onPress={handleBack} style={{ padding: 8, position: 'absolute', left: -8, zIndex: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              {Array.from({ length: steps.length + 1 }).map((_, index) => {
                const isActive = index === currentStepIndex + 1;
                return (
                  <View 
                    key={index} 
                    style={{
                      height: 6,
                      width: isActive ? 24 : 10,
                      backgroundColor: isActive ? '#00E5FF' : '#1F2937',
                      borderRadius: 10,
                    }}
                  />
                );
              })}
            </View>
          </View>

          <ScrollView 
            style={{ flex: 1 }} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Main Question */}
            <Text 
              style={{ 
                fontFamily: 'Poppins_800ExtraBold', 
                fontWeight: '800', // Fallback if font isn't loaded
                fontSize: 28, 
                color: 'white', 
                lineHeight: 38,
                marginBottom: 40 
              }}
            >
              {currentStep.question} {currentStep.emoji}
            </Text>

            {/* Dynamic Form Field */}
            {renderInputField()}
          </ScrollView>

          {/* Continue Button */}
          <TouchableOpacity 
            style={{ 
              marginTop: 16, 
              backgroundColor: isButtonDisabled ? '#334155' : '#00E5FF', 
              paddingVertical: 18, 
              borderRadius: 30, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            }}
            onPress={handleNext}
            activeOpacity={isButtonDisabled ? 1 : 0.8}
          >
            <Text style={{ color: isButtonDisabled ? '#94A3B8' : '#0B0F19', fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' }}>
              {currentStep.submitText || 'Continue'}
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
