import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';

export default React.createClass({
    mixins: [AjaxMixin],

    getInitialState: function() {
        return {
            didError: false,
            email: '',
            isSubmitted: false,
        };
    },

    updateEmail: function(e) {
      const email = e.target.value;

      this.setState({ email });
    },

    submitEmail: function(e) {
      e.preventDefault();
      const { email } = this.state;
      const { videoId } = this.props;

      if (!email) {
          return;
      }

      TRACKING.sendEvent(self, arguments, email);

      this.setState({
          isSubmitted: true,
      });

      this.PUT('videos/', { data: {
          callback_email: email,
          video_id: videoId,
      }}).catch(() => {
          this.setState({
              didError: true,
          });
      });
    },

    render: function() {
        const { didError, email, isSubmitted } = this.state;

        const isValid = email;
        const isNotSubmitted = !isSubmitted;

        const sendClassName = ['xxOnboardingEmail-button', 'xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <section className="xxOnboardingEmail">
                <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {
                        isNotSubmitted ? (
                            <div key="onboarding-email-form">
                                <form onSubmit={this.submitEmail}>
                                    <h2 className="xxOnboardingEmail-title">{T.get('copy.onboarding.resultsEmail.title')}</h2>
                                    <input
                                        className="xxInputText"
                                        type="text"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={this.updateEmail}
                                    />
                                    <button
                                        disabled={!isValid}
                                        className={sendClassName.join(' ')}
                                        type="button"
                                        onClick={this.submitEmail}
                                    >{T.get('label.submit')}</button>
                                </form>
                            </div>
                        ) : (
                            <div className="xxOnboardingEmail-success" key="onboarding-email-success">
                                {
                                    didError ? (
                                        T.get('copy.onboarding.resultsEmail.error')
                                    ) : (
                                        T.get('copy.onboarding.resultsEmail.success')
                                    )
                                }
                            </div>
                        )
                    }
                </ReactCSSTransitionGroup>
            </section>
        );
    },
});
