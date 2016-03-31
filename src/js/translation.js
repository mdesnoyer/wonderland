// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _DEFAULT_LOCALE = 'en-US',
    _TRANSLATIONS = {
        'en-US': {
            //Common terms 
            upload: 'Upload',
            videos: 'Videos',
            firstName: 'First Name',
            lastName: 'Last Name',
            accountId: 'Account ID',
            email: 'Email',
            username: 'Username',
            password: 'Password',
            confirm: 'Confirm',
            title: 'Title',
            company: 'Company',
            error: 'Error',
            signUp: 'Sign Up',
            signIn: 'Sign In',
            rememberMe: 'Remember Me',
            signOutSuccess: 'You' + String.fromCharCode(39) + 've been signed out.',
            //upload page 
            'upload.addVideoUrl': 'Add Video URL',
            'upload.optionalTitle': 'Optional Title',
            //navigation bar 
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
            'error.unableToSignIn': 'Unable to Login',
            //copy + marketing 
            'copy.processingTime': 'The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.',
            'copy.agreeTerms': 'I agree with the Neon'+ String.fromCharCode(39) + 's <a href="@link">Terms and Conditions</a> of use.',
            'copy.slideOne': 'Thank you for uploading your video to Neon. We are scanning it now to determine the top 5  most "clickable" thumbnails.',
            'copy.slideTwo': 'Please be patient. Scanning takes place in real time, so a 10 minute video will take approximately 10 minutes to scan.',
            'copy.slideThree': 'When complete, your thumbnails will appear below. If you don&rsquo;t want to wait, you can exit this page without interrupting the process and come back later to view the results.',
            'copy.copyRight': String.fromCharCode(169) + ' 2016 Neon Labs, Inc. All rights reserved.',
            'copy.newsFlashMessage': 'Note: Please be aware this is a V2 DEMO only and should not be shared yet. Thank you. Neon.',
            'copy.PreviousLabel': 'Previous',
            'copy.NextLabel': 'Next',
            //image processing stages 
            'copy.unknownState': 'unknown',
            'copy.processingState': 'processing',
            'copy.processedState': 'processed',
            'copy.servingState': 'serving',
            'copy.failedState': 'failed'
        },
        'en-GB': {
            firstName: 'Forename',
            'copy.newsFlashMessage': 'FOGGY DIES SPOILER SPOILER WOLVERINE MARRIES KAREN !!! DAREDEVIL LOSES THE LEASE ON HIS APPARTMENT',
            'copy.agreeTerms': 'Here is a link <a href="@link">TERMS</a> for you to click.',
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
