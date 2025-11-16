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
      console.error('Error loading data:', error);
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
      {/* Header */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.subGreeting}>How are you feeling today?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar uri={user?.avatar} name={user?.name} size={48} />
        </TouchableOpacity>
      </View>

      {/* Next Appointment */}
      {nextAppointment && (
        <Card style={styles.appointmentCard}>
          <Text style={styles.cardTitle}>Next Appointment</Text>
          <View style={styles.appointmentContent}>
            <Avatar
              uri={nextAppointment.providerId?.avatar}
              name={nextAppointment.providerId?.name}
              size={56}
            />
            <View style={styles.appointmentDetails}>
              <Text style={styles.doctorName}>
                {nextAppointment.providerId?.name || 'Dr. Unknown'}
              </Text>
              <Text style={styles.specialty}>
                {nextAppointment.providerId?.specialty}
              </Text>
              <View>
                <View style={styles.rowIconTextSmall}>
                  <Feather name="calendar" size={14} color="#06B6D4" style={styles.smallIcon} />
                  <Text style={styles.appointmentTimeDate}>{new Date(nextAppointment.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
                </View>
                <View style={styles.rowIconTextSmall}>
                  <Feather name="clock" size={14} color="#06B6D4" style={styles.smallIcon} />
                  <Text style={styles.appointmentTime}>{new Date(nextAppointment.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
              </View>
            </View>
          </View>
          <Button
            title="View Details"
            onPress={() =>
              navigation.navigate('Appointments', {
                screen: 'AppointmentsList',
              })
            }
            variant="outline"
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('BookAppointment')}>
          <View style={styles.actionIconBg}><Feather name="calendar" size={20} color="#06B6D4" /></View>
          <Text style={styles.actionLabel}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('Appointments')}>
          <View style={styles.actionIconBg}><Feather name="stethoscope" size={20} color="#06B6D4" /></View>
          <Text style={styles.actionLabel}>Checkup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('Records')}>
          <View style={styles.actionIconBg}><Feather name="file-text" size={20} color="#06B6D4" /></View>
          <Text style={styles.actionLabel}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('Help')}>
          <View style={styles.actionIconBg}><Feather name="help-circle" size={20} color="#06B6D4" /></View>
          <Text style={styles.actionLabel}>Support</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Help')}>
          <Feather name="help-circle" size={28} color="#06B6D4" style={styles.actionIcon} />
          <Text style={styles.actionText}>FAQs</Text>
        </TouchableOpacity>
      </View>

      {/* Health Statistics */}
      <Text style={styles.sectionTitle}>Health Statistics</Text>
      <View style={styles.statsGrid}>
        <StatCard
          label="Heart Rate"
          value={`${stats?.heartRate || 72} BPM`}
          sub="Normal"
          trend="neutral"
        />
        <StatCard
          label="Blood Pressure"
          value={`${stats?.bloodPressureSystolic || 120}/${stats?.bloodPressureDiastolic || 80}`}
          sub="Optimal"
          trend="up"
        />
      </View>
      <View style={styles.statsGrid}>
        <StatCard
          label="Steps"
          value={`${stats?.steps || 0}`}
          sub="Today"
          trend="up"
        />
        <StatCard
          label="Sleep"
          value={`${stats?.sleepHours || 7.5}h`}
          sub="Last night"
          trend="neutral"
        />
      </View>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Medication Reminders</Text>
          {upcomingReminders.map(reminder => (
            <Card key={reminder._id} style={styles.reminderCard}>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  <Text style={styles.reminderTime}>
                    {new Date(reminder.triggerTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
              </View>
              <Text style={styles.reminderStatus}>
                {reminder.status === 'pending' ? 'Pending' : 'Done'}
              </Text>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subGreeting: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  appointmentCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  appointmentContent: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  appointmentDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  doctorName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  specialty: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  appointmentTime: {
    ...typography.small,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  viewButton: {
    marginTop: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  actionText: {
    ...typography.small,
    color: colors.textPrimary,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  reminderCard: {
    marginBottom: spacing.md,
  },
  reminderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reminderTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  reminderTime: {
    ...typography.small,
    color: colors.textSecondary,
  },
  reminderStatus: {
    ...typography.small,
    color: colors.primary,
  },
});

export default HomeScreen;
