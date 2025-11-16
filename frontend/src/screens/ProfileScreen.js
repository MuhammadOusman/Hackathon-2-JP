import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../components/Avatar';
import {authService} from '../services/api';
import {colors, spacing} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      // Silently handle error
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          // Just clear storage - the auth polling in navigation will handle the rest
          await AsyncStorage.clear();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Background gradients */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Avatar uri={user?.avatar} name={user?.name} size={100} />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Feather name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        
        <View style={styles.roleBadge}>
          <Feather name="shield" size={14} color="#07B4C8" />
          <Text style={styles.roleText}>{user?.role || 'Patient'}</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Feather name="calendar" size={24} color="#07B4C8" />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Feather name="file-text" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Records</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Feather name="activity" size={24} color="#34D399" />
          </View>
          <Text style={styles.statValue}>95%</Text>
          <Text style={styles.statLabel}>Health Score</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.menuCard}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.menuIconBg}>
              <Feather name="user" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Notifications')}>
            <View style={styles.menuIconBg}>
              <Feather name="bell" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Privacy')}>
            <View style={styles.menuIconBg}>
              <Feather name="lock" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.menuCard}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Help')}>
            <View style={styles.menuIconBg}>
              <Feather name="help-circle" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Help & FAQs</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Terms')}>
            <View style={styles.menuIconBg}>
              <Feather name="file-text" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <View style={styles.menuIconBg}>
              <Feather name="shield" size={20} color="#07B4C8" />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Feather name="chevron-right" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}>
        <Feather name="log-out" size={20} color="#EF4444" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 40,
  },

  // Background gradients
  bgGradient1: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#07B4C8',
    opacity: 0.1,
  },
  bgGradient2: {
    position: 'absolute',
    bottom: 100,
    left: -90,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#8B5CF6',
    opacity: 0.08,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#07B4C8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#07B4C8',
    textTransform: 'capitalize',
  },

  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Sections
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  // Menu Card
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 72,
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#FECACA',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ProfileScreen;

