import React from 'react';
import T from '../../modules/translation';
import OnboardingSlide from './OnboardingSlide';

const slides = [
    {
        id: 'import',
        title: T.get('copy.onboarding.slides.import.title'),
        subtitle: T.get('copy.onboarding.slides.import.subtitle'),
        description: T.get('copy.onboarding.slides.import.description'),
        image: '/img/onboarding-import.svg',
        includeLearnMore: false,
    },
    {
        id: 'machine-vision',
        title: T.get('copy.onboarding.slides.machineVision.title'),
        subtitle: T.get('copy.onboarding.slides.machineVision.subtitle'),
        description: T.get('copy.onboarding.slides.machineVision.description'),
        image: '/img/onboarding-machine-vision.svg',
        includeLearnMore: true,
    },
    {
        id: 'seed-library',
        title: T.get('copy.onboarding.slides.seedLibrary.title'),
        subtitle: T.get('copy.onboarding.slides.seedLibrary.subtitle'),
        description: T.get('copy.onboarding.slides.seedLibrary.description'),
        image: '/img/onboarding-seed-library.svg',
        includeLearnMore: true,
    },
    {
        id: 'valence',
        title: T.get('copy.onboarding.slides.valence.title'),
        subtitle: T.get('copy.onboarding.slides.valence.subtitle'),
        description: T.get('copy.onboarding.slides.valence.description'),
        image: '/img/onboarding-valence.svg',
        includeLearnMore: true,
    },
    {
        id: 'best',
        title: T.get('copy.onboarding.slides.best.title'),
        subtitle: T.get('copy.onboarding.slides.best.subtitle'),
        description: T.get('copy.onboarding.slides.best.description'),
        image: '/img/onboarding-best.svg',
        includeLearnMore: true,
    },
    {
        id: 'processing',
        title: T.get('copy.onboarding.slides.processing.title'),
        subtitle: T.get('copy.onboarding.slides.processing.subtitle'),
        description: T.get('copy.onboarding.slides.processing.description'),
        image: '/img/onboarding-processing.svg',
        includeLearnMore: true,
    },
];

export default class OnboardingSlides extends React.Component {
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
        const advanceSlideWait = 15 * 1000;

        this.__nextSlideTimer = setTimeout(() => {
            const { activeSlide } = this.state;

            this.setState({
                activeSlide: activeSlide + 1 < slides.length ? activeSlide + 1 : 0,
            });

            this.setTimer();
        }, advanceSlideWait);
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
        const { toggleLearnMore } = this.props;
        const prevSlide = activeSlide > 0 ? activeSlide - 1 : slides.length - 1;
        const nextSlide = activeSlide + 1 < slides.length ? activeSlide + 1 : 0;

        return (
            <article className="xxOnboardingSlides">
                {
                    slides.map((slide, index) => {
                        const active = index === activeSlide;

                        return (
                            <OnboardingSlide
                                active={active}
                                key={index}
                                slide={slide}
                                toggleLearnMore={toggleLearnMore}
                            />
                        );
                    })
                }
                <a
                    href=""
                    className="xxOnboardingSlides-prev"
                    onClick={e => setActiveSlide(prevSlide, e)}
                >{T.get('copy.PreviousLabel')}</a>
                <a
                    href=""
                    className="xxOnboardingSlides-next"
                    onClick={e => setActiveSlide(nextSlide, e)}
                >{T.get('copy.NextLabel')}</a>
            </article>
        );
    }
}
