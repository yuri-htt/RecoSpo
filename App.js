import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  StatusBar,
  TabBarIOS,
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 import config from './src/lib/config';
 import Routes from './src/lib/routes';

const MyStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar/>
  </View>
);

export default class App extends React.Component {

  _renderContent = (color, pageText) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text>{pageText}</Text>
      </View>
    );
  };

  render() {
    const routes = new Routes();
    const items = [{
      icon: 'search',
      route: routes.search(),
    }, 
    // {
    //   icon: 'list',
    //   route: routes.myLists(),
    // }, {
    //   icon: 'portrait',
    //   route: routes.profile(),
    // }
    ];

    return (
      <View style={{flex:1}}>
        <MyStatusBar
          barStyle="light-content"
        />
        <TabBarIOS
          unselectedTintColor="rgb(50, 143, 226)"
          tintColor="rgb(50, 143, 226)"
          barTintColor="white"
        >
        
          <TabBarIOS.Item
            icon={require('./src/img/iconDef.png')}
            selectedIcon={require('./src/img/iconDef.png')}
            renderAsOriginal
            title="Search"
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
                //presses: this.state.presses + 1
              });
            }}
          >
            {this._renderContent('#414A8C', 'Blue Tab')}
          </TabBarIOS.Item>

          <TabBarIOS.Item
            icon={require('./src/img/iconDef.png')}
            selectedIcon={require('./src/img/iconDef.png')}
            renderAsOriginal
            title="MyList"
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
                //presses: this.state.presses + 1
              });
            }}
          >
            {/* {this._renderContent('#21551C', 'Green Tab', this.state.presses)} */}
          </TabBarIOS.Item>

          <TabBarIOS.Item
            icon={require('./src/img/iconDef.png')}
            selectedIcon={require('./src/img/iconDef.png')}
            renderAsOriginal
            title="Profile"
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
                //presses: this.state.presses + 1
              });
            }}
          >
            {/* {this._renderContent('#21551C', 'Green Tab', this.state.presses)} */}
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

  _renderContent() {
    return (
      <View style={[styles.tabContent, {backgroundColor: "blue"}]}>
        <Text style={styles.tabText}>Search Page</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    height: 20,
  },
});
