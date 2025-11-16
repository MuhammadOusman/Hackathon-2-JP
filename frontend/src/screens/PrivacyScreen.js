import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../theme';

const PrivacyScreen = ({navigation}) => {
  const [privacy, setPrivacy] = useState({
    shareProfile: false,
    shareActivity: false,
    showOnlineStatus: true,
    allowMessages: true,
    twoFactorAuth: false,
    biometricLogin: false,
  });

  const togglePrivacy = key => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear App Data',
      'This will remove all cached data from the app. Your account data will remain safe. Continue?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'App data cleared successfully');
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cancelled', 'Account deletion cancelled');
          },
        },
      ],
    );
  };

  const PrivacyItem = ({icon, title, description, value, onToggle}) => (
    <View style={styles.privacyItem}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.privacyInfo}>
        <Text style={styles.privacyTitle}>{title}</Text>
        <Text style={styles.privacyDescription}>{description}</Text>
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

  const ActionButton = ({icon, title, description, onPress, danger}) => (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, danger && styles.dangerIconBg]}>
        <Icon
          name={icon}
          size={22}
          color={danger ? '#EF4444' : colors.primary}
        />
      </View>
      <View style={styles.actionInfo}>
        <Text style={[styles.actionTitle, danger && styles.dangerText]}>
          {title}
        </Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Privacy Section */}
        <SectionHeader title="Privacy Settings" />
        <View style={styles.card}>
          <PrivacyItem
            icon="users"
            title="Share Profile"
            description="Allow others to view your profile"
            value={privacy.shareProfile}
            onToggle={() => togglePrivacy('shareProfile')}
          />
          <View style={styles.divider} />
          <PrivacyItem
            icon="activity"
            title="Share Activity"
            description="Share your health activity with doctors"
            value={privacy.shareActivity}
            onToggle={() => togglePrivacy('shareActivity')}
          />
          <View style={styles.divider} />
          <PrivacyItem
            icon="eye"
            title="Show Online Status"
            description="Let others see when you're online"
            value={privacy.showOnlineStatus}
            onToggle={() => togglePrivacy('showOnlineStatus')}
          />
          <View style={styles.divider} />
          <PrivacyItem
            icon="message-circle"
            title="Allow Messages"
            description="Receive messages from doctors"
            value={privacy.allowMessages}
            onToggle={() => togglePrivacy('allowMessages')}
          />
        </View>

        {/* Security Section */}
        <SectionHeader title="Security" />
        <View style={styles.card}>
          <PrivacyItem
            icon="shield"
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            value={privacy.twoFactorAuth}
            onToggle={() => togglePrivacy('twoFactorAuth')}
          />
          <View style={styles.divider} />
          <PrivacyItem
            icon="fingerprint"
            title="Biometric Login"
            description="Use fingerprint or face ID to login"
            value={privacy.biometricLogin}
            onToggle={() => togglePrivacy('biometricLogin')}
          />
        </View>

        {/* Data Management Section */}
        <SectionHeader title="Data Management" />
        <View style={styles.card}>
          <ActionButton
            icon="download"
            title="Download My Data"
            description="Get a copy of your data"
            onPress={() =>
              Alert.alert('Info', 'Your data will be emailed to you')
            }
          />
          <View style={styles.divider} />
          <ActionButton
            icon="trash-2"
            title="Clear App Data"
            description="Remove cached data from app"
            onPress={handleClearData}
          />
        </View>

        {/* Danger Zone */}
        <SectionHeader title="Danger Zone" />
        <View style={styles.card}>
          <ActionButton
            icon="alert-triangle"
            title="Delete Account"
            description="Permanently delete your account"
            onPress={handleDeleteAccount}
            danger
          />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Icon name="lock" size={20} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            Your privacy is important to us. We use industry-standard encryption
            to protect your data.
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
  privacyItem: {
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
  dangerIconBg: {
    backgroundColor: '#EF444415',
  },
  privacyInfo: {
    flex: 1,
    marginRight: 12,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionInfo: {
    flex: 1,
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  dangerText: {
    color: '#EF4444',
  },
  actionDescription: {
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

export default PrivacyScreen;
