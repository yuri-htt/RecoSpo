
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
} from 'react-native-material-design';
import Modal from 'react-native-modalbox';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import { Tabs } from './router';
import config from '../lib/config';

const signUpImg = require('../img/signUp.jpg');
const Realm = require('realm');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class App extends Component {
  state = {
    modalVisible: false,
    userName: 'Your name',
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
        <Image source={signUpImg} style={styles.backGroundImg}>
          <KeyboardAwareScrollView
            style={styles.scene}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.whileScreen}>

              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(userName) => this.setState({userName})}
                  value={this.state.userName}
                />
                <Divider style={styles.border}/>
              </View>

              <TouchableOpacity style={styles.signUpBtn} onPress={() => this.signUp(this.state.userName)}>
                <Text style={styles.signUpTxt}>Sign Up</Text>
              </TouchableOpacity>

            </View>

          </KeyboardAwareScrollView>
        </Image>
      </Modal>
    )
  }

  signUp(userName) {

    let path =  'http://192.168.35.101:3000/api/v1/users';
    let userData = {
      user: {
        nickname: userName
      }
    }

   return fetch(`${path}`, 
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.ok || response.status === 200) {
        return this.alert(response);
      }
      throw errors(response.status);
    })
    .catch(error => 
      console.log(error)
    )
    .done();
   };

   alert(txt) {
    console.log(txt)
  }
}

  

var styles = StyleSheet.create({
  scene: {
      flex: 1,
  },
  centering: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      backgroundColor: 'blue',
  },
  backGroundImg: {
      position: 'absolute',
      top:0,
      left: 0,
      width : screenWidth,
      height: screenHeight,
  },
  whileScreen: {
    width : screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height:44,
    width: 300,
    marginHorizontal: 20,
  },
  textInput: {
    height:44,
    marginLeft:10,
    color: 'white',
    fontSize: 26,
  },
  border: {
    backgroundColor: 'white',
  },
  signUpBtn: {
    position: 'absolute',
    bottom: 100,
    width: 200,
    height: 40,
    borderRadius:20,
    backgroundColor: config.blueColor,
  },
  signUpTxt: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 40,
    backgroundColor: config.transparent,
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