// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import UTILS from '../../utils';
import React from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import CallToAction from '../lookingglass/CallToAction';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class App extends React.Component {
    render() {
        return (
        	<section className="section">
	        	<div className="containter is-fluid">
					<div className="columns">
						<div className="column">
							<section className="section">App TODO ({ UTILS.rando(10)})</section>
						</div>
						<div className="column is-quarter">
							<CallToAction />
						</div>
					</div>
				</div>
			</section>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default App;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
