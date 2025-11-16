import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Card from '../components/Card';
import {colors, typography, spacing} from '../theme';

const HelpScreen = () => {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer:
        'Go to the Appointments tab, tap "Book New", select a doctor, choose date and time, then confirm.',
    },
    {
      question: 'Can I cancel my appointment?',
      answer:
        'Yes, go to your appointment details and select the cancel option.',
    },
    {
      question: 'How do I upload medical records?',
      answer:
        'Navigate to the Records tab and tap "Upload File". You can upload PDFs and images.',
    },
    {
      question: 'How do I add medications?',
      answer:
        'Go to the Medications tab and tap "Add Medication". Fill in the details and save.',
    },
    {
      question: 'What if I forget my password?',
      answer:
        'Contact support at support@medicare.com to reset your password.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          Find answers to common questions
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

      {faqs.map((faq, index) => (
        <Card key={index} style={styles.faqCard}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Card style={styles.contactCard}>
        <Text style={styles.contactItem}>📧 Email: support@medicare.com</Text>
        <Text style={styles.contactItem}>📞 Phone: +1 (555) 123-4567</Text>
        <Text style={styles.contactItem}>
          🕐 Hours: Mon-Fri 9AM-6PM EST
        </Text>
      </Card>
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
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  faqCard: {
    marginBottom: spacing.md,
  },
  question: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  answer: {
    ...typography.body,
    color: colors.textSecondary,
  },
  contactCard: {
    marginBottom: spacing.xxl,
  },
  contactItem: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});

export default HelpScreen;
