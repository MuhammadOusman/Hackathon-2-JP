import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import {providerService, appointmentService} from '../services/api';
import {colors, typography, spacing, borderRadius} from '../theme';

const BookAppointmentScreen = ({navigation}) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleBookAppointment = async () => {
    if (!selectedProvider || !date || !time) {
      Alert.alert('Error', 'Please select provider, date and time');
      return;
    }

    setLoading(true);
    try {
      const startTime = new Date(`${date}T${time}:00`).toISOString();
      await appointmentService.create(selectedProvider._id, startTime, reason);
      Alert.alert('Success', 'Appointment booked successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AppointmentsList'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Select Doctor</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.providersScroll}>
        {providers.map(provider => (
          <TouchableOpacity
            key={provider._id}
            onPress={() => setSelectedProvider(provider)}
            style={[
              styles.providerCard,
              selectedProvider?._id === provider._id && styles.selectedProvider,
            ]}>
            <Avatar uri={provider.avatar} name={provider.name} size={64} />
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
            <Text style={styles.providerRating}>⭐ {provider.rating}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Date & Time</Text>
      <Card>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            placeholder="2024-11-25"
            value={date}
            onChangeText={setDate}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time (HH:MM 24-hour)</Text>
          <TextInput
            style={styles.input}
            placeholder="14:30"
            value={time}
            onChangeText={setTime}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reason (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your symptoms or reason for visit"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </Card>

      <Button
        title="Book Appointment"
        onPress={handleBookAppointment}
        loading={loading}
        style={styles.bookButton}
      />
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
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  providersScroll: {
    marginBottom: spacing.xl,
  },
  providerCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: 'center',
    width: 120,
  },
  selectedProvider: {
    borderColor: colors.primary,
    backgroundColor: colors.bgGradientTop,
  },
  providerName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  providerSpecialty: {
    ...typography.tiny,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  providerRating: {
    ...typography.tiny,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
});

export default BookAppointmentScreen;
