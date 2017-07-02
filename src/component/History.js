//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from 'react-native-simple-store';

// create a component
class History extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>History</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default History;
