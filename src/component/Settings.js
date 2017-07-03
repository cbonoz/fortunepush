//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import DatePicker from 'react-native-time-picker'
import store from 'react-native-simple-store';

import PushNotification from 'react-native-push-notification';

import fortunes from './../util/fortunes';

const JOB_ID = "123"
// create a component
class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = { dailyTime: "", scheduled: false }
    }

    componentWillMount() {
        store.get("scheduled").then((res) => {
            this.setState({ scheduled: res });
        })
    }

    setScheduled(val) {
        store.update("scheduled", val);
        this.setState({ scheduled: val });
        // Update the react scheduler for sending fortunes.
        if (val) {
            // TODO: make sure the daily time is defined before scheduling the next fortune alert.
            PushNotification.localNotificationSchedule({
                id: JOB_ID,
                message: fortunes.getNextFortune(), // (required)
                repeatType: 'day', // (Android only) Repeating interval. 
                repeatTime: 60000*60*24, // One day.
                date: new Date(Date.now() + (60 * 1000)) // in 60 secs
            });
        } else {
            PushNotification.cancelLocalNotifications({id: JOB_ID});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>

                <Text>Fortunes will be sent daily at the time listed below.</Text>

                <DatePicker
                    style={{ width: 200 }}
                    dailyTime={this.state.dailyTime}
                    mode="dailyTime"
                    placeholder="select dailyTime"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dailyTimeIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dailyTimeInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(dailyTime) => { this.setState({ dailyTime: dailyTime }) }}
                />

                <Text>Current Daily Scheduled Time: {this.state.dailyTime}</Text>

                <Switch onValueChange={this.setScheduled} value={this.state.scheduled} />
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
export default Settings;
