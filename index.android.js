/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Fetch, TouchableOpacity } from 'react-native';

class RestTesting extends Component {

  	render() {
    	return (
      		<View style={styles.container}>
      			<Text style={styles.description}>
      				Try to make a REST request by pressing the button
      			</Text>
      			<TouchableOpacity onPress={(event) => this._onPressButtonRESULT()}>
        			<Text style={styles.button}>
        				Press this.
        			</Text>
        		</TouchableOpacity>
      		</View>
    	);
  	}

    _onPressButtonGET(){
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

    async _onPressButtonRESULT(){
    	try{
    		let reponse = await fetch('http://requestb.in/1n94tai1');
    		let responseJson = await response.json();
    		return reposeJson;
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
  button: {
    textAlign: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 5,
    padding: 20,
    overflow: 'hidden',
  },
  description: {
  	marginBottom: 15,
  	color: '#444444'
  },
});

AppRegistry.registerComponent('RestTesting', () => RestTesting);
