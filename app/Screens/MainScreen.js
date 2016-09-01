import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Fetch, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import FCM from 'react-native-fcm';

var url = 'https://dbtest-9e865.firebaseio.com/test.json';

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      action: 'none',
      got: 'nothing',
      data: 'no data yet',
    };
  }

  componentDidMount(){
    FCM.getFCMToken().then(token => {
      console.log(token); //this would normally be stored on our server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token);
      // fcm token may not be available on first load, catch it here
    });

    FCM.subscribeToTopic('/topics/test');
    FCM.unsubscribeFromTopic('/topics/test');
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe()
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}> Fetcher </Text>
        <Text style={styles.description}>
          Try GET or POST rrfrom/to Firebase via REST API
        </Text>
        <Text style={styles.description}>
          {'Current url: ' + url}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonPOST()}>
            <Text> POST </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonGET()}>
            <Text> GET</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'black'}}> {`Data from Get: ${this.state.data}`}</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={(event) => this._onPressGetNotification()}>
          <Text style={{color: 'white'}}> Push for a notification </Text>
        </TouchableOpacity>
      </View>     
    );
  }

  _onPressButtonPOST(){
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'testerino',
        secondParam: 'testing',
      }),
    });
    this.setState({action: 'POST sent!'});
  }

  async _onPressButtonGET(){
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      this.setState({data: responseJson.blah});
      return responseJson.bleh;
    } catch (error) {
      console.error(error);        
    }
  }

  _onPressGetNotification(){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  buttons: {
   flexDirection: 'row',
   justifyContent: 'center',
   paddingTop: 50
  },

  button: {
    backgroundColor: '#cccccc',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    width: 80,
  },

  description: {
   marginBottom: 15,
   color: '#444444'
  },

  bottomButton: {
   backgroundColor: '#444444',
   position: 'absolute',
   alignItems: 'center',
   paddingTop: 20,
   paddingBottom: 20,
   bottom: 0,
   left: 0,
   right: 0,
  },

  title: {
   fontSize: 25,
   color: '#444444',
   paddingBottom: 50,
  }
});

module.exports = MainScreen