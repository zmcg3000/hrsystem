import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, Dimensions, LogBox } from 'react-native';
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
import * as ScreenOrientation from 'expo-screen-orientation';

LogBox.ignoreLogs(['new NativeEventEmitter']);

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
  const isTablet = deviceWidth > 768; // Adjust this value for tablet size if needed
  const initialStyles = isTablet ? tabletStyles : mobileStyles;
  const [currentStyles, setCurrentStyles] = useState(initialStyles);

  const openSettings = () => setSettingsVisible(true);

  useEffect(() => {
    async function changeScreenOrientation() {
      if (isTablet) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      }
    }

    changeScreenOrientation();

    // Set initial styles and listen for orientation changes
    const handleOrientationChange = () => {
      const newDeviceWidth = Dimensions.get('window').width;
      const newIsTablet = newDeviceWidth > 768;
      setCurrentStyles(newIsTablet ? tabletStyles : mobileStyles);
    };

    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    // Cleanup
    return () => {
      subscription.remove();
      ScreenOrientation.unlockAsync(); // Unlock orientation on unmount
    };
  }, [isTablet]);

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
