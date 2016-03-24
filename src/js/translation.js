// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//TODO : add a seperate file for the Dictionary
//TODO : Later rebuild with following pattern: https://mattstauffer.co/blog/taking-control-of-your-javascript-objects-with-the-revealing-module-pattern 
var dictionary = { 	
		// set in ed's language for testing 
		'en-GB': {
			firstName: 'Notice',
			email: 'How',
			confirm: 'some translations',
			company: 'default to en-us'  		
		},
		'en-US': {
			signUp: 'Sign up',
			firstName: 'First Name',
			lastName: 'Last Name',
			email: 'Email',
			password: 'Password',
			confirm: 'Confirm',
			title: 'Title',
			company: 'Company'  		
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
	get: function (argument) {
		return strings[argument] || '[UNKNOWN]';
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
