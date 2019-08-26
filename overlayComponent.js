import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Avatar, Card, Icon } from 'react-native-elements';

export default class OverlayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

      <View style={styles.absolutePosition}>

        <View style={styles.mainContainer}>
          <Avatar
            size="medium"
            overlayContainerStyle={{ backgroundColor: 'black' }}
            color="white"
            rounded
            source={{
              uri: this.props.data.user.profile_image.small,
            }}
          />

          <View>
            <Text style={styles.textColor}>{this.props.data.user.name}</Text>
            <View style={styles.rowContainer}>
              <Icon name='heart' type='font-awesome' color='#ffffff' />
              <Text style={styles.textColor}>{this.props.data.likes}</Text>
            </View>

          </View>

        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  absolutePosition: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textColor: {
    color: "white"
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "black"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center"
  }


})
