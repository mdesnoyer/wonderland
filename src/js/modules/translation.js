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
            logIn: 'Log In',
            logOut: 'Log Out',
            confirmAccount: 'Confirm Account',
            confirmedAccount: 'Your account is confirmed. Please sign in to continue.',
            configure: 'Configure',
            add: 'Add',
            cancel: 'Cancel',
            save: 'Save',
            update: 'Update',
            url: 'URL',
            copy: 'Copy',
            close: 'Close',
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

            'action.previous': 'Previous',
            'action.next': 'Next',
            'action.save': 'Save',
            'action.set': 'Set',
            'action.resetPassword': 'Reset Password',
            'action.shortenURL': 'Shorten URL',

            rememberMe: 'Remember',

            'copy.xOfY': '@x of @y',

            'copy.whyThisImage': 'Why did Neon pick this image? We understand all of the different features that give rise to image preference. In your image, these particular features showed up.',

            'copy.videoContent.delete': 'Are you sure you want to delete all of the images from this video collection?',
            'copy.videoContent.delete.title': 'Delete Collection',
            'copy.videoContent.email': 'Get an email summary of your image results for this video.',
            'copy.videoContent.share': 'Copy the link below to share this collection directly with your friends and peers',

            'copy.signIn.title': 'Sign In',
            'copy.signIn.heading': 'Welcome to Neon',
            'copy.signIn.body': 'Sign in below.',

            'copy.signUp.title': 'Analyze More Videos',
            'copy.signUp.body': 'Create a free account to analyze more videos, see more NeonScores, and understand how images work.',
            'copy.signUp.logIn': 'Already have an account? <a href="@link">Log In</a>.',

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

            'copy.terms.title': 'Terms of Service',
            'copy.terms.heading': 'Terms of Service',

            'copy.notFound.title': 'Page Not Found (Error 404)',
            'copy.notFound.heading': 'Page Not Found (Error 404)',
            'copy.notFound.body.1': 'Whoops! The page you are looking for doesn&rsquo;t exist.',
            'copy.notFound.body.2': 'Please <a href="@link">click here</a> to go back to Neon.',
            'copy.notFound.body.3': '(Error 404)',

            'copy.lift.explanation': 'Compared to the default thumbnail for this video, with our select top scoring image.',
            'copy.lift.units': '@lift Lift',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.passwordInitial': 'Password',
            'copy.passwordConfirm': 'Confirm Password',
            'copy.passwordVerify': 'Verify Password',

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
            'copy.account.heading': 'Hi, @displayName',
            'copy.account.body' : 'Enjoying your Neon Demo, but want to analyze more content more quickly? <a href="@link">Get More!</a>',
            'copy.account.changePassword' : 'Want to change your password? We’ll send you a secure link. Please verify your email below.',

            'copy.pendingAccount.title': 'Pending Neon Account',
            'copy.pendingAccount.heading': 'Pending Neon Account',
            'copy.pendingAccount.body.1': 'Almost there! Get ready to start creating higher performing video thumbnails.',
            'copy.pendingAccount.body.2': 'Please check your email for account verification. If you don&rsquo;t see an email, please check your spam folder.',
            'copy.pendingAccount.body.3': 'Still don&rsquo;t see it?  Please <a href="@link" rel="external">contact us</a>.',

            'copy.confirmAccount.title': 'Confirm Account',
            'copy.confirmAccount.heading': 'Confirm Account',
            'copy.confirmAccount.body.1': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails!',
            'copy.confirmAccount.body.2': 'Please look for an email that will verify you account. It should arrive very quickly. If not, please <a href="@link" rel="external">contact us</a>.',
            
            'copy.confirmAccount.body': 'Thank you for signing up for a Neon account. You are one step closer to creating higher performing thumbnails. Please look for an email to verify your account. If you don\u2019t see it within 30 minutes, please contact us.',

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

            returnSignIn: 'Return to Sign In',

            //analyze page
            'upload.videoUrl': 'Video URL',
            'upload.submit': 'Submit',
            'upload.optionalTitle': 'Optional Title',
            'upload.optionalDefaultThumbnailUrl': 'Optional Default Thumbnail URL',
            //navigation bar

            // Labels
            'label.username' : 'Username',
            'label.accessLevel' : 'Access Level',
            'label.created' : 'Created',
            'label.updated' : 'Updated',
            'label.firstName' : 'Your First Name',
            'label.lastName' : 'Your Last Name',
            'label.lastName.optional' : 'Your Last Name (Optional)',
            'label.title' : 'Title',
            'label.defaultThumbnailId' : 'Default Thumbnail ID',
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
            // Created
            // Updated
            'label.accountEmail' : 'Account Email',
            'label.lift' : 'Lift',

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            'copy.bestThumbnail': 'Best Thumbnail',
            'copy.defaultThumbnail': 'Default Thumbnail',
            'copy.neonSelect': 'Neon Select',
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

            'copy.share.facebook': '#neonthumbnails found the best image in my video and gave it a NeonScore. What’s your NeonScore?',
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

            // Titles

            'title.home': 'Go to the Home Page',

            // Error messages

            'error.invalidAccountId': 'Naughty naughty. This Account Id is not valid. Please try again.',

            'warning.noMoreVideosHeader': 'Videos',
            'warning.noMoreVideosBody': 'There are no more Videos to show. Please go back using the Previous button below.',

            'error.unknown': 'An unknown error has occurred.',
            'error.passwordFormatInvalid': 'Passwords must be at least 8 characters long.',
            'error.passwordMatchInvalid': 'Passwords don\u2019t match.',
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
            'copy.homePage.description': 'Upload a video and Neon will show you the thumbnails that will give you the most clicks.',
            'copy.homePage.neonBeta': 'NeonScore for Video (beta 1.0)',
            'copy.homePage.signedUp': 'Already Signed Up?'
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
