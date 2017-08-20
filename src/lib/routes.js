import Search from '../components/search';

export default class Routes {

    search() {
      return {
        name: 'search',
        component: Search,
      };
    }
  
    // myLists() {
    //   return {
    //     name: 'myLists',
    //     component: MyLists,
    //   };
    // }

    // profile() {
		// 	return {
		// 		name: 'profile',
		// 		component: Profile,
		// 	};
    // }

  }
  