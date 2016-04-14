// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.contact.title'))}
                />
                <SiteHeader />                    
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        <h1 className="title is-2">{T.get('copy.contact.heading')}</h1>
                        <div className="content">
                           <p>{T.get('copy.contact.body')}</p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
