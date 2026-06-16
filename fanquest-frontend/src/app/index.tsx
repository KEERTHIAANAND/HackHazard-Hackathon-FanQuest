import { View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  
  // Logo Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  // Loader Animation Values
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 1. Elegant fade and scale up for the LOGO ONLY
    Animated.parallel([
      Animated.timing(fadeAnim, { 
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true 
      }),
      Animated.timing(scaleAnim, { 
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true 
      }),
    ]).start(() => {
      // 2. ONLY AFTER logo finishes, fade in the loader
      Animated.timing(loaderFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }).start();

      // 3. Start the custom 3-dot pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.parallel([
            Animated.timing(dot1, { toValue: 0.3, duration: 300, useNativeDriver: true }),
            Animated.timing(dot2, { toValue: 0.3, duration: 300, useNativeDriver: true }),
            Animated.timing(dot3, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          ]),
        ])
      ).start();
    });

    // 4. Navigate after 4 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(loaderFadeAnim, { toValue: 0, duration: 400, useNativeDriver: true })
      ]).start(() => {
        router.replace('/roles');
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F19] justify-center items-center">
      
      {/* Centered Logo */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <Image 
          source={require('../../assets/images/Final Logo.svg')} 
          style={{ width: 160, height: 160 }} 
          contentFit="contain"
        />
      </Animated.View>

      {/* Custom Professional Loading Indicator at bottom */}
      <Animated.View 
        style={{ 
          opacity: loaderFadeAnim,
          position: 'absolute',
          bottom: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Animated.View style={{ opacity: dot1, width: 10, height: 10, borderRadius: 5, backgroundColor: '#00E5FF', marginHorizontal: 4 }} />
        <Animated.View style={{ opacity: dot2, width: 10, height: 10, borderRadius: 5, backgroundColor: '#00E5FF', marginHorizontal: 4 }} />
        <Animated.View style={{ opacity: dot3, width: 10, height: 10, borderRadius: 5, backgroundColor: '#00E5FF', marginHorizontal: 4 }} />
      </Animated.View>
      
    </SafeAreaView>
  );
}
