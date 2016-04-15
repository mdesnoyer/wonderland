// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _DEFAULT_LOCALE = 'en-US',
    _TRANSLATIONS = {
        'en-US': {
            'app.companyLongName': 'Neon Labs, Inc.',
            'app.companyShortName': 'Neon',
            'app.appName': 'Wonderland',
            'app.credit': '@app by @name',
            'app.separator': ' | ',
            'app.companySig': '- The Neon Team',
            //Common terms
            analyze: 'Analyze',
            videos: 'Videos',
            firstName: 'First Name',
            lastName: 'Last Name',
            accountId: 'Account ID',
            email: 'Email',
            password: 'Password',
            confirm: 'Confirm',
            title: 'Title',
            company: 'Company',
            error: 'Error',
            signUp: 'Sign Up',
            signIn: 'Sign In',
            confirmAccount: 'Confirm Account',
            confirmedAccount: 'Congratulations; your account has been confirmed! Please sign in to continue.',
            configure: 'Configure',
            add: 'Add',

            rememberMe: 'Remember Me',

            'copy.signIn.title': 'Sign In',
            'copy.signIn.heading': 'Welcome to Neon! Sign In Below',
            'copy.signIn.body': 'Sign in using the form below.',

            'copy.signUp.title': 'Sign Up for Neon',
            'copy.signUp.heading': 'Sign Up for Neon',
            'copy.signUp.body': 'Start making high-performance video thumbnails now! Create an account, below.',

            'copy.signOut.title': 'Sign Out',
            // TODO - needs @username to work
            // 'copy.signOut.heading': '@username you are now signed out. Thanks for using Neon.',
            'copy.signOut.heading': 'You are now signed out. Thanks for using Neon.',
            'copy.signOut.body': 'Want to make some more high performing video thumbnails? <a href="@link">Sign in</a> again!',

            'copy.videosPage.title': 'Video Library',
            'copy.videosPage.heading': 'Video Library',
            // 'copy.videosPage.body': '@username, welcome to your video library. You can add, analyze and view your Neon high-performance video thumbnails, below.',
            'copy.videosPage.body': 'Welcome to your video library. You can add, analyze and view your Neon high-performance video thumbnails, below.',

            'copy.analyzeVideo.title': 'Analyze Video',
            'copy.analyzeVideo.heading': 'Analyze Video',
            'copy.analyzeVideo.body': 'Thanks for submitting your video. Neon is now analyzing your video to identify the high-performance thumbnails. Please note the processing time depends on the total length of the video. It takes the Neon analytics computer about the same amount of time to analyze the video as it takes you to watch it.',
            'copy.analyzeVideo.maxLimitHit': 'Whoops! You have hit your demo limit of %limit. Please <a href="@link">contact us</a> to buy more',

            'copy.terms.title': 'Terms of Service',
            'copy.terms.heading': 'Terms of Service',

            'copy.notFound.title': 'Page Not Found (Error 404)',
            'copy.notFound.heading': 'Page Not Found (Error 404)',
            'copy.notFound.body.1': 'Whoops! The page you are looking for doesn&rsquo;t exist.',
            'copy.notFound.body.2': 'Please <a href="@link">click here</a> to go back to Neon.',
            'copy.notFound.body.3': '(Error 404)',

            'copy.forgotPassword.title': 'Forgot Password',
            'copy.forgotPassword.heading': 'Forgot Password',
            'copy.forgotPassword.body': 'Please enter your email address below to start the password reset process.',

            'copy.pendingAccount.title': 'Pending Neon Account',
            'copy.pendingAccount.heading': 'Pending Neon Account',
            'copy.pendingAccount.body.1': 'Almost there! Get ready to start creating higher performing video thumbnails.',
            'copy.pendingAccount.body.2': 'Please check your email for account verification. If you don&rsquo;t see an email, please check your spam &amp; junk filters or trash folder.',
            'copy.pendingAccount.body.3': 'Still don&rsquo;t find it?  Please <a href="@link" rel="external">contact us</a>.',

            'copy.confirmAccount.title': 'Confirm Account',
            'copy.confirmAccount.heading': 'Confirm Account',
            'copy.confirmAccount.body.1': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails!',
            'copy.confirmAccount.body.2': 'Please look for an email that will verify you account. It should arrive very quickly. If not, please <a href="@link" rel="external">contact us</a>.',

            'copy.accountConfirmed.title': 'Account Confirmed',
            'copy.accountConfirmed.heading': 'Account Confirmed',
            'copy.accountConfirmed.body': 'Thank you for creating an account at Neon. Your account is now confirmed, and you may start using your Demo account by <a href="@link">signing in now</a>. You are now ready to make your video thumbnails more clickable!',

            'copy.integrations.list.title': 'Integrations',
            'copy.integrations.list.heading': 'Integrations',
            'copy.integrations.list.body': 'TODO',
            'copy.integrations.add.title': 'Add Integration',
            'copy.integrations.add.heading': 'Add Integration',
            'copy.integrations.add.body': 'TODO',
            'copy.integrations.types.brightcove.title': 'Brightcove',
            'copy.integrations.types.brightcove.heading': 'Brightcove',
            'copy.integrations.types.brightcove.body': 'TODO',
            'copy.integrations.types.brightcove.img': '/img/brightcove.png',

            'copy.analyzeVideoPanel.panel.1': '1. Find A Video You Would Like to Score',
            'copy.analyzeVideoPanel.panel.2': '2. Copy &amp; Paste URL into the Analyze Bar ',
            'copy.analyzeVideoPanel.panel.3': '3. Click on the Analyze Button',
            'copy.analyzeVideoPanel.panel.4': '4. Watch the Results',

            returnSignIn: 'Return to Sign In',
            //password reset
            'reset.forgot':  'Forgot your password?',
            'reset.passwordReset': 'Password Reset',
            'reset.sendReset': 'Send Reset Instructions',
            'reset.message': 'Please Check your Email for Reset Instructions',
            //analyze page
            'analyze.addVideoUrl': 'Add Video URL',
            'analyze.optionalTitle': 'Optional Title',
            //navigation bar

            'nav.home': 'Home',
            'nav.terms': 'Terms',
            'nav.signUp': 'Sign Up',
            'nav.signIn': 'Sign In',
            'nav.signOut': 'Sign Out',
            'nav.videos': 'Videos',
            'nav.analyze': 'Analyze',
            'nav.contact': 'Contact',

            //error messages
            'error.passwordFormatInvalid': 'Passwords must be 8 Characters and include one number and one special character.',
            'error.passwordMatchInvalid': 'Password does not match the confirm password.',
            'error.unableToSignIn': 'Unable to Sign In',
            //copy + marketing
            'copy.accountCreationTempError': 'Account Creation is Currently In Development, Please Use Test Account',
            'copy.processingTime': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',
            'copy.agreeTerms': 'I agree with Neon'+ String.fromCharCode(39) + 's <a href="@link">Terms and Conditions</a> of use.',
            
            'copy.processingSlide.1': 'Thank you for submitting your video to Neon. We are now analyzing your video to find the the 6 most clickable thumbnails.',
            'copy.processingSlide.2': 'Please be patient - it takes about the same amount of time for Neon to analyze your video as it takes to watch it.',
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
