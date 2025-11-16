import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors, typography, spacing} from '../theme';

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{padding: spacing.lg}}>
        <Text style={styles.h1}>Privacy Policy</Text>
        <Text style={styles.p}>
          This Privacy Policy explains how we collect, use, disclose, and protect
          your personal information when you use our Service.
        </Text>

        <Text style={styles.h2}>1. Information We Collect</Text>
        <Text style={styles.p}>
          We collect information you provide directly (such as name, email,
          phone, profile photo) and information collected automatically (usage
          data, device info).
        </Text>

        <Text style={styles.h2}>2. How We Use Information</Text>
        <Text style={styles.p}>
          We use your information to provide, maintain and improve the Service,
          communicate with you, and for security and fraud prevention purposes.
        </Text>

        <Text style={styles.h2}>3. Sharing & Disclosure</Text>
        <Text style={styles.p}>
          We do not sell personal information. We may share information with
          service providers and as required by law.
        </Text>

        <Text style={styles.h2}>4. Security</Text>
        <Text style={styles.p}>
          We implement reasonable administrative, technical, and physical
          safeguards to protect your information.
        </Text>

        <Text style={styles.h2}>5. Your Rights</Text>
        <Text style={styles.p}>
          Depending on your jurisdiction, you may have rights to access, update,
          delete, or restrict processing of your personal information.
        </Text>

        <Text style={styles.h2}>6. Contact</Text>
        <Text style={styles.p}>
          For privacy inquiries, contact us at privacy@yourapp.com
        </Text>

        <View style={{height: 60}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8FAFC'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {...typography.h2, color: colors.textPrimary},
  content: {flex: 1},
  h1: {...typography.h1, marginBottom: spacing.sm, color: colors.textPrimary},
  h2: {...typography.h3, marginTop: spacing.md, marginBottom: spacing.xs, color: colors.textPrimary},
  p: {...typography.body, color: colors.textSecondary, lineHeight: 20},
});

export default PrivacyPolicyScreen;
