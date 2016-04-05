// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import SESSION from '../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Secured = {
    componentWillMount: function() {
        if (SESSION.active() !== true) {
            // "cancel" the rendering of whatever view we're in
            this.render = function () {
                return false;
            };
            // redirect to state config or signin by default
            this.context.router.push(this.state && this.state.noSessionDest ? this.state.noSessionDest : '/signin/');
        }
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Secured;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
