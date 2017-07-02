import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';

import CurrentFortune from './CurrentFortune';
import History from './History';
import Settings from './Settings';

export default class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <IndicatorViewPager
                    style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}>
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <CurrentFortune />
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <History />
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