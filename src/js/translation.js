// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//polly fill for older browsers and the assing method for line 64 
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}
//TODO : add a seperate file for the Dictionary 
var dictionary = { 	
		// set in ed's language for testing 
		'en-GB': {
			'firstName':'Notice',
			'email':'How',
			'confirm':'some translations',
			'company':'default to en-us'  		
		},
		'en-US': {
			'signUp': 'Sign up',
			'firstName':'First Name',
			'lastName':'Last Name',
			'email':'Email',
			'password':'Password',
			'confirm':'Confirm',
			'title':'Title',
			'company':'Company'  		
		},
		"es-MX": {
			'signUp': 'Regístrate',
			'firstName':'Nombre de Pila',
			'lastName':'Apellido',
			'email':'Correo Electrónico',
			'password':'Contraseña',
			'confirm':'Confirmar',
			'title':'Título',
			'company':'Empresa' 
		}
	}

//define the local language via the navigator 
var locale = navigator.language.split('-')
locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language

//create and object of translation
//if anything is not found it will default to english US

var strings = dictionary[locale] ? dictionary[locale] : dictionary['en-US']
strings = Object.assign(dictionary['en-US'], strings);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

let t = {
	form: function (argument) {
		return strings[argument]
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
