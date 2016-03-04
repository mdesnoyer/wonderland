// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var h = require('./helpers');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import NotFound from './components/Progress';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var App = React.createClass({
	getInitialState: function() {

	},
	render: function() {
		return (
			<div>
				<CallToAction />
				<Upload />
				<Progress message="Things are cooking" value="50" />
				<Results />
			</div>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var CallToAction = React.createClass({
	render: function() {
		return (
			<section>
				<h1>Call to Action</h1>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Upload = React.createClass({
	submitForm: function(event) {
		event.preventDefault();
		var url = this.refs.url.value;
		debugger;
		browserHistory.push(url)
	},
	render: function() {
		return (
			<section>
				<form onSubmit={ this.submitForm }>
					<fieldset>
						<legend></legend>
						<label>URL</label>
						<input ref="url" type="text" defaultValue={ h.getFunName() }></input>
						<small>Error?</small>
						<button>Process</button>
						<small>Instructions, link to Terms</small>
					</fieldset>
				</form>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ThumbnailRanked = React.createClass({
	render: function() {
		return (
			<figure>
				<img src={ this.props.src }></img>
				<figcaption>{ this.props.neonscore }</figcaption>
			</figure>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Results = React.createClass({
	render: function() {
		return (
			<section>
				<table>
					<thead></thead>
					<tbody>
						<tr>
							<th>Title TODO</th>
							<td><ThumbnailRanked neonscore="99" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="77" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="66" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="44" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="22" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="02" src="http://loremflickr.com/320/240/neon"/></td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App} />
		<Route path="/job/:jobId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

ReactDOM.render(routes, document.querySelector('#app'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
