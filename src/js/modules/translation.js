// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _DEFAULT_LOCALE = 'en-US',
    _TRANSLATIONS = {
        'en-US': {
            'app.companyFullName': 'Neon Labs, Inc.',
            'app.companyName': 'Neon',
            'app.appName': 'Wonderland',
            'app.credit': '@app by @name',
            'app.separator': ' | ',
            //Common terms 
            upload: 'Upload',
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
            contact: 'Contact',
            rememberMe: 'Remember Me',

            'copy.uploadVideo.title': 'Upload Video',
            'copy.uploadVideo.heading': 'Upload Video',
            'copy.uploadVideo.body': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',

            'copy.signIn.title': 'Sign In',
            'copy.signIn.heading': 'Sign In',
            'copy.signIn.body': 'Sign in using the form below.',

            'copy.signUp.title': 'Sign Up',
            'copy.signUp.heading': 'Sign Up',
            'copy.signUp.body': 'Sign up using the form below.',

            'copy.signOut.title': 'Sign Out',
            'copy.signOut.heading': 'You' + String.fromCharCode(39) + 've been signed out',
            'copy.signOut.body': 'You' + String.fromCharCode(39) + 've been signed out. Why not Sign In again?',

            'copy.terms.title': 'Terms of Service',
            'copy.terms.heading': 'Terms of Service',

            'copy.notFound.title': 'Page Not Found (Error 404)',
            'copy.notFound.heading': 'Page Not Found (Error 404)',
            'copy.notFound.body': 'We could not find what you were looking for.',

            'copy.forgotPassword.title': 'Forgot Password',
            'copy.forgotPassword.heading': 'Forgot Password',
            'copy.forgotPassword.body': 'Please enter your email below to reset your password.',

            'copy.pendingAccount.title': 'Pending Account',
            'copy.pendingAccount.heading': 'Pending Account',
            'copy.pendingAccount.body': 'Please check your email for a verification email. If you don' + String.fromCharCode(39) + 't see an email, please check your filters and trash folders.',

            'copy.confirmAccount.title': 'Confirm Account',
            'copy.confirmAccount.heading': 'Confirm Account',
            'copy.confirmAccount.body': 'TODO',

            'copy.accountConfirmed.title': 'Account Confirmed',
            'copy.accountConfirmed.heading': 'Account Confirmed',
            'copy.accountConfirmed.body': 'TODO',

            returnSignIn: 'Return to Sign In',
            //password reset
            'reset.forgot':  'Forgot your password?',
            'reset.passwordReset': 'Password Reset',
            'reset.sendReset': 'Send Reset Instructions',
            'reset.message': 'Please Check your Email for Reset Instructions',
            //upload page 
            'upload.addVideoUrl': 'Add Video URL',
            'upload.optionalTitle': 'Optional Title',
            //navigation bar 
            'nav.home': 'Home',
            'nav.terms': 'Terms',
            'nav.signUp': 'Sign Up',
            'nav.signIn': 'Sign In',
            'nav.signOut': 'Sign Out',
            'nav.videos': 'Videos',
            'nav.upload': 'Upload',
            'nav.contact': 'Contact',
            //error messages
            'error.passwordFormatInvalid': 'Passwords must be 8 Characters and include one number and one special character.',
            'error.passwordMatchInvalid': 'Password does not match the confirm password.',
            'error.notFoundPage': 'Page Not Found (Error 404)',
            'error.unableToSignIn': 'Unable to Sign In',
            //copy + marketing 
            'copy.accountCreationTempError': 'Account Creation is Currently In Development, Please Use Test Account',
            'copy.processingTime': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',
            // 'copy.agreeTerms': 'I agree with the Neon'+ String.fromCharCode(39) + 's',
            // 'copy.termsLink': ' Terms and Conditions.',
            'copy.agreeTerms': 'I agree with the Neon'+ String.fromCharCode(39) + 's <a href="@link">Terms and Conditions</a> of use.',
            'copy.slideOne': 'Thank you for uploading your video to Neon. We are scanning it now to determine the top 5  most "clickable" thumbnails.',
            'copy.slideTwo': 'Please be patient. Scanning takes place in real time, so a 10 minute video will take approximately 10 minutes to scan.',
            'copy.slideThree': 'When complete, your thumbnails will appear below. If you don&rsquo;t want to wait, you can exit this page without interrupting the process and come back later to view the results.',
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
            firstName: 'Forename',
            'copy.newsFlashMessage': 'FOGGY DIES SPOILER SPOILER WOLVERINE MARRIES KAREN !!! DAREDEVIL LOSES THE LEASE ON HIS APPARTMENT',
            'copy.agreeTerms': 'Here is a link <a href="@link">TERMS</a> for you to click.',
            'app.credit': '@app is proudly written by @name',
            'app.separator': ' !!! ',
            'error.notFoundPage': 'It canny be foond!',
        },
        'es-MX': {
            signUp: 'Regístrate',
            firstName: 'Nombre de Pila',
            lastName: 'Apellido',
            email: 'Correo Electrónico',
            password: 'Contraseña',
            confirm: 'Confirmar',
            title: 'Título',
            company: 'Empresa' 
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
