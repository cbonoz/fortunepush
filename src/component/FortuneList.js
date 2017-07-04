//import liraries
import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native';

import store from 'react-native-simple-store';

// create a component
class FortuneList extends Component {

    createListView(items) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(items);
    }

    componentWillMount() {
        store.get('fortunes').then((res) => {
            console.log('fortunes: ' + res);
            this.setState({ fortunes: this.createListView(res) });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    constructor() {
        super();
        this.state = {
            dataSource: this.createListView(['row 1', 'row 2']),
        };
    }

    render() {
      return (
        <View style={styles.container}>
            <Text>FortuneList</Text>
            <ListView dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text style={styles.listItem}>{rowData}</Text>}
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
        color: '#fff',
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
});

//make this component available to the app
export default FortuneList;
