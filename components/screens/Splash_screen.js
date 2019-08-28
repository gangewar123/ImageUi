import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export default class Splash_screen extends Component {
    render() {
        return (
            <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
                <Image
                    source={require("../assets/camera.jpg")}
                    style={{ width: "100%" }}
                />
                <Text style={{ flexWrap: "wrap", }}> “The best thing about a picture is that it never changes, even when the people in it do.”</Text>
                <Text style={{ fontWeight: "bold" }}>— Andy Warhol</Text>
                <View style={{ marginTop: 70, paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Created by,</Text>
                    <Text> N: Kiran Kumar</Text>
                    <Text> P: 9880400468</Text>
                    <Text> E: kirankumarbv20@gmail.com</Text>

                </View>
            </View>
        )
    }
}
