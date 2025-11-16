import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
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
import MedicationsScreen from '../screens/MedicationsScreen';
import MedicalRecordsScreen from '../screens/MedicalRecordsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HelpScreen from '../screens/HelpScreen';

import {colors} from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Main App
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
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
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsListScreen}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>📅</Text>,
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          tabBarLabel: 'Medications',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>💊</Text>,
        }}
      />
      <Tab.Screen
        name="Records"
        component={MedicalRecordsScreen}
        options={{
          tabBarLabel: 'Records',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>📄</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Text style={{fontSize: 24}}>👤</Text>,
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
    checkAuth();
    
    // Check auth periodically to update navigation
    const interval = setInterval(() => {
      checkAuth();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      if (isLoading) {
        setTimeout(() => setIsLoading(false), 2000); // Show splash for 2 seconds
      }
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
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
