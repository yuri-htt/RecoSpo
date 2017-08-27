'use strict';

import React, {
  Component,
} from 'react';
import CustomToolbar from './customToolbar';

export default class Navbar extends Component {
    render() {
        const {
            route,
            navigator
        } = this.props;

        return (
            <CustomToolbar
                title={route.names[route.index]}
                primary='paperTeal'
                overrides={{backgroundColor: config.mainColor}}
                icon={route.index > 0 ? 'keyboard-backspace' : ''}
                onIconPress={() => this.navigatorPop()}
                actions={this.actions(route)}
            />
        );
    }

    navigatorPop() {

    }

    actions() {

    }
} 