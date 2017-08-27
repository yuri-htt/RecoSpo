import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  StatusBar,
  TabBarIOS,
 } from 'react-native';

import {
  Navigator,
} from 'react-native-deprecated-custom-components';
import Navbar from '../components/navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import config from '../lib/config';
import Routes from '../lib/routes';

const MyStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar/>
  </View>
);

export default class App extends React.Component {

  componentDidMount() {
    //  
  }

  render() {
    const routes = new Routes();
    const items = [{
      icon: 'search',
      route: routes.search(),
    }, {
      icon: 'home',
      route: routes.myLists(),
    }, {
      icon: 'calendar',
      route: routes.addEvent(),
    }, {
      icon: 'settings',
      route: routes.profile(),
    }];

    return (
      <View style={{flex:1}}>
 
        <MyStatusBar
          barStyle="light-content"
        />
        <TabBarIOS>
          {items.map((item, i) => {
            return (
              <TabBarIOS.Item
                key={i}
                title={item.route.name}
                icon={require('../img/iconDef.png')}
                onPress={() => this.changeScene(item.route)}
              >
              <Navigator
                initialRoute={{ title: 'Awesome Scene', index: 0 }}
                renderScene={() =>
                  <Text>Hello!</Text>
                }
                style={{padding: 100}}
              />
                </TabBarIOS.Item>
            );
          })}
        </TabBarIOS>
      </View>
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={{backgroundColor: 'green', flex:1}} />
    )
  }

  _renderContent = (color, pageText) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: 'yellow'}]}>
        <Text>{1}</Text>
      </View>
    );
  };

  actions() {

  }
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
