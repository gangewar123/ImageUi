import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

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
            size="large"
            overlayContainerStyle={{ backgroundColor: 'black' }}
            color="white"
            rounded
            source={{
              uri: this.props.data.user.profile_image.small,
            }}
          />
          <View>
            <Text style={styles.textColor} >{this.props.data.user.first_name}</Text>
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
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 1.0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textColor: {
    flexWrap: "wrap",
    color: "white",
    paddingLeft: 5,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "black"
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  }


})
