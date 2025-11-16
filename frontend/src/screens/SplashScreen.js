import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SplashScreen = () => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Logo entrance animation
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Continuous pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.6,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Text fade in after a delay
    setTimeout(() => {
      Animated.timing(textFade, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 300);
  }, [logoScale, logoPulse, textFade, glowOpacity]);

  return (
    <View style={styles.container}>
      {/* Animated glow background */}
      <Animated.View
        style={[
          styles.glowBackground,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Logo container */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{scale: Animated.multiply(logoScale, logoPulse)}],
          },
        ]}>
        <View style={styles.logoCircle}>
          <Feather name="activity" color="#fff" size={64} />
        </View>
      </Animated.View>

      {/* Text container */}
      <Animated.View style={[styles.textContainer, {opacity: textFade}]}>
        <Text style={styles.appName}>Medicare</Text>
        <Text style={styles.tagline}>Your health companion</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBackground: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#06B6D4',
    opacity: 0.3,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 20,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoEmoji: {
    fontSize: 70,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#94A3B8',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
});

export default SplashScreen;
