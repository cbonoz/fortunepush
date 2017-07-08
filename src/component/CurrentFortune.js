//import liraries
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import store from 'react-native-simple-store';

import FortuneList from './FortuneList';

// create a component
class CurrentFortune extends Component {

    _goToSettings() {
        console.log('goToSettings');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.white}>Your Fortune for Today</Text>

                <Text style={styles.smallText}>{this.props.currentFortune}</Text>

                <Image style={styles.centered} source={require('./../../assets/fortune_push_175.png')}/>

                <Button
                    onPress={this._goToSettings}
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
    white: {
        color: '#fff',
    },
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
