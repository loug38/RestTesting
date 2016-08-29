import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Fetch, TouchableOpacity } from 'react-native';

class RestTesting extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.description}>
                    Try GET or POST from and to RequestBin
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonPOST()}>
                        <Text> Post </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonGET()}>
                        <Text> Get </Text>
                    </TouchableOpacity>
                </View>
            </View>   
         );
    }

    _onPressButtonPOST(){
        fetch('http://requestb.in/1n94tai1', {
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
    }

    async _onPressButtonGET(){
        try{
            let reponse = await fetch('http://requestb.in/1n94tai1');
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
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
});

AppRegistry.registerComponent('RestTesting', () => RestTesting);
