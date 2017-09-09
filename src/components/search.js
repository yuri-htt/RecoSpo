'use strict';

import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Modal from 'react-native-modalbox';
import config from '../../lib/config';

const entryImg = require('../img/entry.jpg');
const signUpImg = require('../img/signUp.jpg');
const magnifyingGlassImg = require('../img/magnifyingGlass.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Realm = require('realm');

export default class Search extends Component {

    render() {
        return (
            <View style={styles.scene}>
                <View style={styles.centering}>
                    <Image source={entryImg} style={styles.backGroundImg}/>
                    <Image source={magnifyingGlassImg} style={styles.decorateImg}>
                        <View style={styles.txtContainer}>
                            <Text style={styles.mainTxt}>SEARCH SPORTS EVENT</Text>
                            <Text style={styles.subTxt}>xxx xxxxx xx x xxxxxx xxxxxx</Text>
                        </View>
                        <View style={styles.searchBar} />
                    </Image>
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
    backGroundImg: {
        position: 'absolute',
        top:0,
        left: 0,
        width : screenWidth,
        height: screenHeight,
    },
    decorateImg: {
        position: 'absolute',
        top:(screenHeight / 5),
        left: -50,
        width: 360,
        height: 380,
    },
    txtContainer: {
        marginHorizontal: 80,
        paddingTop: 80,
    },
    mainTxt: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Arial-BoldMT',
        backgroundColor: config.transparent,
        marginBottom: 10,
    },
    subTxt: {
        color: 'white',
        fontSize: 18,
        backgroundColor: config.transparent,
        marginBottom: 10,
    },
    searchBar: {
        width: 300,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginLeft: 80,
    },
})
