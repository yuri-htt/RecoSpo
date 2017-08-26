'use strict';
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Toolbar} from 'react-native-material-design';

export default class CustomToolbar extends Toolbar {
    render() {
        return (
            <View style={{height: 20, backgroundColor: 'blue', width: 100, position: 'absolute', top:0, left:0}} />
        );
    }
    
}