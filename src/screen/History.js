import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
  PanResponder,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HistoryScreen({ onBack }) {
  // Data Simulasi Riwayat PDCA
  const [historyData, setHistoryData] = useState([
    {
      id: '1',
      pks: 'PKS EBL',
      supplier: 'PT. Sawit Makmur',
      target: 100,
      actual: 65,
      problem: 'Akses jalan utama menuju mill mengalami kerusakan berat akibat hujan deras, armada truk tertahan di jalan.',
      solusi: 'Mengirimkan alat berat grader untuk meratakan jalan alternatif dan mengatur prioritas antrean armada.',
      dueDate: '2026-10-18',
      status: 'PENDING', // PENDING / COMPLETED
    },
    {
      id: '2',
      pks: 'PKS DLJ',
      supplier: 'CV. Sumber Tani',
      target: 80,
      actual: 45,
      problem: 'Keterbatasan unit armada truk pengangkut dari pihak supplier karena masalah perawatan berkala.',
      solusi: 'Koordinasi dengan supplier untuk menambah armada cadangan dari vendor pihak ketiga.',
      dueDate: '2026-10-20',
      status: 'PENDING',
    },
    {
      id: '3',
      pks: 'PKS NPN',
      supplier: 'UD. Tunas Muda',
      target: 60,
      actual: 60,
      problem: 'Antrean timbangan di pabrik sempat padat pada jam puncak pagi hari.',
      solusi: 'Pengaturan ulang shift penerimaan TBS dan optimalisasi 2 jalur timbangan secara bersamaan.',
      dueDate: '2026-10-14',
      status: 'COMPLETED',
    },
  ]);

  // State untuk Modal Detail PDCA
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fungsi Membuka Detail Card
  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Fungsi Mengubah Status Menjadi Completed (Seteleah Swipe)
  const handleCompletePDCA = (id) => {
    setHistoryData(
      historyData.map((item) =>
        item.id === id ? { ...item, status: 'COMPLETED' } : item
      )
    );
    setModalVisible(false);
    Alert.alert('Selesai!', 'Status PDCA berhasil diubah menjadi COMPLETED.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat PDCA & Action Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ringkasan Status Header */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {historyData.filter((i) => i.status === 'PENDING').length}
            </Text>
            <Text style={styles.summaryLabel}>Perlu Penanganan</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#10b981' }]}>
              {historyData.filter((i) => i.status === 'COMPLETED').length}
            </Text>
            <Text style={styles.summaryLabel}>Selesai (Completed)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Daftar Laporan PDCA</Text>

        {/* List Kartu PDCA Ringkas */}
        <View style={styles.cardList}>
          {historyData.map((item) => {
            const isPending = item.status === 'PENDING';

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => handleOpenDetail(item)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.pksBadge}>
                    <Text style={styles.pksBadgeText}>{item.pks}</Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: isPending ? '#fee2e2' : '#d1fae5',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: isPending ? '#ef4444' : '#059669' },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.supplierName}>{item.supplier}</Text>

                {/* Preview Problem Ringkas */}
                <Text style={styles.problemPreview} numberOfLines={2}>
                  <Text style={{ fontWeight: 'bold' }}>Problem: </Text>
                  {item.problem}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.dueDateText}>
                    Due Date: {item.dueDate}
                  </Text>
                  <View style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Lihat Detail</Text>
                    <Ionicons name="chevron-forward" size={14} color="#065f46" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Modal Detail & Swipe Complete */}
      {selectedItem && (
        <PDCADetailModal
          visible={modalVisible}
          item={selectedItem}
          onClose={() => setModalVisible(false)}
          onComplete={() => handleCompletePDCA(selectedItem.id)}
        />
      )}
    </SafeAreaView>
  );
}

// Sub-Komponen Modal Detail dengan Swipe Component
function PDCADetailModal({ visible, item, onClose, onComplete }) {
  const isPending = item.status === 'PENDING';

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalPks}>{item.pks}</Text>
              <Text style={styles.modalSupplier}>{item.supplier}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Detail Defisit Tonase */}
            <View style={styles.metricRow}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Target Tonase</Text>
                <Text style={styles.metricVal}>{item.target} Ton</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Aktual Tonase</Text>
                <Text style={[styles.metricVal, { color: '#ef4444' }]}>
                  {item.actual} Ton
                </Text>
              </View>
            </View>

            {/* Isi Detail 1: Problem Lapangan */}
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>1. Problem Lapangan</Text>
              <Text style={styles.detailBody}>{item.problem}</Text>
            </View>

            {/* Isi Detail 2: Solusi */}
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>2. Solusi & Action Plan</Text>
              <Text style={styles.detailBody}>{item.solusi}</Text>
            </View>

            {/* Isi Detail 3: Due Date */}
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>3. Tenggat Waktu (Due Date)</Text>
              <Text style={styles.detailBody}>{item.dueDate}</Text>
            </View>
          </ScrollView>

          {/* Area Footer: Swipe Button jika status PENDING, atau Tombol Tutup jika COMPLETED */}
          <View style={styles.modalFooter}>
            {isPending ? (
              <SwipeToCompleteButton onComplete={onComplete} />
            ) : (
              <TouchableOpacity style={styles.completedBanner} onPress={onClose}>
                <Ionicons name="checkmark-circle" size={20} color="#059669" />
                <Text style={styles.completedBannerText}>Masalah Sudah Selesai (Completed)</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Sub-Komponen Button Swipe Slider
function SwipeToCompleteButton({ onComplete }) {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const SWIPE_THRESHOLD = 180;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= 220) {
          pan.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx >= SWIPE_THRESHOLD) {
          Animated.spring(pan, {
            toValue: { x: 220, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            onComplete();
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.swipeTrack}>
      <Animated.View
        style={[styles.swipeThumb, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <Ionicons name="arrow-forward" size={20} color="#ffffff" />
      </Animated.View>
      <Text style={styles.swipeText}>Geser untuk Selesaikan »</Text>
    </View>
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

  /* Summary Box */
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 14,
  },

  /* Card List */
  cardList: {
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pksBadge: {
    backgroundColor: '#044e3a',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pksBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  supplierName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  problemPreview: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  dueDateText: {
    fontSize: 11,
    color: '#9ca3af',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065f46',
  },

  /* Modal Styling */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 12,
  },
  modalPks: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065f46',
  },
  modalSupplier: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  metricVal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 2,
  },
  detailSection: {
    marginBottom: 14,
  },
  detailTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  detailBody: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  modalFooter: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  /* Swipe Button */
  swipeTrack: {
    height: 54,
    backgroundColor: '#f3f4f6',
    borderRadius: 27,
    justifyContent: 'center',
    paddingHorizontal: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  swipeThumb: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  swipeText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6b7280',
    zIndex: 1,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1fae5',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  completedBannerText: {
    color: '#059669',
    fontWeight: 'bold',
    fontSize: 14,
  },
});