
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Tabs } from './router';

const signUpImg = require('../img/signUp.jpg');
const Realm = require('realm');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class App extends Component {
  state = {
    modalVisible: false,
  }

  componentWillMount() {
    Realm.open({
      schema: [NoUser]//[User]
    }).then(realm => {
      console.log(realm)
      // 名前を取得
      this.setState({modalVisible: false});
    }).catch(error => {
      console.log('データがないよ！');
      this.setState({modalVisible: true})
    });
  }

  render() {
    return (

    <View style={styles.scene}>
      {this.renderRegisterModal()}
      <Tabs />
    </View>
    )
  }

  renderRegisterModal() {
    return (
      <Modal
        style={styles.modal}
        isOpen={this.state.modalVisible}
        onClosed={() => this.setState({modalVisible: false})}
      >
        <Image source={signUpImg} style={styles.backGroundImg}/>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  scene: {
      flex: 1,
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
})

class User {}
User.schema = {
    name: 'User',
    properties: {
        name: { type: 'string'},
    }
};

class NoUser {}
User.schema = {
    name: 'NoUser',
    properties: {
        name: { type: 'string'},
    }
};