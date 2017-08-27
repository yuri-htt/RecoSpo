'use strict';

import React, { Component } from 'react';

import {
    Image,
    Text,
    View,
    StyleSheet,
} from 'react-native';
  
export default class AddEvent extends Component {
    render() {
        return (
            <View style={styles.scene}>
                <View style={styles.centering}>
                    <Text style={styles.txt}>AddEvent</Text>
                </View>
            </View>   
        );
    }
}

var styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: 'blue',
    },
    centering: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 20,
    },
})