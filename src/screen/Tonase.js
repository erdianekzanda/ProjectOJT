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

export default function TonaseScreen({ onBack }) {
  // 1. Pilihan PKS (DLJ, NPN, EBL)
  const [selectedPks, setSelectedPks] = useState('EBL');
  const pksList = ['DLJ', 'NPN', 'EBL'];

  // 2. Input Tanggal (Default hari ini)
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split('T')[0]
  );

  // 3. Database Simulasi Dashboard (Harian, MTD, YTD) Per PKS
  const pksMetrics = {
    DLJ: {
      dailyActual: 420,
      dailyTarget: 500,
      mtdActual: 10500,
      mtdTarget: 12500,
      ytdActual: 120000,
      ytdTarget: 150000,
    },
    NPN: {
      dailyActual: 610,
      dailyTarget: 600,
      mtdActual: 15200,
      mtdTarget: 15000,
      ytdActual: 180000,
      ytdTarget: 180000,
    },
    EBL: {
      dailyActual: 850,
      dailyTarget: 1000,
      mtdActual: 21250,
      mtdTarget: 25000,
      ytdActual: 255000,
      ytdTarget: 300000,
    },
  };

  // Ambil metric sesuai PKS yang sedang dipilih
  const currentMetrics = pksMetrics[selectedPks];

  // Hitung Persentase
  const dailyPct = (
    (currentMetrics.dailyActual / currentMetrics.dailyTarget) *
    100
  ).toFixed(1);
  const mtdPct = (
    (currentMetrics.mtdActual / currentMetrics.mtdTarget) *
    100
  ).toFixed(1);
  const ytdPct = (
    (currentMetrics.ytdActual / currentMetrics.ytdTarget) *
    100
  ).toFixed(1);

  // 4. State Dinamis untuk List Supplier (Bisa Tambah Tanpa Batas)
  const [suppliers, setSuppliers] = useState([
    { id: '1', name: '', target: '', actual: '' },
  ]);

  // Fungsi Menambah Input Supplier
  const handleAddSupplier = () => {
    const newSupplier = {
      id: Date.now().toString(),
      name: '',
      target: '',
      actual: '',
    };
    setSuppliers([...suppliers, newSupplier]);
  };

  // Fungsi Hapus Input Supplier Tertentu
  const handleRemoveSupplier = (id) => {
    if (suppliers.length === 1) {
      Alert.alert('Peringatan', 'Minimal harus ada 1 form supplier.');
      return;
    }
    setSuppliers(suppliers.filter((item) => item.id !== id));
  };

  // Fungsi Update Value Input Supplier
  const handleInputChange = (id, field, value) => {
    const updatedSuppliers = suppliers.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setSuppliers(updatedSuppliers);
  };

  // Fungsi Simpan Data
  const handleSubmit = () => {
    // Validasi sederhana
    const hasEmpty = suppliers.some(
      (s) => !s.name || !s.target || !s.actual
    );

    if (hasEmpty) {
      Alert.alert(
        'Peringatan',
        'Mohon lengkapi Nama Supplier, Target, dan Aktual Tonase!'
      );
      return;
    }

    Alert.alert(
      'Berhasil Disimpan',
      `Data Tonase untuk ${selectedPks} pada tanggal ${tanggal} (${suppliers.length} Supplier) berhasil tersimpan!`
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
          <Text style={styles.headerTitle}>Input Tonase Supplier</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Pilihan PKS */}
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

          {/* Dashboard Metrics (Harian, MTD, YTD) */}
          <View style={styles.dashboardGrid}>
            {/* Harian */}
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>HARIAN ({selectedPks})</Text>
              <Text style={styles.metricValue}>
                {currentMetrics.dailyActual} / {currentMetrics.dailyTarget}{' '}
                <Text style={styles.unitText}>Ton</Text>
              </Text>
              <View
                style={[
                  styles.pctBadge,
                  {
                    backgroundColor:
                      dailyPct >= 100 ? '#d1fae5' : '#fee2e2',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    { color: dailyPct >= 100 ? '#059669' : '#dc2626' },
                  ]}
                >
                  {dailyPct}%
                </Text>
              </View>
            </View>

            {/* MTD */}
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>MTD ({selectedPks})</Text>
              <Text style={styles.metricValue}>
                {currentMetrics.mtdActual.toLocaleString()} /{' '}
                {currentMetrics.mtdTarget.toLocaleString()}{' '}
                <Text style={styles.unitText}>Ton</Text>
              </Text>
              <View
                style={[
                  styles.pctBadge,
                  {
                    backgroundColor:
                      mtdPct >= 100 ? '#d1fae5' : '#fee2e2',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    { color: mtdPct >= 100 ? '#059669' : '#dc2626' },
                  ]}
                >
                  {mtdPct}%
                </Text>
              </View>
            </View>

            {/* YTD */}
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>YTD ({selectedPks})</Text>
              <Text style={styles.metricValue}>
                {currentMetrics.ytdActual.toLocaleString()} /{' '}
                {currentMetrics.ytdTarget.toLocaleString()}{' '}
                <Text style={styles.unitText}>Ton</Text>
              </Text>
              <View
                style={[
                  styles.pctBadge,
                  {
                    backgroundColor:
                      ytdPct >= 100 ? '#d1fae5' : '#fee2e2',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pctText,
                    { color: ytdPct >= 100 ? '#059669' : '#dc2626' },
                  ]}
                >
                  {ytdPct}%
                </Text>
              </View>
            </View>
          </View>

          {/* Form Inputan Utama */}
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

            {/* List Supplier Dinamis */}
            <Text style={styles.sectionTitle}>Input Supplier & Tonase</Text>

            {suppliers.map((item, index) => (
              <View key={item.id} style={styles.supplierBlock}>
                <View style={styles.supplierHeader}>
                  <Text style={styles.supplierIndex}>
                    Supplier #{index + 1}
                  </Text>
                  {suppliers.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveSupplier(item.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* 1. Nama Supplier */}
                <Text style={styles.subLabel}>Nama Supplier</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: PT. Sawit Makmur / CV. Sumber Tani"
                  placeholderTextColor="#9ca3af"
                  value={item.name}
                  onChangeText={(val) =>
                    handleInputChange(item.id, 'name', val)
                  }
                />

                <View style={styles.rowTwoInput}>
                  {/* 2. Target Tonase */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subLabel}>Target Tonase (Ton)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="0"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={item.target}
                      onChangeText={(val) =>
                        handleInputChange(item.id, 'target', val)
                      }
                    />
                  </View>

                  {/* 3. Aktual Tonase */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subLabel}>Aktual Tonase (Ton)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="0"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={item.actual}
                      onChangeText={(val) =>
                        handleInputChange(item.id, 'actual', val)
                      }
                    />
                  </View>
                </View>
              </View>
            ))}

            {/* Tombol Tanda Plus (Tambah Supplier Tanpa Batas) */}
            <TouchableOpacity
              style={styles.addSupplierBtn}
              onPress={handleAddSupplier}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={22} color="#065f46" />
              <Text style={styles.addSupplierBtnText}>
                Tambah Supplier (+)
              </Text>
            </TouchableOpacity>

            {/* Tombol Simpan Semua Data */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-done" size={20} color="#ffffff" />
              <Text style={styles.submitBtnText}>Simpan Data Tonase</Text>
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

  /* PKS Select */
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

  /* Dashboard Metrics Grid */
  dashboardGrid: {
    gap: 10,
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    width: '28%',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  unitText: {
    fontSize: 11,
    fontWeight: 'normal',
    color: '#9ca3af',
  },
  pctBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pctText: {
    fontSize: 13,
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 14,
  },

  /* Block Supplier Input */
  supplierBlock: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 14,
  },
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  supplierIndex: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065f46',
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  rowTwoInput: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },

  /* Tombol Plus Supplier */
  addSupplierBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#e6f4ea',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 4,
    marginBottom: 20,
  },
  addSupplierBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#065f46',
  },

  /* Tombol Submit */
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: '#044e3a',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});