// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var lang = navigator.language.toLowerCase() || window.navigator.language.toLowerCase();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let t = {
		form: function(word) {
		if (lang === 'en-us') {
			return this[word][lang]
		} else {
			return word

		}
	},
	"Sign Up": {
		"en-us": "Regístrate"
	},
	"First Name": {
		"en-us": "Nombre de Pila"
	},
	"Last Name": {
		"en-us": "Apellido"
	},
	"Email": {
		"en-us": "Correo Electrónico"
	},
	"Password": {
		"en-us": "Contraseña"
	},
	"Confirm": {
		"en-us": "Confirmar"
	},
	"Title": {
		"en-us": "Título"
	},
	"Company": {
		"en-us": "Empresa"
	} 

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
