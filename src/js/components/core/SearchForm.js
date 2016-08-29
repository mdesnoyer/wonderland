// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {
    searchQuery: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

function SearchForm(props) {
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
        </form>
    );
}

SearchForm.propTypes = propTypes;

export default SearchForm;
