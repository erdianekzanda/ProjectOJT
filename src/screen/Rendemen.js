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

export default function RendemenScreen({ onBack }) {
  // 1. Pilihan PKS (DLJ, NPN, EBL)
  const [selectedPks, setSelectedPks] = useState('EBL');
  const pksList = ['DLJ', 'NPN', 'EBL'];

  // 2. Database Simulasi OER (Aktual vs Target %) Per PKS
  const oerMetrics = {
    DLJ: { oerActual: 20.15, oerTarget: 21.00 },
    NPN: { oerActual: 21.80, oerTarget: 21.50 },
    EBL: { oerActual: 19.85, oerTarget: 20.50 },
  };

  const currentMetric = oerMetrics[selectedPks];
  const oerPct = ((currentMetric.oerActual / currentMetric.oerTarget) * 100).toFixed(1);
  const isAchieved = currentMetric.oerActual >= currentMetric.oerTarget;

  // 3. State Inputan
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split('T')[0]
  );

  // State untuk List Input OER Distribusi Harian
  const [distribusiList, setDistribusiList] = useState([]);
  // State untuk List Input OER Pisah Olah
  const [pisahOlahList, setPisahOlahList] = useState([]);

  // Fungsi Tambah Form A (OER Distribusi Harian)
  const handleAddDistribusi = () => {
    const newEntry = {
      id: Date.now().toString(),
      oer: '',
    };
    setDistribusiList([...distribusiList, newEntry]);
  };

  // Fungsi Tambah Form B (OER Pisah Olah)
  const handleAddPisahOlah = () => {
    const newEntry = {
      id: Date.now().toString(),
      oer: '',
    };
    setPisahOlahList([...pisahOlahList, newEntry]);
  };

  // Remove Handlers
  const handleRemoveDistribusi = (id) => {
    setDistribusiList(distribusiList.filter((item) => item.id !== id));
  };

  const handleRemovePisahOlah = (id) => {
    setPisahOlahList(pisahOlahList.filter((item) => item.id !== id));
  };

  // Change Handlers
  const handleChangeDistribusi = (id, val) => {
    setDistribusiList(
      distribusiList.map((item) => (item.id === id ? { ...item, oer: val } : item))
    );
  };

  const handleChangePisahOlah = (id, val) => {
    setPisahOlahList(
      pisahOlahList.map((item) => (item.id === id ? { ...item, oer: val } : item))
    );
  };

  // Submit Handler
  const handleSubmit = () => {
    if (distribusiList.length === 0 && pisahOlahList.length === 0) {
      Alert.alert('Peringatan', 'Mohon tambahkan minimal satu input OER Distribusi Harian atau Pisah Olah.');
      return;
    }

    Alert.alert(
      'Berhasil Disimpan',
      `Data OER untuk ${selectedPks} tanggal ${tanggal} berhasil tersimpan.`
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
          <Text style={styles.headerTitle}>Input Distribusi OER</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Section Pilihan PKS */}
          <Text style={styles.sectionLabel}>Pilih PKS</Text>
          <View style={styles.pksContainer}>
            {pksList.map((pks) => (
              <TouchableOpacity
                key={pks}
                style={[
                  styles.pksChip,
                  selectedPks === pks && styles.pksChipActive,
                ]}
                onPress={() => setSelectedPks(pks)}
              >
                <Text
                  style={[
                    styles.pksChipText,
                    selectedPks === pks && styles.pksChipTextActive,
                  ]}
                >
                  {pks}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dashboard OER Metric */}
          <View style={styles.dashboardCard}>
            <View style={styles.dashHeader}>
              <MaterialCommunityIcons name="pie-chart" size={24} color="#044e3a" />
              <Text style={styles.dashTitle}>Dashboard OER ({selectedPks})</Text>
            </View>

            <View style={styles.dashMetricRow}>
              <View>
                <Text style={styles.dashSubLabel}>OER Aktual / Target</Text>
                <Text style={styles.dashMetricText}>
                  {currentMetric.oerActual}%{' '}
                  <Text style={styles.targetText}>/ {currentMetric.oerTarget}%</Text>
                </Text>
              </View>

              <View
                style={[
                  styles.pctBadge,
                  { backgroundColor: isAchieved ? '#d1fae5' : '#fee2e2' },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    { color: isAchieved ? '#059669' : '#dc2626' },
                  ]}
                >
                  {oerPct}%
                </Text>
              </View>
            </View>
          </View>

          {/* Form Card Inputan */}
          <View style={styles.formCard}>
            {/* Input Tanggal */}
            <Text style={styles.label}>Tanggal *</Text>
            <View style={styles.dateInputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
              <TextInput
                style={styles.dateInput}
                value={tanggal}
                onChangeText={setTanggal}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.divider} />

            {/* A. Input OER Distribusi Harian */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.groupTitle}>A. OER Distribusi Harian</Text>
              <TouchableOpacity
                style={styles.addBtnSmall}
                onPress={handleAddDistribusi}
              >
                <Ionicons name="add" size={18} color="#ffffff" />
                <Text style={styles.addBtnSmallText}>Tambah (+)</Text>
              </TouchableOpacity>
            </View>

            {distribusiList.map((item, index) => (
              <View key={item.id} style={styles.itemRowBlock}>
                <View style={styles.itemRowHeader}>
                  <Text style={styles.itemIndexText}>Entry #{index + 1}</Text>
                  <TouchableOpacity onPress={() => handleRemoveDistribusi(item.id)}>
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.subLabel}>OER (%)</Text>
                <View style={styles.inputWithPercent}>
                  <TextInput
                    style={styles.unitInput}
                    placeholder="0.00"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={item.oer}
                    onChangeText={(val) => handleChangeDistribusi(item.id, val)}
                  />
                  <Text style={styles.percentBadge}>%</Text>
                </View>
              </View>
            ))}

            <View style={styles.divider} />

            {/* B. Input OER Pisah Olah */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.groupTitle}>B. OER Pisah Olah</Text>
              <TouchableOpacity
                style={styles.addBtnSmall}
                onPress={handleAddPisahOlah}
              >
                <Ionicons name="add" size={18} color="#ffffff" />
                <Text style={styles.addBtnSmallText}>Tambah (+)</Text>
              </TouchableOpacity>
            </View>

            {pisahOlahList.map((item, index) => (
              <View key={item.id} style={styles.itemRowBlock}>
                <View style={styles.itemRowHeader}>
                  <Text style={styles.itemIndexText}>Entry #{index + 1}</Text>
                  <TouchableOpacity onPress={() => handleRemovePisahOlah(item.id)}>
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.subLabel}>OER (%)</Text>
                <View style={styles.inputWithPercent}>
                  <TextInput
                    style={styles.unitInput}
                    placeholder="0.00"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={item.oer}
                    onChangeText={(val) => handleChangePisahOlah(item.id, val)}
                  />
                  <Text style={styles.percentBadge}>%</Text>
                </View>
              </View>
            ))}

            {/* Tombol Simpan Semua Data */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-done" size={20} color="#ffffff" />
              <Text style={styles.submitBtnText}>Simpan Data OER</Text>
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

  /* Select PKS */
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },
  pksContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  pksChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  pksChipActive: {
    backgroundColor: '#044e3a',
    borderColor: '#044e3a',
  },
  pksChipText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '600',
  },
  pksChipTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  /* Dashboard Card */
  dashboardCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 20,
    elevation: 2,
  },
  dashHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  dashTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  dashMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashSubLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  dashMetricText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
  },
  targetText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: 'normal',
  },
  pctBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  pctText: {
    fontSize: 15,
    fontWeight: 'bold',
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
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fafafa',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    height: 46,
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 18,
  },

  /* Sections A & B */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  addBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#065f46',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 4,
  },
  addBtnSmallText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  /* Form Blocks */
  itemRowBlock: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  itemRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemIndexText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065f46',
  },
  subLabel: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  inputWithPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  unitInput: {
    flex: 1,
    height: 42,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  percentBadge: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Submit Button */
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: '#044e3a',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    elevation: 3,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});