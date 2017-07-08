//import liraries
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';

import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast, {DURATION} from 'react-native-easy-toast'

import store from 'react-native-simple-store';
import fortunes from './../util/fortunes';
import { styles } from 'react-native-theme';

const JOB_ID = "123"
// create a component
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            dailyTime: "No time yet.", 
            scheduled: false,
            isDateTimePickerVisible: false,
            datePickerMode: 'time',
        };
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({dailyTime: date});
        this._hideDateTimePicker();
    };

    componentWillMount() {
        const self = this;
        store.get("scheduled").then((res) => {
            console.log('scheduled: ', res);
            if (typeof(res) === 'boolean') {
                self.setState({ scheduled: res });
            } else {
                self.setState({ scheduled: false });
            }
        }).catch(error => {
            console.error('error getting scheduled: ' + error.message);
        });

        store.get('dailyTime').then((res) => {
            console.log('dailyTime: ' + res);
            self.setState({ dailyTime: res });
        }).catch(error => {
            console.error('error getting dailyTime: ' + error.message);
        });
    }

    _showDateRequired() {
        this.refs.toast.show('You must set a fortune delivery time first.');
    }

    _setScheduled(isScheduled) {
        if (!(this.state.dailyTime instanceof Date)) {
            // No daily time set yet for scheduling.
            this._showDateRequired();

        }

        store.update("scheduled", isScheduled);
        console.log('_setScheduled: ' + isScheduled);
        this.setState({ scheduled: isScheduled });
        // Update the react scheduler for sending fortunes.
        if (isScheduled) {
            // TODO: make sure the daily time is defined before scheduling the next fortune alert.
            PushNotification.localNotificationSchedule({
                id: JOB_ID,
                message: fortunes.getNextFortune(), // (required)
                repeatType: 'day', // (Android only) Repeating interval. 
                repeatTime: 60000*60*24, // One day.
                date: this.state.dailyTime
            });
                // date: new Date(Date.now() + (60 * 1000)) // in 60 secs
        } else {
            // Cancel the existing scheduled notification task.
            PushNotification.cancelLocalNotifications({id: JOB_ID});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Settings</Text>

                <Text style={styles.h2}>Fortunes will be sent daily at the time listed below.</Text>

                <Button 
                    style={styles.fortuneButton}
                    title="Show TimePicker"
                    onPress={this._showDateTimePicker}>
                </Button>
                <DateTimePicker
                    mode={this.state.datePickerMode}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />

                <Text style={styles.h2}>Current Daily Scheduled Time:</Text>

                <Text style={styles.smallText}>{JSON.stringify(this.state.dailyTime)}</Text>

                <Switch onValueChange={this._setScheduled} value={this.state.scheduled} />

                 <Toast ref="toast"/>
            </View>
        );
    }
}
//make this component available to the app
export default Settings;
