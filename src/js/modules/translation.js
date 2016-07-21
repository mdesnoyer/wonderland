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
            confirmAccount: 'Confirm Account',
            confirmedAccount: 'Your account is confirmed. Please sign in to continue.',
            configure: 'Configure',
            add: 'Add',
            cancel: 'Cancel',
            save: 'Save',
            update: 'Update',
            url: 'URL',
            copy: 'Copy',
            back: 'Back',
            send: 'Send',
            change: 'Change',
            delete: 'Delete',
            share: 'Share',
            apply: 'Apply',
            upload: 'Upload',
            tryItOut: 'Try it Out',
            'copy.loading': 'Loading' + String.fromCharCode(8230),
            'copy.currentThumbnail': 'Current Thumbnail',

            'action.signIn': 'Sign In',
            'action.signUp': 'Sign Up',
            'action.signOut': 'Sign Out',
            'action.previous': 'Previous',
            'action.next': 'Next',
            'action.save': 'Save',
            'action.set': 'Set',
            'action.resetPassword': 'Reset Password',
            'action.shortenURL': 'Shorten URL',
            'action.close': 'Close',
            'action.analyze': 'Analyze',

            rememberMe: 'Remember',

            'copy.xOfY': '@x of @y',
            'copy.pageN': 'Page @n',

            'copy.whyThisImage': 'What goes into a NeonScore? We analyze your images for over 1,000 valence features that shape human visual preference. Here are a few of the features that stood out in your image.',

            'copy.videoContent.delete': 'Are you sure you want to delete all of the images from this video collection?',
            'copy.videoContent.delete.title': 'Delete Collection',
            'copy.videoContent.email': 'Get an email summary of your image results for this video.',
            'copy.videoContent.email.success': 'Your image results email is on the way! If you don\u2019t receive an email from us soon, check your spam box in case our email got misplaced.',
            'copy.videoContent.share': 'Copy the link below to share this collection directly with your friends and peers',

            'copy.signIn.title': 'Sign In',
            'copy.signIn.heading': 'Welcome to Neon',
            'copy.signIn.body': 'Sign in below.',

            'copy.signUp.title': 'Analyze More Videos',
            'copy.signUp.body': 'Create a free account to analyze more videos, see more NeonScores, and understand how images work.',
            'copy.signUp.signIn': 'Already have an account? <a href="@link">Sign In</a>.',

            'copy.signUp.success.title': 'Thank you for signing up for a Neon account',
            'copy.signUp.success.body': 'You are one step closer to seeing your most clickable thumbnails. Please look for an email from us to verify your account. If you don\'t see it within 30 minutes, let us know.',

            'copy.signOut.title': 'Sign Out',
            'copy.signOut.heading': '@displayName you are now signed out. Thanks for using Neon.',
            'copy.signOut.body': 'Want to make some more high performing video thumbnails? <a href="@link">Sign In</a> again!',

            'copy.videosPage.title': 'Video Library',
            'copy.videosPage.VideoProcessMsg': 'Video Processing \u2026',
            'copy.videosPage.heading': 'Video Library',
            'copy.videosPage.body': '@displayName, welcome to your video library. You can add, analyze and view your Neon high-performance video thumbnails, below.',

            'copy.analyzeVideo.title': 'Analyze Video',
            'copy.analyzeVideo.heading': 'Analyze Video',
            'copy.analyzeVideo.body': '',
            'copy.analyzeVideo.maxLimitHit': 'You\u2019ve hit your limit for the day. Come back tomorrow to analyze more videos and photos.',
            'copy.analyzeVideo.badRequest': 'Please check your Video URL or your Thumbnail URL as they may be unreachable or badly formed.',

            'copy.terms.title': 'Terms of Service',
            'copy.terms.heading': 'Terms of Service',

            'copy.notFound.title': 'Page Not Found (Error 404)',
            'copy.notFound.heading': 'Page Not Found (Error 404)',
            'copy.notFound.body.1': 'Oops! We can\u2019t find what you\u2019re looking for. Please try again.',
            'copy.notFound.body.2': 'Please <a href="@link">click here</a> to go back to Neon.',
            'copy.notFound.body.3': '(Error 404)',

            'copy.lift.explanation': 'Lift is the percentage increase in clicks your video would get by using Neon images.',
            'copy.lift.units': '@lift Lift',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            'copy.passwordPlaceholder': "••••••••••",
            'copy.passwordInitial': 'Password',
            'copy.passwordConfirm': 'Confirm Password',
            'copy.passwordVerify': 'Verify Password',

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
            'copy.account.heading': 'Hi, @displayName',
            'copy.account.body' : 'Enjoying your Neon Demo, but want to analyze more content more quickly? <a href="@link">Get More!</a>',
            'copy.heading.changePassword' : 'Change Password',
            'copy.account.changePassword' : 'Want to change your password? We’ll send you a secure link.',

            'copy.pendingAccount.title': 'Pending Neon Account',
            'copy.pendingAccount.heading': 'Pending Neon Account',
            'copy.pendingAccount.body.1': 'Almost there! Get ready to start creating higher performing video thumbnails.',
            'copy.pendingAccount.body.2': 'Please check your email for account verification. If you don&rsquo;t see an email, please check your spam folder.',
            'copy.pendingAccount.body.3': 'Still don&rsquo;t see it?  Please <a href="@link" rel="external">contact us</a>.',

            'copy.confirmAccount.title': 'Confirm Account',
            'copy.confirmAccount.heading': 'Confirm Account',
            'copy.confirmAccount.body.1': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails!',
            'copy.confirmAccount.body.2': 'Please look for an email that will verify you account. It should arrive very quickly. If not, please <a href="@link" rel="external">contact us</a>.',
            'copy.confirmAccount.body': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails! Please look for an email that will verify you account. It should arrive very quickly. If not, please contact us.',

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

            'copy.integration.bc.accountId': 'Account ID',
            'copy.integration.bc.clientId': 'Client ID',
            'copy.integration.bc.clientSecret': 'Client Secret',
            'copy.integration.bc.yes': 'Yes',
            'copy.integration.bc.no': 'No',
            'copy.integration.bc.playerNotFound': 'No Players Found',
            'copy.integration.manualswitch': 'You are currently using a plugin or integration to ingest videos. To manually upload videos, click the button to the right. Doing this will not alter your integration or plugin.',

            'copy.unknown': 'Unknown',
            'copy.na': 'N/A',
            'copy.pending': 'Pending',

            returnSignIn: 'Return to Sign In',

            // Analyze page
            'upload.videoUrl': 'Video URL',
            'upload.submit': 'Submit',
            'upload.optionalTitle': 'Optional Title',
            'upload.optionalDefaultThumbnailUrl': 'Optional Default Thumbnail URL',

            // Labels
            'label.username' : 'Username',
            'label.accessLevel' : 'Access Level',
            'label.created' : 'Created',
            'label.updated' : 'Updated',
            'label.firstName' : 'Your First Name',
            'label.lastName' : 'Your Last Name',
            'label.lastName.optional' : 'Your Last Name (Optional)',
            'label.title' : 'Title',
            'label.defaultThumbnailId' : 'Default Image ID',
            'label.defaultSizeWidthXHeight' : 'Default Size (width x height)',
            'label.trackerAccountId' : 'Tracker Account ID',
            'label.stagingTrackerAccountId' : 'Staging Tracker Account ID',
            'label.accountName' : 'Account Name',
            'label.accountId' : 'Account ID',
            'label.avatar' : 'Avatar',
            'label.yourName' : 'Your Name',
            'label.yourEmail' : 'Your Email',
            'label.emailMe' : 'Email Me',
            'label.message' : 'Message',
            'label.ourLocation' : 'Our Location',
            'label.gender': 'Gender',
            'label.age': 'Age',
            'label.newPassword' : 'New Password',
            // Created
            // Updated
            'label.accountEmail' : 'Account Email',
            'label.lift' : 'Lift',
            'label.filters': 'Filters',
            'label.submit': 'Submit',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            'copy.thumbnails.high': 'Hide Low Scores',
            'copy.thumbnails.low': 'View Low Scores',
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.bestThumbnail': 'Best Thumbnail',
            'copy.defaultImage': 'Default Image',
            'copy.topNeonImage': 'Top Neon Image',
            'copy.valenceFeatures': 'Valence Features',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.contactUs.success' : 'Thanks! We’ll be in touch shortly.',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.urlShortener.title': 'URL Shortener',
            'copy.urlShortener.heading': 'URL Shortener',
            'copy.urlShortener.body': 'Enter a Neon URL below to receive a shortened URL',
            'copy.urlShortener.messageHeading': 'URL Shortener Error',
            'copy.urlShortener.messageBody': 'Please enter a valid, external URL with protocol e.g. http://somewhere.com/something/',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.cookies.title': 'Cookies Report',
            'copy.cookies.heading': 'Cookies Report',
            'copy.cookies.body': 'Listed below is the visibility status of each cookie',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.share.facebook': '@neonthumbnails found the best image in my video and gave it a NeonScore. What’s your NeonScore?',
            'copy.share.twitter': '@neonlab found the best image in my video and gave it a NeonScore. What’s your #NeonScore?',
            'copy.share.linkedin': 'Neon found the best image in my video and gave it a NeonScore. What’s your NeonScore?',
            'copy.share.description': 'Copy the link below to share this collection. Anyone with this link can view your images for this video.',
            'copy.share.title': 'Neon Labs',
            'copy.share.main': 'Share Your Images',
            'copy.share.label': 'COLLECTION LINK',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


            'nav.home': 'Home',
            'nav.terms': 'Terms',
            'nav.signUp': 'Sign Up',
            'nav.signIn': 'Sign In',
            'nav.account': 'Account',
            'nav.forgotUser': 'Forgot Password?',
            'nav.signOut': 'Sign Out',
            'nav.videoLibrary': 'Video Library',
            'nav.analyze': 'Analyze',
            'nav.contact': 'Contact Us',
            'nav.support': 'Support',
            'nav.plugins': 'Plugins',
            'nav.api': 'API Documentation',
            'nav.telemetry': 'Telemetry',
            'nav.billing': 'Billing',
            'nav.accountSettings': 'Account Settings',
            'nav.userSettings': 'User Settings',
            'nav.learnMore': 'Learn More',
            'nav.settings' : 'Settings',

            // Titles

            'title.home': 'Go to the Home Page',

            // Error messages

            'error.invalidAccountId': 'Naughty naughty. This Account Id is not valid. Please try again.',

            'warning.noMoreVideosHeader': 'Videos',
            'warning.noMoreVideosBody': 'There are no more Videos to show. Please go back using the Previous button below.',

            'error.unknown': 'An unknown error has occurred.',
            'error.passwordFormatInvalid': 'Passwords must be at least 8 characters long.',
            'error.passwordMatchInvalid': 'Passwords don\u2019t match',
            'error.invalidEmail': 'Please enter a valid email address.',
            'error.contactUs': 'Oops! We can’t receive your message right now. Please try again or email us at ask@neon-lab.com.',
            'error.unableToSignIn': 'Sorry, we are unable to sign you in. We can help you <a href="@link">recover your password</a>. ',


            'error.longVideo': 'Video too long! Please upload a video under 15 minutes long.',
            'error.genericVideo': ' Oops! We had trouble analyzing that video. Try again, or analyze a different video.',
            'error.loginlessLimit': 'You\'ve hit your limit for the day. Come back tomorrow to analyze more videos and photos.',
            'error.unpaidAccountLimit': 'You\'ve hit your upload limit. Check out your options for increasing your limits on our <a href="@link1">pricing page</a> or <a href="@link2">get in touch</a> with us.',
            'error.generic': 'Oops! Something went wrong. Please refresh the page or come back later.',
            'error.401': 'Oops! We can\'t find what you\'re looking for. Please refresh the page or try again.',
            'error.403': 'Oops! We can\'t find what you\'re looking for. Please refresh the page or try again.',
            'error.404': 'Oops! We can\'t find what you\'re looking for. Please try again.',

            //copy + marketing
            'copy.processingTime': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',
            'copy.agreeTerms': 'By using this service, you agree to our <a href="@link" target="_blank">Terms of Service</a>.',

            'copy.copyright': String.fromCharCode(169) + ' 2016 @name All rights reserved.',
            'copy.PreviousLabel': 'Previous',
            'copy.NextLabel': 'Next',
            //image processing stages
            'copy.unknownState': 'Unknown',
            'copy.processingState': 'Processing',
            'copy.processedState': 'OK',
            'copy.servingState': 'OK',
            'copy.failedState': 'Failed',

            // Home page
            'copy.homePage.title': 'Find your most clickable images',
            'copy.homePage.description': 'Upload a video and Neon will show you the<br/>thumbnails that will give you the most clicks.',
            'copy.homePage.signedUp': 'Already Signed Up?',

            // Onboarding
            'copy.onboarding.uploadHelpText': 'Analyze a video at any time by clicking here',
            'copy.onboarding.uploadPageTitle': 'Analyze a Video',
            'copy.onboarding.uploadErrorText': "Oops! We weren't able to analyze that video. Try again with a different video.",
            'copy.onboarding.slides.import.title': 'Import',
            'copy.onboarding.slides.import.subtitle': 'Great! We’ve got it.',
            'copy.onboarding.slides.import.description': 'We have your video and we’ve started processing it. This may take a few minutes. Stick around to learn about Neon or enter your email address below so we can let you know when your images are ready.',
            'copy.onboarding.slides.machineVision.title': 'Machine Vision',
            'copy.onboarding.slides.machineVision.subtitle': 'Think Fast',
            'copy.onboarding.slides.machineVision.description': 'Our brains decide in under 100 milliseconds which images we want to click on. Neon’s deep learning software knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms.',
            'copy.onboarding.slides.seedLibrary.title': 'Seed Library',
            'copy.onboarding.slides.seedLibrary.subtitle': 'What’s happening to my video right now?',
            'copy.onboarding.slides.seedLibrary.description': 'Your video is being analyzed by our deep learning software to identify the most appealing frames. Your frames are then compared to frames in our image library to predict engagement.',
            'copy.onboarding.slides.valence.title': 'Valence',
            'copy.onboarding.slides.valence.subtitle': '1,000+ Image Features',
            'copy.onboarding.slides.valence.description': 'We analyze each image or video frame for over 1,000 unique features and assign a NeonScore. Some of these features include eye gaze, instability, color, texture, and flowing water.',
            'copy.onboarding.slides.best.title': 'Best Performer',
            'copy.onboarding.slides.best.subtitle': 'What is a NeonScore?',
            'copy.onboarding.slides.best.description': 'The NeonScore is a number from 0-99 that represents how clickable your image is. The higher the score, the more engaging the image. Engaging images are more likely to get clicked online.',
            'copy.onboarding.slides.processing.title': 'Processing',
            'copy.onboarding.slides.processing.subtitle': 'Images for Your Audience',
            'copy.onboarding.slides.processing.description': 'Neon finds the best images for a general audience by default, but can also surface the most engaging images for the specific audience you’re targeting with your content.',
            'copy.onboarding.link.learnMore': 'Learn More',
            'copy.onboarding.resultsEmail.error': "I'm sorry, we weren't able to complete your request at this time",
            'copy.onboarding.resultsEmail.success': "Thanks! We’ll be in touch…",
            'copy.onboarding.resultsEmail.title': 'Don’t want to wait? We’ll email you when your results are ready.',

            // Videos
            'copy.videos.upload.filter.title': 'Filters',
            'copy.videos.upload.filter.description': 'Get images for a specific audience.',
            'copy.videos.topSelects': 'Top Neon Selects',
            'copy.videos.lowest': 'Lowest Neon Scores',

            // Mobile
            'copy.mobile.warning.title': 'This experience is currently designed for desktop.',
            'copy.mobile.warning.description': 'Check out the full site at app.neon-lab.com.',

            // Tutorial
            'copy.tutorial.checkItOut': 'Check it Out',
            'copy.tutorial.skip': 'Skip Tutorial',
            'copy.tutorial.ready.title': 'Your images are ready!',
            'copy.tutorial.neonscore.title': 'What is a NeonScore?',
            'copy.tutorial.neonscore.description': 'The NeonScore is a 0-99 scale that represents how clickable your image is. The higher the score, the more clicks.',
            'copy.tutorial.lift.title': 'What is lift?',
            'copy.tutorial.lift.description': 'Lift is the percentage increase in clicks your video would get by using Neon images as your video thumbnails.',
            'copy.tutorial.upload.title': 'Upload your own videos.',
            'copy.tutorial.upload.description': 'If you like what you see, you can upload your own videos to get your most clickable images. Just click on the orange button on the next screen and enter a video URL.',
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
    var language = navigator.language || navigator.userLanguage;
    var locale = language.split('-');
    locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : language;
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
