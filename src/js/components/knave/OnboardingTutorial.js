import React from 'react';
import TutorialSlide from './TutorialSlide';
import T from '../../modules/translation';

const slides = [];

export default class OnboardingTutorial extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveSlide = this.setActiveSlide.bind(this);

        if (this.props.isGuest) {
            slides.push(
                {
                    id: 'neonscore',
                    title: T.get('copy.tutorial.neonscore.title'),
                    description: T.get('copy.tutorial.neonscore.description'),
                    image: '/img/tutorial-neonscore.png',
                    first: true,
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
                    last: true,
                },
            );
        }
        else {
            slides.push(
                {
                    id: 'ready',
                    title: T.get('copy.tutorial.ready.title'),
                    description: null,
                    image: null,
                    first: true,
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
                    last: true,
                },
            );
        }

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
                        return (
                            <TutorialSlide
                                active={activeSlide === index}
                                key={index}
                                onBack={e => setActiveSlide(activeSlide - 1, e)}
                                onClose={onClose}
                                onNext={e => setActiveSlide(activeSlide + 1, e)}
                                slide={slide}
                            />
                        );
                    })
                }
            </article>
        );
    }
}
