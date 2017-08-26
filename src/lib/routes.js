import Search from '../components/search';
import MyLists from '../components/myLists';
import AddEvent from '../components/addEvent';
import Profile from '../components/profile';

export default class Routes {

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
  