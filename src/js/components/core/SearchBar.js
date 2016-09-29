// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const SearchBar = React.createClass({
    propTypes: {
        query: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    render: function() {
        const self = this;
        return (
            <form className="search-bar" onSubmit={self.props.onSubmit}>
                <label
                    className="search-bar--query-label"
                >
                    <input
                        className="search-bar--query-input"
                        type="text"
                        onChange={self.props.onChange}
                        placeholder={T.get('copy.searchBar.placeholder')}
                        value={self.props.query}
                    />
                </label>
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SearchBar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
