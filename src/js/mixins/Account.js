// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import AJAX from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Account = {
    getInitialState: function() {
        return {
            account: {},
            isAccountServingEnabled: false
        }
    },
    componentWillMount: function() {
        var self = this,
            options = {}
        ;
        AJAX.doGet('', options)
            .then(function(res) {
                self.setState({
                    account: res.account,
                    isAccountServingEnabled: res.account ? (res.account.serving_enabled ? !!res.account.serving_enabled : false) : false
                })
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
