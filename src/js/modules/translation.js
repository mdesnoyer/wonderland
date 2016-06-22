// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _DEFAULT_LOCALE = 'en-US',
    _TRANSLATIONS = {
        'en-US': {
            'app.companyLongName': 'Neon Labs, Inc.',
            'app.companyShortName': 'Neon',
            'app.appName': 'Wonderland',
            // 'app.credit': '@appName by @name',
            'app.credit': '@companyShortName',
            'app.separator': ' | ',
            'app.companySig': '- The Neon Team',
            neonScore: 'NeonScore',
            analyze: 'Analyze',
            videos: 'Videos',
            video: 'Video',
            firstName: 'First Name',
            lastName: 'Last Name',
            accountId: 'Account ID',
            email: 'Email',
            title: 'Title',
            company: 'Company',
            error: 'Error',
            success: 'Success',
            signUp: 'Sign Up',
            signIn: 'Sign In',
            confirmAccount: 'Confirm Account',
            confirmedAccount: 'Your account is confirmed. Please sign in to continue.',
            configure: 'Configure',
            add: 'Add',
            cancel: 'Cancel',
            save: 'Save',
            update: 'Update',
            url: 'URL',
            copy: 'Copy',

            'copy.loading': 'Loading' + String.fromCharCode(8230),
            'copy.currentThumbnail': 'Current Thumbnail',

            'action.previous': 'Previous',
            'action.next': 'Next',
            'action.save': 'Save',
            'action.set': 'Set',
            'action.resetPassword': 'Reset Password',
            'action.shortenURL': 'Shorten URL',

            rememberMe: 'Remember',

            'copy.signIn.title': 'Sign In',
            'copy.signIn.heading': 'Welcome to Neon',
            'copy.signIn.body': 'Sign in below.',

            'copy.signUp.title': 'Sign Up for Neon',
            'copy.signUp.heading': 'Sign Up for Neon',
            'copy.signUp.body': 'See your high-performance thumbnails now. Get started by creating an account.',

            'copy.signOut.title': 'Sign Out',
            'copy.signOut.heading': '@displayName you are now signed out. Thanks for using Neon.',
            'copy.signOut.body': 'Want to make some more high performing video thumbnails? <a href="@link">Sign in</a> again!',

            'copy.videosPage.title': 'Video Library',
            'copy.videosPage.VideoProcessMsg': 'Video Processing \u2026',
            'copy.videosPage.heading': 'Video Library',
            'copy.videosPage.body': '@displayName, welcome to your video library. You can add, analyze and view your Neon high-performance video thumbnails, below.',

            'copy.analyzeVideo.title': 'Analyze Video',
            'copy.analyzeVideo.heading': 'Analyze Video',
            'copy.analyzeVideo.body': '',
            'copy.analyzeVideo.maxLimitHit': 'You\u2019ve hit your video upload limit. Increase your limit on the <a href="@link">Billing page</a> in just a few clicks.',
            'copy.analyzeVideo.badRequest': 'Please check your Video URL or your Thumbnail URL as they may be unreachable or badly formed.',
            'copy.analyzeVideo.experimentState' : 'Exp. State',

            'copy.terms.title': 'Terms of Service',
            'copy.terms.heading': 'Terms of Service',

            'copy.notFound.title': 'Page Not Found (Error 404)',
            'copy.notFound.heading': 'Page Not Found (Error 404)',
            'copy.notFound.body.1': 'Whoops! The page you are looking for doesn&rsquo;t exist.',
            'copy.notFound.body.2': 'Please <a href="@link">click here</a> to go back to Neon.',
            'copy.notFound.body.3': '(Error 404)',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.passwordInitial': 'Password',
            'copy.passwordConfirm': 'Confirm Password',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.userForgot.title': 'Forgot Password',
            'copy.userForgot.heading': 'Forgot Password',
            'copy.userForgot.body': 'Enter your email address below to receive an email with password reset instructions.',

            'copy.userForgot.success': 'If your email address is in our system, you should receive an email with password reset instructions shortly. Password reset links expire in an hour.',
            'copy.userForgot.error': 'TODO',

            'copy.userReset.title': 'Reset Password',
            'copy.userReset.heading': 'Reset Password',
            'copy.userReset.body': 'Enter your new password.',

            'copy.userReset.success': 'Your password has been reset. <a href="@link">Sign In</a>.',
            'copy.userReset.error': 'Something went wrong. <a href="@link">Try again</a>?',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.billing.title': 'Billing',
            'copy.billing.heading': 'Billing',
            'copy.billing.body': 'Neon\'s tiered subscription plans enable you to get information about how Neon images are performing on your site, give you access to our A/B testing features, and allow you to process more video. Pro plans allow you to process up to 100 videos per month. If you\'re interested in automatically processing more than 100 videos per month, get in touch with us at <a href="mailto:sales@neon-lab.com?subject=Enterprise plans information request">sales@neon-lab.com</a> for information about our enterprise plans.<p>For more details on what\'s included at each level of subscription, refer to our <a href="https://neon-lab.com/pricing/" target="_blank">Pricing</a> page.</p>',
            'copy.billing.form.useCardOnFile': 'Use Card on File',
            'copy.billing.form.changeCard': 'Change Card',
            'copy.billing.form.planType': 'Plan Type',
            'copy.billing.form.nameOnCard': 'Name on Card',
            'copy.billing.form.billingAddress': 'Billing Address',
            'copy.billing.form.address': 'Address Line 1',
            'copy.billing.form.address2': 'Address Line 2',
            'copy.billing.form.city': 'City',
            'copy.billing.form.state': 'State',
            'copy.billing.form.zip': 'Zip',
            'copy.billing.form.ccNumber': 'Credit Card Number',
            'copy.billing.form.ccExpiration': 'Expiration',
            'copy.billing.form.ccCVC': 'CVC',
            'copy.billing.form.saveSuccess': 'Your billing information has been updated.',

            'copy.api.title': 'API Documentation',
            'copy.api.heading': 'API Documentation',
            'copy.api.body': 'TODO',

            'copy.telemetry.title': 'Telemetry',
            'copy.telemetry.heading': 'Telemetry',
            'copy.telemetry.body': 'TODO',

            'copy.support.title': 'Support',
            'copy.support.heading': 'Support',
            'copy.support.body': '',

            'copy.userSettings.title': 'User Settings',
            'copy.userSettings.heading': 'User Settings',
            'copy.userSettings.body': '',

            'copy.accountSettings.title': 'Account Settings',
            'copy.accountSettings.heading': 'Account Settings',
            'copy.accountSettings.body': '',

            'copy.pendingAccount.title': 'Pending Neon Account',
            'copy.pendingAccount.heading': 'Pending Neon Account',
            'copy.pendingAccount.body.1': 'Almost there! Get ready to start creating higher performing video thumbnails.',
            'copy.pendingAccount.body.2': 'Please check your email for account verification. If you don&rsquo;t see an email, please check your spam folder.',
            'copy.pendingAccount.body.3': 'Still don&rsquo;t see it?  Please <a href="@link" rel="external">contact us</a>.',

            'copy.confirmAccount.title': 'Confirm Account',
            'copy.confirmAccount.heading': 'Confirm Account',
            'copy.confirmAccount.body.1': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails.',
            'copy.confirmAccount.body.2': 'Please look for an email to verify your account. If you don&rsquo;t see it within 30 minutes, please <a href="@link" rel="external">contact us</a>.',

            'copy.accountConfirmed.title': 'Account Confirmed',
            'copy.accountConfirmed.heading': 'Account Confirmed',
            'copy.accountConfirmed.body': 'Thanks for creating a Neon account. Your account is confirmed, so you can start your free demo by signing in now.',

            'copy.plugins.title': 'Plugins',
            'copy.plugins.heading': 'Plugins',
            'copy.plugins.body': 'Click ' + String.fromCharCode(8220) + 'Add' + String.fromCharCode(8221) + ' to add a new plugin, or edit existing plugins below.',

            'copy.new.plugin.title': 'Add Plugin',
            'copy.new.plugin.heading': 'Add Plugin',
            'copy.new.plugin.body': 'TODO',

            'copy.message.line.one': 'Oops! We can&rsquo;t find what you&rsquo;re looking for.',
            'copy.message.line.two': 'Here are some helpful links instead:' ,
            'copy.message.link.one': '<a href="@link">Neon Home</a>',
            'copy.message.link.two': '<a href="@link">Video Library</a>',
            'copy.message.link.three': '<a href="@link">Contact</a>',

            'copy.plugins.types.brightcove.title': 'Brightcove',
            'copy.plugins.types.brightcove.img': '/img/brightcove.png',
            'copy.plugins.types.brightcove.form.heading': 'Plugin Settings',
            'copy.plugins.types.brightcove.form.publisherId': 'Brightcove Publisher Id',
            'copy.plugins.types.brightcove.form.readToken': 'Read Token (with URL Access)',
            'copy.plugins.types.brightcove.form.writeToken': 'Write Token',

            'copy.analyzeVideoPanel.panel.1': 'To see your top thumbnails, paste a video URL into the Analyze field.',
            'copy.analyzeVideoPanel.panel.2': 'Click on the Analyze button.',
            'copy.analyzeVideoPanel.panel.3': 'View your results.',

            //integrations
            //brightcove
            'copy.integration.bc.accountId': 'Account ID',
            'copy.integration.bc.clientId': 'Client ID',
            'copy.integration.bc.clientSecret': 'Client Secret',
            'copy.integration.bc.yes': 'Yes',
            'copy.integration.bc.no': 'No',
            'copy.integration.bc.playerNotFound': 'No Players Found',
            'copy.integration.manualswitch': 'You are currently using a plugin or integration to ingest videos. To manually upload videos, click the button to the right. Doing this will not alter your integration or plugin.',

            'copy.type': 'Type',
            'copy.dimensions': 'Dimensions',
            'copy.thumbnailId': 'Thumbnail ID',
            'copy.created' : 'Created',
            'copy.updated' : 'Updated',
            'copy.frame' : 'Frame',
            'copy.ctr' : '<abbr title="Clickthrough Rate">CTR</abbr>',

            'copy.unknown': 'Unknown',
            'copy.na': 'N/A',

            returnSignIn: 'Return to Sign In',

            //analyze page
            'analyzeVideo.videoUrl': 'Video URL',
            'analyzeVideo.optionalTitle': 'Optional Title',
            'analyzeVideo.optionalDefaultThumbnailUrl': 'Optional Default Thumbnail URL',
            //navigation bar

            // Labels
            'label.username' : 'Username',
            'label.accessLevel' : 'Access Level',
            'label.created' : 'Created',
            'label.updated' : 'Updated',
            'label.firstName' : 'First Name',
            'label.lastName' : 'Last Name',
            'label.title' : 'Title',
            'label.defaultThumbnailId' : 'Default Thumbnail ID',
            'label.defaultSizeWidthXHeight' : 'Default Size (width x height)',
            'label.trackerAccountId' : 'Tracker Account ID',
            'label.stagingTrackerAccountId' : 'Staging Tracker Account ID',
            'label.accountName' : 'Account Name',
            'label.accountId' : 'Account ID',
            'label.avatar' : 'Avatar',
            // Created
            // Updated
            'label.servingEnabled' : 'Serving Enabled',
            'label.accountEmail' : 'Account Email',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.servingFraction': 'Serving Fraction',
            'copy.impressions': 'Impressions',
            'copy.conversions': 'Conversions',
            'copy.ctr': 'CTR',
            'copy.neonScoreEquals': 'NeonScore of @neonscore',
            'copy.bestThumbnail': 'Best Thumbnail',
            'copy.signedInAs': 'Signed In as @user',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.urlShortener.title': 'URL Shortener',
            'copy.urlShortener.heading': 'URL Shortener',
            'copy.urlShortener.body': 'Enter a Neon URL below to receive a shortened URL',
            'copy.urlShortener.messageHeading': 'URL Shortener Error',
            'copy.urlShortener.messageBody': 'Please enter a valid, external URL with protocol e.g. http://somewhere.com/something/',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'nav.home': 'Home',
            'nav.terms': 'Terms',
            'nav.signUp': 'Sign Up',
            'nav.signIn': 'Sign In',
            'nav.forgotUser': 'Forgot Password?',
            'nav.signOut': 'Sign Out',
            'nav.videoLibrary': 'Video Library',
            'nav.analyze': 'Analyze',
            'nav.contact': 'Contact',
            'nav.support': 'Support',
            'nav.plugins': 'Plugins',
            'nav.api': 'API Documentation',
            'nav.telemetry': 'Telemetry',
            'nav.billing': 'Billing',
            'nav.accountSettings': 'Account Settings',
            'nav.userSettings': 'User Settings',

            // Error messages

            'error.invalidAccountId': 'Naughty naughty. This Account Id is not valid. Please try again.',

            'warning.noMoreVideosHeader': 'Videos',
            'warning.noMoreVideosBody': 'There are no more Videos to show. Please go back using the Previous button below.',

            'error.unknown': 'An unknown error has occurred.',
            'error.passwordFormatInvalid': 'Passwords must be at least 8 characters long.',
            'error.passwordMatchInvalid': 'Passwords don&rsquo;t match.',
            'error.unableToSignIn': 'Unable to Sign In',

            'error.longVideo': 'Please upload a video shorter than 15 minutes long.',
            'error.loginlessLimit': 'You\'ve hit your limit for the day. Come back tomorrow to analyze more videos and photos.',
            'error.unpaidAccountLimit': 'You\'ve hit your upload limit. Check out your options for increasing your limits on our <a href="@link1">pricing page</a> or <a href="@link2">get in touch</a> with us.',
            'error.generic': 'Oops! Something went wrong. Please refresh the page or come back later.',
            'error.401': 'Oops! We can\'t find what you\'re looking for. Please refresh the page or try again.',
            'error.403': 'Oops! We can\'t find what you\'re looking for. Please refresh the page or try again.',
            'error.404': 'Oops! We can\'t find what you\'re looking for. Please try again.',

            //copy + marketing
            'copy.processingTime': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',
            'copy.agreeTerms': 'I agree to Neon\u2019s <a href="@link">Terms and Conditions</a> of use.',

            'copy.processingSlide.1': 'Thank you for submitting your video to Neon. We are now analyzing your video to find the most clickable thumbnails.',
            'copy.processingSlide.2': 'Please be patient–it takes about the same amount of time for Neon to analyze your video as it takes for you to watch it.',
            'copy.processingSlide.3': 'Did you know that Neon is the leader in video analytics using our patented deep neural network technology to identify the highest-performing video thumbnails?',
            // TODO 'copy.processingSlide.4': 'When Neon is done analyzing your video, your thumbnails will appear below. If you don&rsquo;t want to wait, you can safely exit this page without interrupting the process and come back later to view the results. You will also get an email from Neon when your thumbnails are ready.',
            'copy.processingSlide.4': 'When Neon is done analyzing your video, your thumbnails will appear below. If you don&rsquo;t want to wait, you can safely exit this page without interrupting the process and come back later to view the results.',

            'copy.copyright': String.fromCharCode(169) + ' 2016 @name All rights reserved.',
            'copy.newsFlashMessage': 'Note: Please be aware this is a V2 DEMO only and should not be shared yet. Thank you. Neon.',
            'copy.PreviousLabel': 'Previous',
            'copy.NextLabel': 'Next',
            //image processing stages
            'copy.unknownState': 'Unknown',
            'copy.processingState': 'Processing',
            'copy.processedState': 'OK',
            'copy.servingState': 'OK',
            'copy.failedState': 'Failed'
        },
        'en-GB': {
        },
        'es-MX': {
        }
    },
    _LOCALE = _getLocale(),
    _DICTIONARY = _getTranslations(),
    _UNKNOWN_STRING = '[UNKNOWN]'
;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function _getLocale() {
    var locale = navigator.language.split('-');
    locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
    return locale;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function _getTranslations() {
    return Object.assign(_TRANSLATIONS[_DEFAULT_LOCALE], _TRANSLATIONS[_LOCALE]);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

let T = {
    get: function(key, placeholders) {
        if (_DICTIONARY[key]) {
            if (placeholders) {
                var new_str = _DICTIONARY[key];
                for (var key in placeholders) {
                    if (!placeholders.hasOwnProperty(key)) {
                        continue;
                    }
                    new_str = new_str.replace(key, placeholders[key]);
                }
                return new_str;
            }
            return _DICTIONARY[key]
        }
        else {
            return  _UNKNOWN_STRING;
        }
    },
    getLocale: _getLocale
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default T;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
