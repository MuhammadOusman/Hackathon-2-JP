import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors, typography, spacing} from '../theme';

const TermsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{padding: spacing.lg}}>
        <Text style={styles.h1}>Terms & Conditions</Text>
        <Text style={styles.p}>
          Welcome to our app. By using our services, you agree to the following
          terms and conditions. Please read them carefully.
        </Text>

        <Text style={styles.h2}>1. Acceptance of Terms</Text>
        <Text style={styles.p}>
          By accessing or using the Service you agree to be bound by these Terms.
          If you do not agree to these Terms, you may not use the Service.
        </Text>

        <Text style={styles.h2}>2. Use of the Service</Text>
        <Text style={styles.p}>
          You agree to use the Service only for lawful purposes and in a way that
          does not infringe the rights of others or restrict their use of the
          Service.
        </Text>

        <Text style={styles.h2}>3. Account Security</Text>
        <Text style={styles.p}>
          You are responsible for maintaining the confidentiality of your
          account credentials and for any activity that occurs under your
          account.
        </Text>

        <Text style={styles.h2}>4. Content and IP</Text>
        <Text style={styles.p}>
          All content provided through the Service is the intellectual property
          of the Service provider or its licensors.
        </Text>

        <Text style={styles.h2}>5. Limitation of Liability</Text>
        <Text style={styles.p}>
          In no event shall the Service provider be liable for any indirect,
          incidental, special, consequential or punitive damages arising out of
          your access or use of the Service.
        </Text>

        <Text style={styles.h2}>6. Changes to Terms</Text>
        <Text style={styles.p}>
          We may modify these Terms at any time. Updated terms will be posted in
          the app and become effective immediately upon posting.
        </Text>

        <Text style={styles.h2}>7. Contact</Text>
        <Text style={styles.p}>
          If you have any questions about these Terms, please contact support at
          support@yourapp.com
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

export default TermsScreen;
