import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Import seluruh screen dari folder src/screen/
import LoginPage from './src/screen/LoginPage';
import HomePage from './src/screen/HomePage';
import TonaseScreen from './src/screen/Tonase';
import RendemenScreen from './src/screen/Rendemen';
import PDCAScreen from './src/screen/PDCA';
import HistoryScreen from './src/screen/History';

export default function App() {
  // State untuk melacak status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State untuk menentukan screen mana yang sedang dibuka
  // Pilihan: 'HOME', 'TONASE', 'RENDEMEN', 'PDCA', 'HISTORY'
  const [currentScreen, setCurrentScreen] = useState('HOME');

  // Callback Login & Logout
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('HOME');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('HOME');
  };

  // 1. Jika belum login, tampilkan LoginPage
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Jika sudah login, tampilkan layar sesuai state currentScreen
  return (
    <View style={styles.container}>
      {currentScreen === 'HOME' && (
        <HomePage
          onLogout={handleLogout}
          onNavigate={(screenName) => setCurrentScreen(screenName)}
        />
      )}

      {currentScreen === 'TONASE' && (
        <TonaseScreen onBack={() => setCurrentScreen('HOME')} />
      )}

      {currentScreen === 'RENDEMEN' && (
        <RendemenScreen onBack={() => setCurrentScreen('HOME')} />
      )}

      {currentScreen === 'PDCA' && (
        <PDCAScreen onBack={() => setCurrentScreen('HOME')} />
      )}

      {currentScreen === 'HISTORY' && (
        <HistoryScreen onBack={() => setCurrentScreen('HOME')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});