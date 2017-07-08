//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet  } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import store from 'react-native-simple-store';
import Modal from 'react-native-modal';
import { styles } from 'react-native-theme';

// create a component
class FortuneList extends Component {

    createListView(items) {
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // return ds.cloneWithRows(items);
        return items;
    }

    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            modalFortune: null,
        };
    }


  _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  _renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

    _openFortuneModal(rowData) {
        this.setState({ modalFortune: rowData});
        this._showModal()
    }

    _showModal(){ 
        this.setState({ isModalVisible: true })
    }

    _hideModal() {
        this.setState({ isModalVisible: false })
    }

    _renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
          }}
        />
      );
    };

    
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.h1}>FortuneList</Text>
            <FlatList style={styles.flex1}
              data={this.props.fortunes}
              renderItem={({ item }) => (
                <ListItem
                style={styles.container}
                  title={`${item}`}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
              keyExtractor={item => item}
              ItemSeparatorComponent={this._renderSeparator}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
            />
            {/*<Modal isVisible={this.state.isModalVisible}>
                <View
                     style={{ flex: 1 }}>
                    <Text>{this.state.modalFortune}</Text>
                </View>
            </Modal>*/}
        </View>
    );
  }
}
//make this component available to the app
export default FortuneList;
