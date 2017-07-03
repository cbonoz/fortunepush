//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import store from 'react-native-simple-store';

import FortuneList from './FortuneList';

// create a component
class CurrentFortune extends Component {

    goToSettings() {
        console.log('goToSettings');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>CurrentFortune</Text>

                <Image style={styles.centered} source={require('./../../assets/fortune_push_175.png')}/>

                <Button
                    onPress={goToSettings}
                    title="Configure Fortune Settings"
                    color="#841584"
                    accessibilityLabel="Generate a new fortune push notification"
                />
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
    centered: {
        margin: 20,
        alignSelf: 'center',
    },
});

//make this component available to the app
export default CurrentFortune;
