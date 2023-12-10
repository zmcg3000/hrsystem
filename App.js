import React, { useEffect, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './listScreen';
import ProfileScreen from './profileScreen';
import AddUpdateScreen from './addUpdateScreen';
import { styles, logoHeight } from './mobileStyles.js';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AccessibilitySettings from './accessibilitySettings';
import { SettingsProvider } from './settingsContext';

// Custom TopBar component used in the navigation header
const TopBar = ({ canGoBack, openSettings }) => {
  // Define the base styles for the logo and icon containers
  let logoContainerStyle = styles.topBarLogoContainer;
  let iconContainerStyle = styles.iconContainer;

  // Adjust styles based on the presence of the back arrow in the navigation
  if (!canGoBack) {
    logoContainerStyle = { ...logoContainerStyle, marginRight: 350 };
    iconContainerStyle = { ...iconContainerStyle, right: 10 };
  }

  if (canGoBack) {
    logoContainerStyle = { ...styles.topBarLogoContainerWithBack, marginLeft: -113 };
    iconContainerStyle = { ...iconContainerStyle, right: -285 };
  }

  return (
    <View style={styles.topBar}>
      <View style={logoContainerStyle}>
        <Image
          source={require('./images/logo.png')}
          resizeMode="contain"
          style={styles.topBarLogo}
        />
      </View>
      <View style={iconContainerStyle}>
        <Pressable onPress={openSettings}>
          <Icon name="settings" size={24} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  // State for checking if custom fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // State to control the visibility of the accessibility settings modal
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Function to open the accessibility settings modal
  const openSettings = () => setSettingsVisible(true);

  // Load custom fonts and handle splash screen
  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Arial': require('./assets/fonts/Arial_Regular/Arial_Regular.ttf'),
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
  // Render nothing until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }
  // Main app component structure
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTitle: (props) => (
              <TopBar canGoBack={navigation.canGoBack()} openSettings={openSettings} {...props} />
            ),
            headerStyle: {
              height: logoHeight,
            },
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