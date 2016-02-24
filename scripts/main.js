// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var App = React.createClass({
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

var Progress = React.createClass({
	render: function() {
		return (
			<section>
				<big>{ this.props.message }</big>
				<progress value={ this.props.value } max="100"></progress>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Upload = React.createClass({
	render: function() {
		return (
			<section>
				<form>
					<fieldset>
						<legend></legend>
						<label>URL</label>
						<input type="text"></input>
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

var NotFound = React.createClass({
	render: function() {
		return (
			<section>
				<h1>Not Found</h1>
			</section>
		);
	}
})
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={TODO1} />
		<Route path="/store/:storeId" component={TODO2} />
		<Route path="*" component={NotFound} />
	</Router>
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

ReactDOM.render(routes, document.querySelector('#app'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
