'use strict';

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
import { Divider } from 'react-native-material-design';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

import { Tabs } from './containers/router';
import config from './lib/config';

import * as AuthActions from './redux/modules/auth';

const signUpImg = require('./img/signUp.jpg');
const UserModel = require('./models/user');
const Realm = require('realm');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export class App extends Component {
	state = {
		modalVisible: false,
		userName: 'Your name',
		alertModalVisible: false,
		errorMessage: '',
	}

	componentWillMount() {
		this.queryUserData()
	}

	render() {
		return (
			<View style={styles.scene}>
				{this.renderSignUpModal()}
				<Tabs />
			</View>
		)
	}

	renderSignUpModal() {
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

							{this.rederAlert()}
			</View>

			</KeyboardAwareScrollView>
		</Image>
		</Modal>
	)
	}

	rederAlert() {
		return (
			<Modal
				style={styles.alertModal}
				isOpen={this.state.alertModalVisible}
				onClosed={() => this.setState({alertModalVisible: false})}
			>
				<Text style={styles.alertModalTxt}>{this.state.errorMessage}</Text>
			</Modal>
		)
	}

	queryUserData() {
		let realm = new Realm({
			schema: [UserModel.User]
		})

	Realm.open({
		schema: [UserModel.User]
	}).then(realm => {
			// TODO:ユーザー名を取得してReduxに保存
			const userName = realm.objects(UserModel.User)[0].name;
			console.log(userName)
			this.props.actions.setUser(userName);
		this.setState({modalVisible: false});
	}).catch(error => {
		this.setState({modalVisible: true})
		});
	}

	signUp(userName) {
		this.props.actions.signUp(userName);
	 }

	signUpSuccess() {
		// TODO
		Realm.open({
		schema: [UserModel.User]
	}).then(realm => {
			realm.write(() => {
				const me = realm.create('User', {
					name: 'Yuri03',
				});
			});
		});
		this.setState({ modalVisible: false });
		this.props.actions.signUpSuccess(this.state.userName);
	}

}

var styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
	centering: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
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
	alertModal: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
		height: 150,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
	},
	alertModalTxt: {
	textAlign: 'center',
	textAlignVertical: 'center',
	backgroundColor: config.transparent,
	},
})

export default connect(
	state => ({ ...state }),
	dispatch => ({
		actions: bindActionCreators({
		...AuthActions,
		}, dispatch),
	}),
)(App);
