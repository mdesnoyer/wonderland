'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import SiteHeader from '../wonderland/SiteHeader';
import Helmet from 'react-helmet';
import SiteFooter from '../wonderland/SiteFooter';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BasePage = React.createClass({

    propTypes: {
        // Window title.
        title: PropTypes.string,

        sidebarContent: PropTypes.string
    },

    getDefaultProps: () => {
        return {
            title: UTILS.buildPageTitle(T.get('neonScore')),
            sidebarContent: null
        };
    },

    getTitle: function() {
        return UTILS.buildPageTitle(this.props.title);
    },

    getSidebarContent: function() {
        return null;
    },

    render: function() {
        return (
            <main className='xxPage'>
                <Helmet
                    title={this.getTitle()}
                />
                <SiteHeader sidebarContent={this.getSidebarContent()}/>
                {this.props.children}
                <SiteFooter />
            </main>
        );
    }
});

export default BasePage;
