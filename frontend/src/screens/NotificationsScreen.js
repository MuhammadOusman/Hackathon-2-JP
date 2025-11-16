import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../theme';

const NotificationsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState({
    appointments: true,
    medications: true,
    healthTips: false,
    promotions: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const toggleNotification = key => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const NotificationItem = ({icon, title, description, value, onToggle}) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.notificationInfo}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{false: '#E5E5E5', true: colors.primary + '40'}}
        thumbColor={value ? colors.primary : '#999'}
        ios_backgroundColor="#E5E5E5"
      />
    </View>
  );

  const SectionHeader = ({title}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Gradients */}
      <View style={[styles.gradient, styles.gradientCyan]} />
      <View style={[styles.gradient, styles.gradientPurple]} />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* General Section */}
        <SectionHeader title="General" />
        <View style={styles.card}>
          <NotificationItem
            icon="calendar"
            title="Appointment Reminders"
            description="Get notified about upcoming appointments"
            value={notifications.appointments}
            onToggle={() => toggleNotification('appointments')}
          />
          <View style={styles.divider} />
          <NotificationItem
            icon="clock"
            title="Medication Reminders"
            description="Reminders to take your medications"
            value={notifications.medications}
            onToggle={() => toggleNotification('medications')}
          />
          <View style={styles.divider} />
          <NotificationItem
            icon="heart"
            title="Health Tips"
            description="Daily health and wellness tips"
            value={notifications.healthTips}
            onToggle={() => toggleNotification('healthTips')}
          />
          <View style={styles.divider} />
          <NotificationItem
            icon="tag"
            title="Promotions & Offers"
            description="Special offers and discounts"
            value={notifications.promotions}
            onToggle={() => toggleNotification('promotions')}
          />
        </View>

        {/* Channels Section */}
        <SectionHeader title="Notification Channels" />
        <View style={styles.card}>
          <NotificationItem
            icon="bell"
            title="Push Notifications"
            description="Receive notifications on your device"
            value={notifications.pushNotifications}
            onToggle={() => toggleNotification('pushNotifications')}
          />
          <View style={styles.divider} />
          <NotificationItem
            icon="mail"
            title="Email Notifications"
            description="Receive notifications via email"
            value={notifications.emailNotifications}
            onToggle={() => toggleNotification('emailNotifications')}
          />
          <View style={styles.divider} />
          <NotificationItem
            icon="message-square"
            title="SMS Notifications"
            description="Receive notifications via SMS"
            value={notifications.smsNotifications}
            onToggle={() => toggleNotification('smsNotifications')}
          />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Icon name="info" size={20} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            You can manage notification preferences at any time. Changes will be
            saved automatically.
          </Text>
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.1,
  },
  gradientCyan: {
    backgroundColor: colors.primary,
    top: -50,
    right: -50,
  },
  gradientPurple: {
    backgroundColor: '#9333EA',
    bottom: 100,
    left: -80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 72,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'flex-start',
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});

export default NotificationsScreen;
