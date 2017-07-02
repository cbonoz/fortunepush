//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import store from 'react-native-simple-store';

// create a component
class FortuneList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fortunes: []
        }
    }

    componentWillMount() {
        store.get('fortunes').then((res) => {
            this.setState({ fortunes: res });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FortuneList</Text>
                <ListView
                    dataSource={this.state.fortunes}
                    renderRow={(rowData) => <Text style={styles.listItem}> {rowData}</Text>}
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
    listItem: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
});

//make this component available to the app
export default FortuneList;
