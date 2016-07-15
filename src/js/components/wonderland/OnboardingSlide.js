import React from 'react';
import T from '../../modules/translation';

export default class OnboardingSlide extends React.Component {
    constructor(props) {
        super(props);

        this.onClickLearnMore = this.onClickLearnMore.bind(this);
    }

    onClickLearnMore(e) {
        e.preventDefault();
        this.props.toggleLearnMore();
    }

    render() {
        const { active, slide } = this.props;
        const slideClassName = ['xxOnboardingSlide', `xxOnboardingSlide--${slide.id}`];

        if (active) {
            slideClassName.push('is-active');
        }

        return (
            <div className={slideClassName.join(' ')} key={slide.id}>
                <div className="xxOnboardingSlide-content">
                    <h2 className="xxSubtitle">{slide.title}</h2>
                    <h3 className="xxTitle">{slide.subtitle}</h3>
                    <p className="xxOnboardingSlide-description">{slide.description}</p>

                    {
                        slide.includeLearnMore ? (
                            <a
                                href=""
                                onClick={this.onClickLearnMore}
                                className="xxOnboardingSlide-anchor"
                            >{T.get('copy.onboarding.link.learnMore')}</a>
                        ) : null
                    }
                </div>

                <div className="xxOnboardingSlide-imageContainer">
                    <img src={slide.image} className="xxOnboardingSlide-image" />
                </div>
            </div>
        );
    }
};
