import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Fetch, TouchableOpacity } from 'react-native';

var url = 'http://requestb.in/1n94tai1';

class RestTesting extends Component {
    constructor(props){
        super(props);
        this.state ={
            action: 'none',
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Fetcher </Text>
                <Text style={styles.description}>
                    Try GET or POST from/to RequestBin
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonPOST()}>
                        <Text> Post </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={(event) => this._onPressButtonGET()}>
                        <Text> Get </Text>
                    </TouchableOpacity>
                </View>
                <Text> {this.state.action} </Text>
                <View style={styles.bottomButton}>
                    <Text style={{color: 'white'}}> {`current URL: ${url}`} </Text>
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
                firstParam: 'testerino',
                secondParam: 'testing',
            }),
        });
        this.setState({action: 'POST sent!'});
    }

    async _onPressButtonGET(){
        try{
            let response = await fetch(url);
            //let responseJson = await response.json();
            //return responseJson;
        } catch (error) {
            console.error(error);
        }
        this.setState({action: 'GET sent!'});
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
    paddingBottom: 150,
  }
});

AppRegistry.registerComponent('RestTesting', () => RestTesting);
