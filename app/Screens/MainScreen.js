import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Fetch, TouchableOpacity, TouchableNativeFeedback, DeviceEventEmitter, ListView, Image } from 'react-native';
import FCM from 'react-native-fcm';
import BlurView from 'react-native-blur';

var url = 'https://dbtest-9e865.firebaseio.com/contacts.json';
var f1 = 0x111111ff;
var feedColors = ['#000000bb', '#000000cc'];
const feedInfo = [
    {contactRole: 'Claims Examiner',    name: "Oliver Queen"},
    {contactRole: 'Physician',          name: "Hal Jordan" },
    {contactRole: 'Nurse',              name: "Dinah Lance" },
    {contactRole: 'Lawyer',             name: "Connor Hawke"},
    {contactRole: 'Manager',            name: 'Roy Harper'},
    {contactRole: 'Judge',              name: 'Guy Gardner'},
    {contactRole: 'Janitor',            name: 'Barry Allen'},
];
var fdif = fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.claimsExaminer;
            })
            .catch((error) => {
                console.error(error);
            });

class MainScreen extends Component {

    constructor(props){
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
        super(props);
        this.state ={
            action: 'none',
            got: 'nothing',
            data: 'no data yet',
            feedDataSource: ds.cloneWithRows(feedInfo),
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
        //this.notificationUnsubscribe()
    }

    _renderRow(feedRow: string, sectionID: number, rowID: number){
        let style = [
            styles.row,
            {'backgroundColor': feedColors[rowID % feedColors.length],
             'flex': 1,
             'justifyContent': 'center',
             'height': 100,
             'alignItems': 'stretch',
             'elevation': 1,
             'borderTopWidth': (rowID == 0 ? 0 : 1),
             'borderColor': 'white',
            }
        ];

        return( 
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('white')} delayPressIn={0}>
                <View style={style}>
                        <Text style={{paddingLeft: 5, color: 'white', fontSize: 20}}>
                            {feedRow.contactRole}
                        </Text>
                        <Text style={{paddingLeft: 5, color: 'white'}}>
                            {feedRow.name}
                        </Text>
                </View> 
            </TouchableNativeFeedback>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.imgWrapper}>
                    <Image source={require('../../img/sf.jpg')} style={styles.backgroundImage} />
                </View>
                <ListView
                    dataSource={this.state.feedDataSource}
                    renderRow={this._renderRow}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonPOST()}>
                        <Text style={{color: 'white'}}> POST </Text>
                    </TouchableOpacity>
                    <View style={{borderRightWidth: 1, borderColor: '#dddddd', margin: 5, width: 0}} />
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonGET()}>
                        <Text style={{color: 'white'}}> GET</Text>
                    </TouchableOpacity>
                </View>
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
                ClaimsExaminer: 'testerino',
                name: 'Something',
            }),
        });
        this.setState({action: 'POST sent!'});
    }

    async _onPressButtonGET(){
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson.claimsExaminer;
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
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },

    rowContainer: {
        flex: 1,
        justifyContent: 'center',
        height: 100,
        alignItems: 'stretch',
    },

    backgroundImage: {
        resizeMode: 'contain',
    },

    imgWrapper:{
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#007fcf',
        elevation: 5,
    },

    button: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: 70,
        marginLeft: 70,
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
});

module.exports = MainScreen;