import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';


export default class overlayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Overlay
        isVisible={this.state.isVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="auto"
        height="auto"
      >
        <Text>Hello from Overlay!</Text>
      </Overlay>
    );
  }
}
