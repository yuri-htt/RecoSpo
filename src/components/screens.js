import Search from './search';
import MyLists from './myLists';
import AddEvent from './addEvent';
import Profile from './profile';

export default class Screens {
  search() {
    return {
      name: 'search',
      component: Search,
    };
  }

  myLists() {
    return {
      name: 'myLists',
      component: MyLists,
    };
  }

  addEvent() {
    return {
      name: 'addEvent',
      component:  AddEvent,
    };
  }

  profile() {
    return {
      name: 'profile',
      component: Profile,
    };
  }
}
