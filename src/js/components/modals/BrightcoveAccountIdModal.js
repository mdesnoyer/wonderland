// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightCoveAccountIdModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop has-text-centered">
                <h1 className="title is-4">
                    Brightcove Video Cloud Account ID
                </h1>
                <div className="content has-text-centered">
                    <h4 className="title is-5"></h4>
                    <p>You can locate your Video Cloud Account ID on the <a rel="external" href="https://studio.brightcove.com/products/videocloud/admin/accountsettings">Account Information</a> page in your Brightcove account. Your Account ID will look similar to this:</p>
                    <figure className="image wonderland-image">
                        <img src="/img/support/brightcove/1-account-id.png" alt="" title="" />
                    </figure>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightCoveAccountIdModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
