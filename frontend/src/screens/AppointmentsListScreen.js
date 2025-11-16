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
    <Card style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Avatar
          uri={item.providerId?.avatar}
          name={item.providerId?.name}
          size={48}
        />
        <View style={styles.appointmentInfo}>
          <Text style={styles.doctorName}>{item.providerId?.name || 'Dr. Unknown'}</Text>
          <Text style={styles.specialty}>{item.providerId?.specialty}</Text>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <View style={styles.rowIconText}>
          <Feather name="calendar" size={16} color="#06B6D4" style={{marginRight: 10}} />
          <Text style={styles.dateTime}>{new Date(item.startTime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
          </Text>
        </View>
        <View style={styles.rowIconText}>
          <Feather name="clock" size={14} color="#06B6D4" style={{marginRight: 10}} />
          <Text style={styles.dateTime}>{new Date(item.startTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          </Text>
        </View>
      </View>
      {item.reason && <Text style={styles.reason}>{item.reason}</Text>}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <Button
          title="Book New"
          onPress={() => navigation.navigate('BookAppointment')}
          size="small"
        />
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No appointments yet</Text>
            <Button
              title="Book Your First Appointment"
              onPress={() => navigation.navigate('BookAppointment')}
              style={styles.emptyButton}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  list: {
    padding: spacing.lg,
  },
  appointmentCard: {
    marginBottom: spacing.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  appointmentInfo: {
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
  appointmentDetails: {
    marginBottom: spacing.sm,
  },
  dateTime: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  rowIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reason: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...typography.tiny,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});

export default AppointmentsListScreen;
