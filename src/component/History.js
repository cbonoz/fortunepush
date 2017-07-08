//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from 'react-native-simple-store';

import FortuneList from './FortuneList';
import FlatListDemo from './FlatListDemo';

// create a component
class History extends Component {
    render() {
        return (
            <FortuneList style={styles.container} fortunes={this.props.fortunes}/>
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
    titleText: {
        justifyContent: 'center',
        alignSelf: 'center'
    },

});

//make this component available to the app
export default History;
