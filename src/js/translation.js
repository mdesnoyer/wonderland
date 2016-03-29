// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _DEFAULT_LOCALE = 'en-US',
    _TRANSLATIONS = {
        'en-US': {
            signUp: 'Sign Up',
            signIn: 'Sign In',
            rememberMe: 'Remember Me',
            signOut: 'Sign Out',
            signOutSuccess: 'You\'ve been signed out.',
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
            passwordFormatInvalid: 'Passwords must be 6 Characters and include one number, one lowercase and one uppercase letter.',
            passwordMatchInvalid: 'Password does not match the confirm password.',
            'copy.PreviousLabel': 'Previous',
            'copy.NextLabel': 'Next',
        },
        'en-GB': {
            firstName: 'Forename',
            'copy.PreviousLabel': 'BACK!',
            'copy.NextLabel': 'FORWARD!',
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
    get: function(key) {
        return _DICTIONARY[key] || _UNKNOWN_STRING;
    },
    getLocale: _getLocale
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default T;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
