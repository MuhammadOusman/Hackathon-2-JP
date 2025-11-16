import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import Card from '../components/Card';
import Feather from 'react-native-vector-icons/Feather';
import {colors, typography, spacing} from '../theme';

const FAQ_DATA = [
  {
    id: 'q1',
    question: 'How do I book an appointment?',
    answer:
      'Go to the Book Appointment screen, choose a doctor, pick a date and time slot then confirm. You will receive a confirmation and reminder.',
  },
  {
    id: 'q2',
    question: 'How can I upload medical records?',
    answer:
      'Open Records screen, tap the + button and choose Photo/Image or PDF to upload. Files are securely stored in the cloud.',
  },
  {
    id: 'q3',
    question: 'How do I change my profile photo?',
    answer:
      'Tap Edit Profile from the Profile screen, then use the camera icon to pick a new photo from your gallery.',
  },
  {
    id: 'q4',
    question: 'How do I contact support?',
    answer:
      'Use the Contact Support card below to call or email our support team. We usually reply within 24 hours.',
  },
  {
    id: 'q5',
    question: 'How do I delete my account?',
    answer:
      "Go to Privacy & Security -> Delete Account. This will remove all your data permanently. If you're unsure, contact support first.",
  },
];

const HelpScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    if (!query) return FAQ_DATA;
    const q = query.toLowerCase();
    return FAQ_DATA.filter(
      item =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [query]);

  const onToggle = id => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleCall = () => {
    const phone = '+1234567890';
    const url = `tel:${phone}`;
    Linking.openURL(url).catch(() => {});
  };

  const handleEmail = () => {
    const email = 'support@yourapp.com';
    Linking.openURL(`mailto:${email}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>Help & FAQs</Text>
        <Text style={styles.subtitle}>Find answers to common questions</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.searchRow}>
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search FAQs, topics or keywords"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        <View style={{paddingHorizontal: 0}}>
          {filtered.map(item => (
            <Card key={item.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.qHeader}
                onPress={() => onToggle(item.id)}
                activeOpacity={0.8}>
                <View style={styles.qLeft}>
                  <Feather name="help-circle" size={18} color={colors.primary} />
                </View>
                <Text style={styles.qQuestion}>{item.question}</Text>
                <Feather
                  name={openId === item.id ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#888"
                />
              </TouchableOpacity>
              {openId === item.id && (
                <View style={styles.qAnswerWrap}>
                  <Text style={styles.qAnswer}>{item.answer}</Text>
                </View>
              )}
            </Card>
          ))}

          {filtered.length === 0 && (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          )}
        </View>

        <Text style={[styles.sectionTitle, {marginTop: 18}]}>Contact Support</Text>
        <Card style={styles.contactCard}>
          <Text style={styles.smallText}>
            If you couldn't find an answer, reach out to our support team.
          </Text>
          <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
              <Feather name="phone" size={16} color="#FFF" />
              <Text style={styles.contactBtnText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactBtn, styles.emailBtn]}
              onPress={handleEmail}>
              <Feather name="mail" size={16} color="#FFF" />
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.openTicket}
            onPress={() => {
              // placeholder: open ticket flow
            }}>
            <Feather name="file-text" size={16} color={colors.primary} />
            <Text style={styles.openTicketText}>Open a support ticket</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8FAFC'},
  headerWrap: {padding: spacing.lg, paddingTop: spacing.xl},
  title: {...typography.h1, color: colors.textPrimary},
  subtitle: {...typography.body, color: colors.textSecondary, marginTop: 6},
  content: {flex: 1, paddingHorizontal: spacing.lg},
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {flex: 1, marginLeft: 8, color: '#111', fontSize: 14},
  sectionTitle: {...typography.h3, color: colors.textPrimary, marginBottom: 8},
  faqCard: {marginBottom: 10, paddingVertical: 6, paddingHorizontal: 8},
  qHeader: {flexDirection: 'row', alignItems: 'center'},
  qLeft: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  qQuestion: {flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary},
  qAnswerWrap: {paddingLeft: 50, paddingTop: 8, paddingBottom: 10},
  qAnswer: {color: '#555', fontSize: 13, lineHeight: 20},
  emptyWrap: {padding: 20, alignItems: 'center'},
  emptyText: {color: '#777'},
  smallText: {color: '#555', marginBottom: 12},
  contactCard: {padding: 12},
  contactRow: {flexDirection: 'row', justifyContent: 'space-between'},
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  emailBtn: {backgroundColor: '#06b6d4'},
  contactBtnText: {color: '#FFF', marginLeft: 8, fontWeight: '600'},
  openTicket: {marginTop: 12, flexDirection: 'row', alignItems: 'center', padding: 10},
  openTicketText: {color: colors.primary, marginLeft: 10, fontWeight: '700'},
});

export default HelpScreen;
