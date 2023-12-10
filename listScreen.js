import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomTabBar from './customTabBar.js';
import { styles } from './mobileStyles.js';

function ListScreen({ navigation }) {
    // State for managing search query input
    const [searchQuery, setSearchQuery] = useState('');
    // State to hold the fetched people data
    const [peopleData, setPeopleData] = useState([]);
    // State for data that matches the search filter
    const [filteredData, setFilteredData] = useState([]);
    // State to handle any error messages
    const [error, setError] = useState('');

    // Function to fetch people data from the server
    const fetchPeopleData = async () => {
        try {
            const response = await fetch('https://2642-180-150-7-92.ngrok-free.app/people');
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response text:', errorText); // Log the error response
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data fetched:', data);

            // Apply search filter to the fetched data
            const filteredData = searchQuery
                ? data.filter(item => {
                    const itemData = item.Name.toUpperCase();
                    const textData = searchQuery.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
                : data;

            setPeopleData(data);
            setFilteredData(filteredData);
            setError(''); // Clear any errors
        } catch (error) {
            console.error('Error fetching people data:', error);
            setError('Could not load people data. Please try again later.'); // Set error state
        }
    };

    // Log when filteredData changes
    useEffect(() => {
        console.log('Filtered Data updated:', filteredData);
    }, [filteredData]);

    // Refetch people data when the search query changes
    useFocusEffect(
        useCallback(() => {
            fetchPeopleData();
        }, [searchQuery]) // Add searchQuery to the dependency array to refetch when it changes
    );

    // Function to handle the change in search input
    const searchFilterFunction = (text) => {
        const newData = text
            ? peopleData.filter(item => {
                const itemData = item.Name.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            : peopleData;
        setFilteredData(newData);
        setSearchQuery(text);
    };

    // Function to render each item in the FlatList
    const renderItem = ({ item }) => (
        <Pressable
            style={styles.listItem}
            onPress={() => navigation.navigate('Profile', { staffId: item.Id })}
        >
            <Text style={styles.listItemText}>{item.Name}</Text>
        </Pressable>
    );

    // Main component render
    return (
        <View style={styles.container}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.searchBar}
                placeholder="Search here..."
                placeholderTextColor={styles.roiMidGrey}
                value={searchQuery}
                onChangeText={searchFilterFunction}
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.Id.toString()}
                style={styles.list}
            />
            <CustomTabBar navigation={navigation} />
        </View>
    );
}

export default ListScreen;