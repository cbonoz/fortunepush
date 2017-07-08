import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from "./src/component/Home";

import PushNotification from 'react-native-push-notification';
import store from 'react-native-simple-store';
import theme from 'react-native-theme';

theme.add({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  middleAlign: {
    justifyContent: 'center',
  },
  listItem: {
    color: '#fff',
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  h1: {
    color: '#fff',
    textAlign: 'center', // <-- the magic
    margin: 12,
    fontSize: 24
  },
  flex1: {
    flex: 1,
  },
  h2: {
    color: '#fff',
    textAlign: 'center', // <-- the magic
    margin: 10,
    fontSize: 20
  },
  white: {
    color: '#fff'
  },
  fortuneButton: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  smallText: {
    color: '#fff',
    margin: 2,
    fontSize: 12
  }
});

export default class App extends Component {

  componentWillMount() {

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('onRegister (PushNotification):', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('onNotification:', notification);
        store.push("fortunes", notification);

      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  render() {
    return ( <Home />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});