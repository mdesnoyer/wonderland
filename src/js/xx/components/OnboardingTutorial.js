// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const slides = [
    {
        id: 'ready',
        title: 'Your images are ready!',
        description: null,
        image: null,
    },
    {
        id: 'neonscore',
        title: 'What is a NeonScore?',
        description: 'The NeonScore is a 0-99 scale that represents how clickable your image is. The higher the score, the more clicks.',
        image: '/img/xx/tutorial-neonscore.png',
    },
    {
        id: 'lift',
        title: 'What is lift?',
        description: 'Lift is the percentage increase in clicks your video would get by using Neon images as your video thumbnails.',
        image: '/img/xx/tutorial-lift.png',
    },
    {
        id: 'upload',
        title: 'Upload your own videos.',
        description: 'If you like what you see, you can upload your own videos to get your most clickable images. Just click on the orange button on the next screen and enter a video URL.',
        image: '/img/xx/tutorial-upload.png',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboardingTutorial extends React.Component {
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
                                            >Back</a>
                                        ) : null
                                    }
                                    {
                                        index + 1 < slides.length ? (
                                            <a
                                                href=""
                                                className="xxButton xxButton--highlight"
                                                onClick={e => setActiveSlide(activeSlide + 1, e)}
                                            >Next</a>
                                        ) : null
                                    }
                                    {
                                        index + 1 >= slides.length ? (
                                            <a
                                                href=""
                                                className="xxButton xxButton--highlight"
                                                onClick={onClose}
                                            >Check it Out</a>
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
                                            >Skip Tutorial</a>
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
