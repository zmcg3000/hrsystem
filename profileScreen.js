import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { fetchEmployeeData } from './dataManager.js';
import CustomTabBar from './customTabBar.js';
import { styles } from './mobileStyles.js';
import { SettingsContext } from './settingsContext';


function ProfileScreen({ route, navigation }) {
    const { settings } = useContext(SettingsContext);
    const { textSize } = settings;
    // Get staffId from navigation parameters
    const { staffId } = route.params;
    // State to store employee data
    const [staffMember, setStaffMember] = useState(null);

    useEffect(() => {
        // Fetching employee data on component mount or staffId change
        fetchEmployeeData(staffId)
            .then(data => {
                setStaffMember(data); // Set fetched data to state
            })
            .catch(error => {
                // Error handling logic can be added here
                console.error('Error fetching data:', error);
            });
    }, [staffId]); // Dependency array with staffId ensures effect runs when staffId changes

    // Display loading text if staff data is not yet available
    if (!staffMember) {
        return <Text style={styles.normalText}>Loading...</Text>;
    }

    // Main component render
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.profileSection}>
                    <Text style={[styles.heading2, { fontSize: textSize }]}>{`Staff ID: ${staffMember.StaffId}`}</Text>
                    <Text style={[styles.heading2, { fontSize: textSize }]}>{`Name: ${staffMember.Name}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`Phone: ${staffMember.Phone}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`Department: ${staffMember.Department}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`Street: ${staffMember.Address.Street}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`City: ${staffMember.Address.City}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`State: ${staffMember.Address.State}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`ZIP: ${staffMember.Address.ZIP}`}</Text>
                    <Text style={[styles.normalText, { fontSize: textSize }]}>{`Country: ${staffMember.Address.Country}`}</Text>

                </View>
            </ScrollView>

            <View style={styles.fixedActionButtonsContainer}>
                <Pressable style={[styles.button, { flex: 1 }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={[styles.button, { flex: 1 }]} onPress={() => navigation.navigate('AddUpdate', { staffId: staffId })}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>

            <CustomTabBar navigation={navigation} />

        </SafeAreaView>
    );
}

export default ProfileScreen;