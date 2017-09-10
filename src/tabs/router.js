import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Search from '../components/search';
import MyLists from '../components/myLists';
import AddEvent from '../components/addEvent';
import Profile from '../components/profile';

export const Tabs = TabNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={30} color={tintColor} />,
    },
  },
  MyLists: {
    screen: MyLists,
    navigationOptions: {
      tabBarLabel: 'MyLists',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
    },
  },
  AddEvent: {
    screen: AddEvent,
    navigationOptions: {
      tabBarLabel: 'AddEvent',
      tabBarIcon: ({ tintColor }) => <Icon name="add" size={30} color={tintColor} />,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="face" size={30} color={tintColor} />,
    },
  },
});

export { Tabs as default };
