import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './listScreen';
import ProfileScreen from './profileScreen';
import AddUpdateScreen from './addUpdateScreen';
import mobileStyles from './mobileStyles.js';
import tabletStyles from './tabletStyles.js';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AccessibilitySettings from './accessibilitySettings';
import { SettingsProvider } from './settingsContext';
import Orientation from 'react-native-orientation-locker'; // Import Orientation

const Stack = createNativeStackNavigator();

const TopBar = ({ navigation, openSettings, styles }) => {
  const canGoBack = navigation && navigation.canGoBack();
  const logoContainerStyle = canGoBack ? styles.topBarLogoContainerWithBack : styles.topBarLogoContainer;
  const gearIconStyle = canGoBack ? styles.gearIconContainerWithBack : styles.gearIconContainer;

  return (
    <View style={styles.topBar}>
      <View style={logoContainerStyle}>
        <Image
          source={require('./assets/logo.png')}
          resizeMode="contain"
          style={styles.topBarLogoImage}
        />
      </View>
      <Pressable onPress={openSettings} style={gearIconStyle}>
        <Icon name="settings" size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Determine initial orientation and style
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const isTablet = deviceWidth > 768; // Adjust this value for tablet size if needed
  const initialStyles = isTablet ? tabletStyles : mobileStyles;
  const [currentStyles, setCurrentStyles] = useState(initialStyles);

  const openSettings = () => setSettingsVisible(true);

  const handleOrientationChange = useCallback(() => {
    const newDeviceWidth = Dimensions.get('window').width;
    const newDeviceHeight = Dimensions.get('window').height;
    const newIsTablet = newDeviceWidth > 768; // Re-check tablet size if needed

    setCurrentStyles(newIsTablet ? tabletStyles : mobileStyles);
  }, []);

  useEffect(() => {
    // Lock to landscape if tablet
    if (isTablet) {
      Orientation.lockToLandscape();
    }

    // Set initial styles and listen for orientation changes
    handleOrientationChange();
    Dimensions.addEventListener('change', handleOrientationChange);

    // Cleanup
    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
      Orientation.unlockAllOrientations(); // Unlock orientation on unmount
    };
  }, [handleOrientationChange, isTablet]);

  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Arial': require('./assets/Arial_Regular/Arial_Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTitle: () => <TopBar navigation={navigation} openSettings={openSettings} styles={currentStyles} />,
            headerStyle: { height: currentStyles.logoHeight },
            headerLeft: null,
          })}
        >
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddUpdate" component={AddUpdateScreen} />
        </Stack.Navigator>
        <AccessibilitySettings isVisible={settingsVisible} onClose={() => setSettingsVisible(false)} />
      </NavigationContainer>
    </SettingsProvider>
  );
}
