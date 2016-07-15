import React from 'react';
import TutorialButton from '../buttons/TutorialButton';
import T from '../../modules/translation';

export default class TutorialSlide extends React.Component {
    displayBackButton() {
        return !this.props.slide.first;
    }

    displayNextButton() {
        return !this.props.slide.last;
    }

    displayFinishButton() {
        return this.props.slide.last;
    }

    displaySkipLink() {
        return !this.props.slide.last;
    }

    render() {
        const { active, onBack, onClose, onNext, slide } = this.props;
        const { description, image, id, title } = slide;
        const slideClassName = ['xxFeatureContent', 'xxOnboardingTutorial-slide'];

        if (active) {
            slideClassName.push('is-active');
        }

        return (
            <div className={slideClassName.join(' ')} key={id}>
                {
                    image ? (
                        <img
                            src={image}
                            className="xxFeatureContent-image"
                        />
                    ) : null
                }

                <h2 className="xxTitle">{title}</h2>
                <p>{description}</p>
                <div className="xxFormButtons xxFeatureContent-buttons">
                    {
                        this.displayBackButton() ? (
                            <TutorialButton
                                buttonStyle="transparent"
                                onClick={onBack}
                                name={T.get('back')}
                            />
                        ) : null
                    }

                    {
                        this.displayNextButton() ? (
                            <TutorialButton
                                buttonStyle="highlight"
                                onClick={onNext}
                                name={T.get('action.next')}
                            />
                        ) : null
                    }

                    {
                        this.displayFinishButton() ? (
                            <TutorialButton
                                buttonStyle="highlight"
                                onClick={onClose}
                                name={T.get('copy.tutorial.checkItOut')}
                            />
                        ) : null
                    }
                </div>

                {
                    this.displaySkipLink() ? (
                        <div className="xxFeatureContent-small">
                            <a
                                href=""
                                className="u-inheritColor"
                                onClick={onClose}
                            >{T.get('copy.tutorial.skip')}</a>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
