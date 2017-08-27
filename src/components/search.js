'use strict';

import React, { Component } from 'react';

import {
    Image,
    View,
    Text,
    StyleSheet,
} from 'react-native';
  
const entryImg = require('../img/entry.jpg');

export default class Search extends Component {
    render() {
        return (
            <View style={styles.scene}>
                <View style={styles.centering}>
                    <Text style={styles.txt}>Search</Text>
                </View>
            </View>   
        );
    }
}

var styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: 'green',
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