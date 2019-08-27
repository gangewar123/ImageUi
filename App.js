import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ImageRender from './Image_render';
import Detail_screen from './Detail_screen'
import {  createAppContainer, createStackNavigator } from 'react-navigation';
import RootNavigator from "./navigation";


export default class App extends Component {


  render() {
    return (
      <View  style={{flex:1}}>
        <RootNavigator/>
      </View>
    )
  }
}

