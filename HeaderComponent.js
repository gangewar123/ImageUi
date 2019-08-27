import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log("this is data passed", this.props.name);
    return <View style={styles.viewContainer}>
      <Text>
        {this.props.name}/photos
    </Text>
    </View>;
  }
}

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    elevation: 4,
  },
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});