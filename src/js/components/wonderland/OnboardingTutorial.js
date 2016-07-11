// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const slides = [
    {
        id: 'ready',
        title: T.get('copy.tutorial.ready.title'),
        description: null,
        image: null,
    },
    {
        id: 'neonscore',
        title: T.get('copy.tutorial.neonscore.title'),
        description: T.get('copy.tutorial.neonscore.description'),
        image: '/img/tutorial-neonscore.png',
    },
    {
        id: 'lift',
        title: T.get('copy.tutorial.lift.title'),
        description: T.get('copy.tutorial.lift.description'),
        image: '/img/tutorial-lift.png',
    },
    {
        id: 'upload',
        title: T.get('copy.tutorial.upload.title'),
        description: T.get('copy.tutorial.upload.description'),
        image: '/img/tutorial-upload.png',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class OnboardingTutorial extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveSlide = this.setActiveSlide.bind(this);

        this.state = {
            activeSlide: 0,
        };
    }

    setActiveSlide(slide, e) {
        e.preventDefault();

        this.setState({
            activeSlide: slide,
        });
    }

    render() {
        const { setActiveSlide } = this;
        const { onClose } = this.props;
        const { activeSlide } = this.state;

        return (
            <article className="xxOverlay xxOnboardingTutorial">
                {
                    slides.map((slide, index) => {
                        const slideClassName = ['xxFeatureContent', 'xxOnboardingTutorial-slide'];
                        if (index === activeSlide) {
                            slideClassName.push('is-active');
                        }

                        return (
                            <div className={slideClassName.join(' ')} key={slide.id}>
                                {
                                    slide.image ? (
                                        <img
                                            src={slide.image}
                                            className="xxFeatureContent-image"
                                        />
                                    ) : null
                                }
                                <h2 className="xxTitle">{slide.title}</h2>
                                <p>{slide.description}</p>
                                <div className="xxFormButtons xxFeatureContent-buttons">
                                    {
                                        index !== 0 ? (
                                            <a
                                                href=""
                                                className="xxButton xxButton--transparent"
                                                onClick={e => setActiveSlide(activeSlide - 1, e)}
                                            >{T.get('back')}</a>
                                        ) : null
                                    }
                                    {
                                        index + 1 < slides.length ? (
                                            <a
                                                href=""
                                                className="xxButton xxButton--highlight"
                                                onClick={e => setActiveSlide(activeSlide + 1, e)}
                                            >{T.get('action.next')}</a>
                                        ) : null
                                    }
                                    {
                                        index + 1 >= slides.length ? (
                                            <a
                                                href=""
                                                className="xxButton xxButton--highlight"
                                                onClick={onClose}
                                            >{T.get('copy.tutorial.checkItOut')}</a>
                                        ) : null
                                    }
                                </div>
                                {
                                    index + 1 < slides.length ? (
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
                    })
                }
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
