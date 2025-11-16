import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import {appointmentService} from '../services/api';
import {colors, typography, spacing} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

const AppointmentsListScreen = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAll();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  const getStatusColor = status => {
    switch (status) {
      case 'scheduled':
        return colors.primary;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.danger;
      default:
        return colors.textMuted;
    }
  };

  const renderAppointment = ({item}) => (
    <TouchableOpacity style={styles.appointmentCard} activeOpacity={0.7}>
      <View style={styles.cardGlow} />
      
      <View style={styles.appointmentHeader}>
        <View style={styles.avatarWrapper}>
          <Avatar
            uri={item.providerId?.avatar}
            name={item.providerId?.name}
            size={56}
          />
        </View>
        <View style={styles.appointmentInfo}>
          <Text style={styles.doctorName}>{item.providerId?.name || 'Dr. Unknown'}</Text>
          <Text style={styles.specialty}>{item.providerId?.specialty}</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === 'scheduled' && styles.statusScheduled,
              item.status === 'completed' && styles.statusCompleted,
              item.status === 'cancelled' && styles.statusCancelled,
            ]}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <View style={styles.iconBg}>
            <Feather name="calendar" size={18} color="#07B4C8" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{new Date(item.startTime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}</Text>
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <View style={styles.iconBg}>
            <Feather name="clock" size={18} color="#07B4C8" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{new Date(item.startTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}</Text>
          </View>
        </View>
      </View>

      {item.reason && (
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Reason:</Text>
          <Text style={styles.reason}>{item.reason}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background decorations */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />

      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Your Schedule</Text>
          <Text style={styles.title}>Appointments</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BookAppointment')}>
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#07B4C8"
            colors={['#07B4C8']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Feather name="calendar" size={48} color="#07B4C8" />
            </View>
            <Text style={styles.emptyTitle}>No Appointments Yet</Text>
            <Text style={styles.emptyText}>Book your first appointment to get started</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('BookAppointment')}>
              <Feather name="plus-circle" size={20} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Background gradients
  bgGradient1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#07B4C8',
    opacity: 0.1,
  },
  bgGradient2: {
    position: 'absolute',
    bottom: 100,
    left: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#8B5CF6',
    opacity: 0.08,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: 'transparent',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#07B4C8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  list: {
    padding: spacing.lg,
    paddingBottom: 100,
  },

  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#07B4C8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  appointmentInfo: {
    marginLeft: spacing.md,
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusScheduled: {
    backgroundColor: '#DBEAFE',
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusCancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#07B4C8',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.md,
  },

  appointmentDetails: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  reasonContainer: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  reasonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  reason: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: spacing.xl,
  },
  emptyIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#07B4C8',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 16,
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AppointmentsListScreen;
