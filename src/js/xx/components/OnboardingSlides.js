// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const slides = [
    {
        id: 'import',
        title: 'Import',
        subtitle: 'Great! We’ve got it.',
        description: 'We have your video and we’ve started processing it. This may take a few minutes. Stick around to learn about Neon or enter your email address below so we can let you know when your images are ready.',
        image: '/img/xx/onboarding-import.svg',
        includeLearnMore: false,
    },
    {
        id: 'machine-vision',
        title: 'Machine Vision',
        subtitle: 'Think Fast',
        description: 'Our brains decide in under 100 milliseconds which images we want to click on. Neon’s deep learning software knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms.',
        image: '/img/xx/onboarding-machine-vision.svg',
        includeLearnMore: true,
    },
    {
        id: 'seed-library',
        title: 'Seed Library',
        subtitle: 'What’s happening to my video right now?',
        description: 'Your video is being analyzed by our deep learning software to identify the most appealing frames. Your frames are then compared to frames in our image library to predict engagement.',
        image: '/img/xx/onboarding-seed-library.svg',
        includeLearnMore: true,
    },
    {
        id: 'valence',
        title: 'Valence',
        subtitle: '1,000+ Image Features',
        description: 'We analyze each image or video frame for over 1,000 unique features and assign a NeonScore. Some of these features include eye gaze, instability, color, texture, and flowing water.',
        image: '/img/xx/onboarding-valence.svg',
        includeLearnMore: true,
    },
    {
        id: 'best',
        title: 'Best Performer',
        subtitle: 'What is a NeonScore?',
        description: 'The NeonScore is a number from 0-99 that represents how clickable your image is. The higher the score, the more engaging the image. Engaging images are more likely to get clicked online.',
        image: '/img/xx/onboarding-best.svg',
        includeLearnMore: true,
    },
    {
        id: 'processing',
        title: 'Processing',
        subtitle: 'Images for Your Audience',
        description: 'Neon finds the best images for a general audience by default, but can also surface the most engaging images for the specific audience you’re targeting with your content.',
        image: '/img/xx/onboarding-processing.svg',
        includeLearnMore: true,
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboardingSlides extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveSlide = this.setActiveSlide.bind(this);

        this.state = {
            activeSlide: 0,
        };
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        if (this.__nextSlideTimer) {
            clearTimeout(this.__nextSlideTimer);
        }
    }

    setTimer() {
        this.__nextSlideTimer = setTimeout(() => {
            const { activeSlide } = this.state;

            this.setState({
                activeSlide: activeSlide + 1 < slides.length ? activeSlide + 1 : 0,
            });

            this.setTimer();
        }, 15 * 1000);
    }

    setActiveSlide(slide, e) {
        e.preventDefault();

        this.setState({
            activeSlide: slide,
        });

        if (this.__nextSlideTimer) {
            clearTimeout(this.__nextSlideTimer);
        }
    }

    render() {
        const { setActiveSlide } = this;
        const { activeSlide } = this.state;

        const prevSlide = activeSlide > 0 ? activeSlide - 1 : slides.length - 1;
        const nextSlide = activeSlide + 1 < slides.length ? activeSlide + 1 : 0;

        return (
            <article className="xxOnboardingSlides">
                {
                    slides.map((slide, index) => {
                        const slideClassName = ['xxOnboardingSlide', `xxOnboardingSlide--${slide.id}`];
                        if (index === activeSlide) {
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
                                            <a href="" className="xxOnboardingSlide-anchor">Learn More</a>
                                        ) : null
                                    }
                                </div>
                                <div className="xxOnboardingSlide-imageContainer">
                                    <img src={slide.image} className="xxOnboardingSlide-image" />
                                </div>
                            </div>
                        );
                    })
                }
                <a
                    href=""
                    className="xxOnboardingSlides-prev"
                    onClick={e => setActiveSlide(prevSlide, e)}
                >Previous</a>
                <a
                    href=""
                    className="xxOnboardingSlides-next"
                    onClick={e => setActiveSlide(nextSlide, e)}
                >Next</a>
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
