import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.viewContainer}>
      <Text style={styles.textStyle}>{this.props.name}</Text>
    </View>;
  }
}

var styles = StyleSheet.create({
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    paddingLeft: 10

  }
});