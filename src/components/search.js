import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import config from '../../lib/config';

const entryImg = require('../img/entry.jpg');
const magnifyingGlassImg = require('../img/magnifyingGlass.png');
const searchIcon = require('../img/searchIcon.png');
const placeIcon = require('../img/placeIcon.png');
const calendarIcon = require('../img/calendarIcon.png');
const shooseIcon = require('../img/shooseIcon.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Search extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showSearchFields: false,
    };
  }

  render() {
    const {
      search,
    } = this.props;

    return (
      <View style={styles.scene}>
        <View style={styles.centering}>
          <Image source={entryImg} style={styles.backGroundImg} />
          <Image source={magnifyingGlassImg} style={styles.decorateImg} resizeMode={'cover'}>
            <View style={styles.txtContainer}>
              <Text style={styles.mainTxt}>SEARCH SPORTS EVENT</Text>
            </View>

            {!this.state.showSearchFields &&
            <View style={styles.searchArea}>
              <View style={styles.field}>
                <Image source={searchIcon} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  onFocus={() => this.onFocus()}
                  placeholder={'いつ・どこで・スポーツ種類'}
                  placeholderTextColor={'white'}
                />
              </View>
            </View>
            }
            {this.state.showSearchFields &&
            <View style={styles.searchArea}>
              <View style={styles.field}>
                <Image source={placeIcon} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  onFocus={() => this.onFocus()}
                  autoFocus
                />
              </View>

              <View style={styles.field}>
                <Image source={calendarIcon} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  onFocus={() => this.onFocus()}
                />
              </View>

              <View style={styles.field}>
                <Image source={shooseIcon} style={[styles.icon, { width: 28, height: 18 }]} />
                <TextInput
                  style={styles.textInput}
                  onFocus={() => this.onFocus()}
                />
              </View>
            </View>
            }
          </Image>
        </View>

      </View>
    );
  }

  onFocus() {
    LayoutAnimation.easeInEaseOut();
    this.setState({showSearchFields: true});
  }
}

const styles = StyleSheet.create({
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
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  decorateImg: {
    position: 'absolute',
    top: (screenHeight / 6),
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
    lineHeight: 28 * 1.3,
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
  searchArea: {
    paddingTop: 20,
  },
  searchBar: {
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 80,
  },
  field: {
    marginLeft: 80,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    height: 44,
  },
});
