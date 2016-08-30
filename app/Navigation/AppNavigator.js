import React, {Component} from 'react';
import {Navigator, StyleSheet} from 'react-native';

import MainScreen from '../../app/Screens/MainScreen';

class AppNavigator extends Component{
	render(){
		return(
			<Navigator
                initialRoute={{ident: this.props.initialRoute}}
                ref="AppNavigator"
                renderScene={this._renderScene}
                configureScene={(route) => ({
                    ...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom
                })}
            />
		);
	}

	 _renderScene(route, navigator){
        var globalNavigatorProps = {navigator}
        switch(route.ident){
			case 'MainScreen':
				return (
					<MainScreen {...globalNavigatorProps} />
				);
			default:
				return (
					<MainScreen {...globalNavigatorProps} />
				);
		}
	}
}

module.exports = AppNavigator;