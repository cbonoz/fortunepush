import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import store from 'react-native-simple-store';

import CurrentFortune from './CurrentFortune';
import History from './History';
import Settings from './Settings';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            fortunes: [],
            currentFortune: 'No Fortune yet.',
        };
    }

    componentWillMount() {
        const self = this;
        store.get('fortunes').then((res) => {
            console.log('fortunes: ' + res);
            if (typeof(res) === 'array') {
                self.setState({ fortunes: res });
                if (res.length > 1) {
                    const lastFortune = res[res.length - 1];
                    self.setState({currentFortune: lastFortune });
                }
            } else {
                console.log(`null fortunes pulled from memory ${res}`);
                self.setState({ fortunes: [] });
            }
        }).catch((error) => {
            console.error('error getting fortunes: ' + error.message);
        });
    }
        
    render() {
        return (
            <View style={{ flex: 1 }}>

                <IndicatorViewPager
                        style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}
                        indicator={this._renderTitleIndicator()}>
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <CurrentFortune currentFortune={this.state.currentFortune}/>
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <History fortunes={this.state.fortunes} />
                    </View>
                    <View style={{ backgroundColor: '#1AA094' }}>
                        <Settings />
                    </View>
                </IndicatorViewPager>

            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Today', 'History', 'Settings']} />;
    }

}