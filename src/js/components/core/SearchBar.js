import React, { PropTypes } from 'react';

import T from '../../modules/translation';

const propTypes = {
    query: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

const defaultProps = {
    onSubmit: (e) => { e.preventDefault(); },
};

function SearchBar(props) {
    return (
        <form className="search-bar" onSubmit={props.onSubmit}>
            <label
                className="search-bar--query-label"
                htmlFor="searchInput"
            >
                <input
                    className="search-bar--query-input"
                    id="searchInput"
                    type="text"
                    onChange={props.onChange}
                    placeholder={T.get('copy.searchBar.placeholder')}
                    value={props.query}
                />
            </label>
        </form>
    );
}
SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
