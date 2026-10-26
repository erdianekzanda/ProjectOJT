import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

export default function HomePage({ onLogout, onNavigate }) {
  // Data simulasi tonase total
  const tonaseHarian = 2580.75; // Ton
  const targetTonase = 3000.0; // Ton
  const persentasePencapaian = ((tonaseHarian / targetTonase) * 100).toFixed(1);

  // Data Pencapaian Per PKS
  const dataPKS = [
    { id: '1', name: 'PKS EBL', aktual: 920, target: 1000 },
    { id: '2', name: 'PKS DLJ', aktual: 780, target: 1000 }, // Tidak tercapai (Merah)
    { id: '3', name: 'PKS NPN', aktual: 880, target: 1000 }, // Tidak tercapai (Merah)
    { id: '4', name: 'PKS HPM', aktual: 1050, target: 1000 }, // Tercapai/Melampaui (Hijau)
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header User */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Selamat Pagi,</Text>
            <Text style={styles.userName}>Ayesha Khan 👋</Text>
          </View>
          <TouchableOpacity onPress={onLogout}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Card Highlight Tonase Harian vs Target Total */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>Tonase Harian Tercapai</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>
                  {tonaseHarian.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.unitText}> Ton</Text>
              </View>
            </View>
            <View style={styles.targetBadge}>
              <Text style={styles.targetLabel}>Target Total</Text>
              <Text style={styles.targetValue}>
                {targetTonase.toLocaleString('id-ID')} Ton
              </Text>
            </View>
          </View>

          {/* Persentase Pencapaian */}
          <View style={styles.growthBadge}>
            <Ionicons name="trending-up-outline" size={18} color="#34d399" />
            <Text style={styles.growthText}>
              {persentasePencapaian}%{' '}
              <Text style={styles.thisMonthText}>tercapai hari ini</Text>
            </Text>
          </View>
        </View>

        {/* 4 Menu Utama */}
        <Text style={styles.sectionTitle}>Menu Utama</Text>
        <View style={styles.actionsContainer}>
          {/* Input Tonase */}
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate('TONASE')}
          >
            <View style={styles.actionIconBg}>
              <MaterialCommunityIcons name="scale-balance" size={26} color="#065f46" />
            </View>
            <Text style={styles.actionLabel}>Input Tonase</Text>
          </TouchableOpacity>

          {/* Input Distribusi OER */}
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate('RENDEMEN')}
          >
            <View style={styles.actionIconBg}>
              <Ionicons name="pie-chart-outline" size={24} color="#065f46" />
            </View>
            <Text style={styles.actionLabel}>Input Distribusi OER</Text>
          </TouchableOpacity>

          {/* Problem & Activity */}
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate('PDCA')}
          >
            <View style={styles.actionIconBg}>
              <Octicons name="report" size={22} color="#065f46" />
            </View>
            <Text style={styles.actionLabel}>Problem & Activity</Text>
          </TouchableOpacity>

          {/* History */}
          <TouchableOpacity
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate('HISTORY')}
          >
            <View style={styles.actionIconBg}>
              <Ionicons name="time-outline" size={24} color="#065f46" />
            </View>
            <Text style={styles.actionLabel}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Pencapaian Setiap PKS */}
        <View style={styles.dashboardHeader}>
          <Text style={styles.sectionTitle}>Pencapaian Tonase Per PKS</Text>
          <Text style={styles.dashboardSubTitle}>Aktual vs Target Harian</Text>
        </View>

        <View style={styles.pksList}>
          {dataPKS.map((item) => {
            const isAchieved = item.aktual >= item.target;
            const percentage = Math.min(((item.aktual / item.target) * 100), 100).toFixed(0);
            const barColor = isAchieved ? '#10b981' : '#ef4444'; // Merah jika tidak tercapai, Hijau jika tercapai

            return (
              <View key={item.id} style={styles.pksCard}>
                <View style={styles.pksCardHeader}>
                  <Text style={styles.pksName}>{item.name}</Text>
                  <Text style={[styles.pksPercentage, { color: barColor }]}>
                    {((item.aktual / item.target) * 100).toFixed(1)}%
                  </Text>
                </View>

                {/* Info Detail Tonase */}
                <View style={styles.pksDetailRow}>
                  <Text style={styles.pksDetailText}>
                    Aktual: <Text style={{ fontWeight: 'bold', color: barColor }}>{item.aktual} Ton</Text>
                  </Text>
                  <Text style={styles.pksDetailText}>
                    Target: <Text style={{ fontWeight: 'bold', color: '#4b5563' }}>{item.target} Ton</Text>
                  </Text>
                </View>

                {/* Grafik Bar Visualisasi */}
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${percentage}%`,
                        backgroundColor: barColor,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#065f46" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate && onNavigate('HISTORY')}
        >
          <Ionicons name="bar-chart-outline" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onLogout}>
          <Ionicons name="person-outline" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 14,
    color: '#065f46',
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  /* Card Highlight Tonase */
  cardContainer: {
    backgroundColor: '#044e3a',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#044e3a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLabel: {
    color: '#a7f3d0',
    fontSize: 13,
    fontWeight: '500',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
  },
  balanceText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  unitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  targetBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  targetLabel: {
    color: '#a7f3d0',
    fontSize: 10,
  },
  targetValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 2,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  growthText: {
    color: '#34d399',
    fontSize: 13,
    fontWeight: 'bold',
  },
  thisMonthText: {
    color: '#a7f3d0',
    fontWeight: '400',
  },

  /* Section Title */
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },

  /* 4 Action Buttons Grid */
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 28,
  },
  actionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconBg: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 14,
  },

  /* Dashboard PKS Section */
  dashboardHeader: {
    marginBottom: 14,
  },
  dashboardSubTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  pksList: {
    gap: 12,
  },
  pksCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  pksCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pksName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  pksPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pksDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pksDetailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  barBackground: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },

  /* Bottom Navigation */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#065f46',
    fontWeight: '700',
  },
});