// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {
    searchQuery: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

function SearchForm(props) {
    const loading = props.isLoading ?
        <span>{T.get('copy.loading')}</span> :
        null;

    console.log('sf', props.isLoading);
    return (
        <form className="xxSearchBar" onSubmit={props.onSubmit}>
            <div className="xxSearchInputWrapper">
                <input
                    type="text"
                    onChange={props.onChange}
                    placeholder={T.get('copy.searchBar.placeholder')}
                    value={props.searchQuery}
                />
            </div>
            {loading}
            <span>
            </span>
        </form>
    );
}

SearchForm.propTypes = propTypes;

export default SearchForm;
