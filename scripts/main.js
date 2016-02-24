// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var React = require('react');
var ReactDOM = require('react-dom');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var App = React.createClass({
	render: function() {
		return (
			<div>
				<CallToAction />
				<Upload />
				<Progress value="50" />
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
				<big>Text to go here</big>
				<progress value={this.props.value} max="100"></progress>
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
						<small>Instructions</small>
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
				<img></img>
				<figcaption>99</figcaption>
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
						<ThumbnailRanked />
					</tbody>
					<tfoot></tfoot>
				</table>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

ReactDOM.render(<App />, document.querySelector('#app'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
