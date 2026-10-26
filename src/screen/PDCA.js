import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PDCAScreen({ onBack, supplierData }) {
  // Data simulasi jika tidak ada data props yang dikirim
  const supplierInfo = supplierData || {
    pks: 'PKS EBL',
    namaSupplier: 'PT. Sawit Makmur',
    target: 100,
    actual: 65,
  };

  const selisihDefisit = supplierInfo.target - supplierInfo.actual;

  // State Form PDCA
  const [problem, setProblem] = useState('');
  const [solusi, setSolusi] = useState('');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Default besok
  );

  const handleSubmitPDCA = () => {
    if (!problem.trim() || !solusi.trim() || !dueDate.trim()) {
      Alert.alert('Peringatan', 'Mohon isi Problem Lapangan, Solusi, dan Due Date!');
      return;
    }

    Alert.alert(
      'PDCA Tersimpan',
      `Rencana tindakan PDCA untuk ${supplierInfo.namaSupplier} berhasil dicatat dan akan ditindaklanjuti sebelum ${dueDate}.`,
      [{ text: 'OK', onPress: onBack }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Form PDCA & Action Plan</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Card Warning Defisit Tonase */}
          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <Ionicons name="warning" size={24} color="#dc2626" />
              <Text style={styles.warningTitle}>PERINGATAN: TONASE TIDAK TERCAPAI</Text>
            </View>

            <Text style={styles.warningSubText}>
              Suplai dari supplier di bawah target yang ditentukan. Diperlukan tindakan PDCA.
            </Text>

            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Lokasi PKS:</Text>
                <Text style={styles.detailValBold}>{supplierInfo.pks}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Supplier:</Text>
                <Text style={styles.detailValBold}>{supplierInfo.namaSupplier}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Target / Aktual:</Text>
                <Text style={styles.detailValBold}>
                  {supplierInfo.target} Ton /{' '}
                  <Text style={{ color: '#dc2626' }}>{supplierInfo.actual} Ton</Text>
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Defisit Tonase:</Text>
                <Text style={[styles.detailValBold, { color: '#dc2626' }]}>
                  - {selisihDefisit} Ton
                </Text>
              </View>
            </View>
          </View>

          {/* Form PDCA */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Input Penanganan PDCA</Text>

            {/* 1. Problem Lapangan */}
            <Text style={styles.label}>1. Problem Lapangan *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Jelaskan kendala/masalah di lapangan (misal: jalan rusak, antrean pabrik, hujan deras)..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              value={problem}
              onChangeText={setProblem}
            />

            {/* 2. Solusi */}
            <Text style={styles.label}>2. Solusi & Rencana Perbaikan *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Masukkan solusi atau langkah penyelesaian masalah..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              value={solusi}
              onChangeText={setSolusi}
            />

            {/* 3. Due Date */}
            <Text style={styles.label}>3. Due Date (Tenggat Waktu) *</Text>
            <View style={styles.dateInputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
              <TextInput
                style={styles.dateInput}
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Tombol Simpan PDCA */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmitPDCA}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="clipboard-check-outline" size={20} color="#ffffff" />
              <Text style={styles.submitBtnText}>Simpan Tindakan PDCA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Warning Card */
  warningCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 20,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#991b1b',
  },
  warningSubText: {
    fontSize: 12,
    color: '#7f1d1d',
    marginBottom: 12,
  },
  detailBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailValBold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  /* Form Card */
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    height: 46,
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    elevation: 3,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});