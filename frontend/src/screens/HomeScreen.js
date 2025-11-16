import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Feather from 'react-native-vector-icons/Feather';
import {
  appointmentService,
  reminderService,
  statsService,
  authService,
} from '../services/api';
import {colors, typography, spacing} from '../theme';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      const appointments = await appointmentService.getAll();
      const upcoming = appointments.filter(a => a.status === 'scheduled')[0];
      setNextAppointment(upcoming);

      const reminders = await reminderService.getAll();
      setUpcomingReminders(reminders.slice(0, 3));

      const healthStats = await statsService.get();
      setStats(healthStats);
    } catch (error) {
      // Error loading data
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Animated Background Elements */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />
      <View style={styles.bgGradient3} />

      {/* Header with User Info */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'} 👋</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}>
          <Avatar uri={user?.avatar} name={user?.name} size={52} />
          <View style={styles.onlineIndicator} />
        </TouchableOpacity>
      </View>

      {/* Feature Cards Grid */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={[styles.featureCard, styles.featureCardLarge]}
          onPress={() => navigation.navigate('BookAppointment')}>
          <View style={styles.featureIconLarge}>
            <Feather name="plus-circle" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Book New</Text>
            <Text style={styles.featureTitle}>Appointment</Text>
            <Text style={styles.featureSubtitle}>Find your doctor</Text>
          </View>
          <View style={styles.featureShine} />
        </TouchableOpacity>

        <View style={styles.featureSmallCards}>
          <TouchableOpacity 
            style={[styles.featureCard, styles.featureCardSmall, styles.cardPurple]}
            onPress={() => navigation.navigate('Records')}>
            <Feather name="file-text" size={28} color="#A78BFA" />
            <Text style={styles.featureSmallText}>Medical</Text>
            <Text style={styles.featureSmallText}>Records</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.featureCard, styles.featureCardSmall, styles.cardGreen]}
            onPress={() => navigation.navigate('Help')}>
            <Feather name="message-circle" size={28} color="#34D399" />
            <Text style={styles.featureSmallText}>Quick</Text>
            <Text style={styles.featureSmallText}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Appointment - Redesigned */}
      {nextAppointment && (
        <View style={styles.appointmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Visit</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.appointmentCardNew}>
            <View style={styles.appointmentCardGlow} />
            <View style={styles.appointmentTop}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatarWrapper}>
                  <Avatar
                    uri={nextAppointment.providerId?.avatar}
                    name={nextAppointment.providerId?.name}
                    size={64}
                  />
                </View>
                <View style={styles.doctorDetails}>
                  <Text style={styles.doctorNameNew}>
                    {nextAppointment.providerId?.name || 'Dr. Unknown'}
                  </Text>
                  <Text style={styles.specialtyNew}>
                    {nextAppointment.providerId?.specialty}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Feather name="star" size={14} color="#FCD34D" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.appointmentDivider} />

            <View style={styles.appointmentBottom}>
              <View style={styles.appointmentInfoItem}>
                <View style={styles.infoIconBg}>
                  <Feather name="calendar" size={16} color="#07B4C8" />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>
                    {new Date(nextAppointment.startTime).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentInfoItem}>
                <View style={styles.infoIconBg}>
                  <Feather name="clock" size={16} color="#07B4C8" />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>
                    {new Date(nextAppointment.startTime).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}

      {/* Activity Stats - Creative Cards */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Today's Activity</Text>
        
        <View style={styles.activityGrid}>
          <View style={[styles.activityCard, styles.activityCardBlue]}>
            <View style={styles.activityIconContainer}>
              <Feather name="activity" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.activityValue}>{stats?.steps || 0}</Text>
            <Text style={styles.activityLabel}>Steps</Text>
            <View style={styles.activityProgress}>
              <View style={[styles.activityProgressBar, {width: '65%', backgroundColor: '#3B82F6'}]} />
            </View>
          </View>

          <View style={[styles.activityCard, styles.activityCardPurple]}>
            <View style={styles.activityIconContainer}>
              <Feather name="moon" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.activityValue}>{stats?.sleepHours || 7.5}h</Text>
            <Text style={styles.activityLabel}>Sleep</Text>
            <View style={styles.activityProgress}>
              <View style={[styles.activityProgressBar, {width: '80%', backgroundColor: '#8B5CF6'}]} />
            </View>
          </View>
        </View>
      </View>

      {/* Medication Reminders - Modern Design */}
      {upcomingReminders.length > 0 && (
        <View style={styles.remindersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medications</Text>
            <View style={styles.reminderBadge}>
              <Text style={styles.reminderBadgeText}>{upcomingReminders.length}</Text>
            </View>
          </View>

          {upcomingReminders.map((reminder, index) => (
            <View key={reminder._id} style={styles.reminderItemNew}>
              <View style={styles.reminderIconContainer}>
                <Feather name="bell" size={20} color="#07B4C8" />
              </View>
              <View style={styles.reminderDetails}>
                <Text style={styles.reminderTitleNew}>{reminder.title}</Text>
                <Text style={styles.reminderTimeNew}>
                  {new Date(reminder.triggerTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <View style={[
                styles.reminderStatusBadge,
                reminder.status === 'pending' ? styles.statusPending : styles.statusDone
              ]}>
                <Text style={styles.reminderStatusText}>
                  {reminder.status === 'pending' ? '●' : '✓'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

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
    padding: spacing.lg,
    paddingBottom: 100,
  },
  
  // Background gradients
  bgGradient1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#07B4C8',
    opacity: 0.1,
  },
  bgGradient2: {
    position: 'absolute',
    top: 300,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#8B5CF6',
    opacity: 0.08,
  },
  bgGradient3: {
    position: 'absolute',
    bottom: 200,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#34D399',
    opacity: 0.09,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  profileButton: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34D399',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },

  // Feature Cards
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  featureCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  featureCardLarge: {
    backgroundColor: '#07B4C8',
    padding: spacing.lg,
    marginBottom: spacing.md,
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  featureIconLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featureSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  featureShine: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureSmallCards: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  featureCardSmall: {
    flex: 1,
    padding: spacing.lg,
    height: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardPurple: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EDE9FE',
  },
  cardGreen: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D1FAE5',
  },
  featureSmallText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },

  // Appointment Section
  appointmentSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: '#07B4C8',
    fontWeight: '600',
  },
  appointmentCardNew: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  },
  appointmentCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#07B4C8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  appointmentTop: {
    marginBottom: spacing.md,
  },
  doctorInfo: {
    flexDirection: 'row',
  },
  doctorAvatarWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: '#FFFFFF',
    padding: 3,
  },
  doctorDetails: {
    marginLeft: spacing.md,
    flex: 1,
    justifyContent: 'center',
  },
  doctorNameNew: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  specialtyNew: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  appointmentDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: spacing.md,
  },
  appointmentBottom: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  appointmentInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  viewDetailsButton: {
    backgroundColor: '#07B4C8',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  viewDetailsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Activity Section
  activitySection: {
    marginBottom: spacing.xl,
  },
  activityGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  activityCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  activityCardBlue: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  activityCardPurple: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  activityProgress: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  activityProgressBar: {
    height: '100%',
    borderRadius: 3,
  },

  // Reminders Section
  remindersSection: {
    marginBottom: spacing.lg,
  },
  reminderBadge: {
    backgroundColor: '#07B4C8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  reminderBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  reminderItemNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  reminderIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  reminderDetails: {
    flex: 1,
  },
  reminderTitleNew: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  reminderTimeNew: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  reminderStatusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusDone: {
    backgroundColor: '#D1FAE5',
  },
  reminderStatusText: {
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;
