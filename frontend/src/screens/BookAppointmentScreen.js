import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Feather from 'react-native-vector-icons/Feather';
import {providerService, appointmentService} from '../services/api';
import {colors, typography, spacing, borderRadius} from '../theme';

const BookAppointmentScreen = ({navigation}) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  // Time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM',
  ];

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const data = await providerService.getAll();
      setProviders(data);
    } catch (error) {
      console.error('Error loading providers:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBookAppointment = async () => {
    if (!selectedProvider) {
      Alert.alert('Error', 'Please select a doctor');
      return;
    }

    if (!selectedTimeSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }

    setLoading(true);
    try {
      // Parse selected time slot
      const [timeStr, period] = selectedTimeSlot.split(' ');
      const [hours, minutes] = timeStr.split(':');
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;

      // Combine date and time
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hour);
      appointmentDate.setMinutes(parseInt(minutes));
      
      const startTime = appointmentDate.toISOString();
      await appointmentService.create(selectedProvider._id, startTime, reason);
      Alert.alert('Success', 'Appointment booked successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
      {/* Background gradients */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />

      <View style={styles.header}>
        <Text style={styles.subtitle}>Book Your</Text>
        <Text style={styles.title}>Appointment</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="user" size={20} color="#07B4C8" />
          <Text style={styles.sectionTitle}>Select Doctor</Text>
        </View>
        
        <View style={styles.providersGrid}>
          {providers.map(provider => (
            <TouchableOpacity
              key={provider._id}
              onPress={() => setSelectedProvider(provider)}
              activeOpacity={0.7}
              style={[
                styles.providerCard,
                selectedProvider?._id === provider._id && styles.selectedProvider,
              ]}>
              {selectedProvider?._id === provider._id && (
                <View style={styles.selectedBadge}>
                  <Feather name="check" size={16} color="#FFFFFF" />
                </View>
              )}
              
              <View style={styles.avatarWrapper}>
                <Avatar uri={provider.avatar} name={provider.name} size={64} />
              </View>
              
              <Text style={styles.providerName} numberOfLines={1}>{provider.name}</Text>
              <Text style={styles.providerSpecialty} numberOfLines={1}>{provider.specialty}</Text>
              
              <View style={styles.ratingContainer}>
                <Feather name="star" size={12} color="#FFA500" />
                <Text style={styles.providerRating}>{provider.rating}</Text>
              </View>

              {selectedProvider?._id === provider._id && (
                <View style={styles.selectedOverlay} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="calendar" size={20} color="#07B4C8" />
          <Text style={styles.sectionTitle}>Date & Time</Text>
        </View>

        <View style={styles.dateTimeCard}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(!showDatePicker)}
            activeOpacity={0.7}>
            <View style={styles.iconBg}>
              <Feather name="calendar" size={22} color="#07B4C8" />
            </View>
            <View style={styles.dateTimeInfo}>
              <Text style={styles.dateTimeLabel}>Date</Text>
              <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
            </View>
            <Feather name={showDatePicker ? "chevron-up" : "chevron-down"} size={20} color="#CBD5E1" />
          </TouchableOpacity>
          
          {showDatePicker && (
            <View style={styles.calendarContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                onChange={onDateChange}
                minimumDate={new Date()}
                themeVariant="light"
                style={styles.calendar}
              />
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.timeSlotSection}>
            <View style={styles.timeSlotHeader}>
              <Feather name="clock" size={18} color="#07B4C8" />
              <Text style={styles.timeSlotTitle}>Select Time Slot</Text>
            </View>
            
            <View style={styles.timeSlotsGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlot,
                    selectedTimeSlot === slot && styles.selectedTimeSlot,
                  ]}
                  onPress={() => setSelectedTimeSlot(slot)}
                  activeOpacity={0.7}>
                  <Text style={[
                    styles.timeSlotText,
                    selectedTimeSlot === slot && styles.selectedTimeSlotText,
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="file-text" size={20} color="#07B4C8" />
          <Text style={styles.sectionTitle}>Reason for Visit</Text>
        </View>
        
        <View style={styles.reasonCard}>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your symptoms or reason for visit..."
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={5}
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.bookButton, loading && styles.bookButtonDisabled]}
        onPress={handleBookAppointment}
        disabled={loading}
        activeOpacity={0.8}>
        <Feather name="check-circle" size={22} color="#FFFFFF" />
        <Text style={styles.bookButtonText}>
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </Text>
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
    top: -100,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#07B4C8',
    opacity: 0.1,
  },
  bgGradient2: {
    position: 'absolute',
    bottom: 150,
    left: -90,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#8B5CF6',
    opacity: 0.08,
  },

  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // Provider Cards
  providersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    padding: spacing.lg,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    width: '48%',
    alignItems: 'center',
  },
  selectedProvider: {
    borderColor: '#07B4C8',
    backgroundColor: '#FFFFFF',
    shadowColor: '#07B4C8',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#07B4C8',
    opacity: 0.05,
    borderRadius: 18,
    pointerEvents: 'none',
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#07B4C8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.md,
    padding: 3,
    backgroundColor: '#F8FAFC',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  providerSpecialty: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  providerRating: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // Date & Time Card
  dateTimeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dateTimeInfo: {
    flex: 1,
  },
  dateTimeLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  calendarContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    padding: spacing.sm,
  },
  calendar: {
    height: 340,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.md,
  },
  timeSlotSection: {
    marginTop: spacing.sm,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  timeSlotTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    borderColor: '#07B4C8',
    backgroundColor: '#07B4C8',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },

  // Reason Card
  reasonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  textArea: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
    minHeight: 120,
    textAlignVertical: 'top',
  },

  // Book Button
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#07B4C8',
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default BookAppointmentScreen;
