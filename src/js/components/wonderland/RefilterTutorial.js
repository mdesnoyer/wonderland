import React from 'react';
import T from '../../modules/translation';
import TutorialButton from '../buttons/TutorialButton';

export default class RefilterTutorial extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onClose } = this.props;

        return (
            <article className="xxOverlay xxOnboardingTutorial">
                <div className="xxFeatureContent xxOnboardingTutorial-slide is-active">
                    <h2 className="xxTitle">{T.get('copy.refilter.title')}</h2>
                    <div className="xxFormButtons xxFeatureContent-buttons">
                        <TutorialButton 
                            buttonStyle="highlight"
                            onClick={onClose}
                            name={T.get('copy.viewResults')}
                        />
                    </div>
                    <div className="xxCollectionFiltersHint">
                        <div className="xxCollectionFiltersHint-arrow" ref={arr => this._arrow = arr}></div>
                        <strong className="xxCollectionFiltersHint-label">{T.get('copy.refilter.label')}</strong>
                    </div>
                </div>
            </article>
        );
    }
}
