import React, {useEffect, useState} from 'react';
import {Text, View, Platform, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsListScreen from '../screens/AppointmentsListScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import MedicalRecordsScreen from '../screens/MedicalRecordsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import HelpScreen from '../screens/HelpScreen';

import {colors} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: '100%',
  },
  tabIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabIconFocused: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -22,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#F5FAFB',
  },
});

// Tab Navigator for Main App
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 34 : 24,
          left: '25%',
          right: '25%',
          elevation: 8,
          borderRadius: 32,
          backgroundColor: '#0A0F1C',
          height: 56,
          paddingHorizontal: 0,
          paddingVertical: 0,
          borderWidth: 0,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.35,
          shadowRadius: 24,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.textPrimary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.tabIconFocused}>
                  <Feather name="home" size={26} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.tabIconWrapper}>
                  <Feather name="home" size={22} color="#6B6B6B" />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsListScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.tabIconFocused}>
                  <Feather name="calendar" size={26} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.tabIconWrapper}>
                  <Feather name="calendar" size={22} color="#6B6B6B" />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={MedicalRecordsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.tabIconFocused}>
                  <Feather name="file-text" size={26} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.tabIconWrapper}>
                  <Feather name="file-text" size={22} color="#6B6B6B" />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.tabIconFocused}>
                  <Feather name="user" size={26} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.tabIconWrapper}>
                  <Feather name="user" size={22} color="#6B6B6B" />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initial auth check and hide splash after 2 seconds
    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        // Auth check error
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    initializeApp();

    // Check auth periodically to update navigation
    const interval = setInterval(async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        // Auth check error
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="BookAppointment"
              component={BookAppointmentScreen}
              options={{
                headerShown: true,
                title: 'Book Appointment',
                headerStyle: {backgroundColor: colors.card},
                headerTintColor: colors.textPrimary,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Privacy"
              component={PrivacyScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Terms"
              component={TermsScreen}
              options={{
                headerShown: true,
                title: 'Terms & Conditions',
                headerStyle: {backgroundColor: colors.card},
                headerTintColor: colors.textPrimary,
              }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicyScreen}
              options={{
                headerShown: true,
                title: 'Privacy Policy',
                headerStyle: {backgroundColor: colors.card},
                headerTintColor: colors.textPrimary,
              }}
            />
            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{
                headerShown: true,
                title: 'Help & Support',
                headerStyle: {backgroundColor: colors.card},
                headerTintColor: colors.textPrimary,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
