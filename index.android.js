import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
import AppNavigator from './app/Navigation/AppNavigator';

class RestTesting extends Component {
    render() {
        return(
            <AppNavigator initialRoute={{ident: 'MainScreen'}} />
        );
    }
}

AppRegistry.registerComponent('RestTesting', () => RestTesting);
