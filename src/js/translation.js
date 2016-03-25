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
            email: 'Email',
            password: 'Password',
            confirm: 'Confirm',
            title: 'Title',
            company: 'Company',
            error: 'Error',
            passwordFormatInvalid: 'Passwords must be 6 Characters and include one number, one lowercase and one uppercase letter.',
            passwordMatchInvalid: 'Password does not match the confirm password.'
        },
        'en-GB': {
            firstName: 'Forename'
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
    let locale = navigator.language.split('-');
    locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
    return locale;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function _getTranslations() {
    return Object.assign(_TRANSLATIONS[_DEFAULT_LOCALE], _TRANSLATIONS[_LOCALE]);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

let t = {
    get: function(key) {
        return _DICTIONARY[key] || _UNKNOWN_STRING;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
