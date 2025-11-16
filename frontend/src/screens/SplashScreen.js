import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors, typography} from '../theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicare</Text>
      <Text style={styles.subtitle}>Your Health, Simplified</Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGradientTop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  loader: {
    marginTop: 32,
  },
});

export default SplashScreen;
