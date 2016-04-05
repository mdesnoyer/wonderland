// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import Secured from '../../mixins/secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignOutPage = React.createClass({
    mixins: [ Secured ],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        SESSION.end();
    },
    render: function() {
        return (
            <div>
                <SiteHeader />
                    <section className="section">
                        <div className="container">
                            TODO - {T.get('signOutSuccess')}
                        </div>
                    </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignOutPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
