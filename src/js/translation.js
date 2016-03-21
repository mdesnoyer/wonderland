// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var lang = navigator.language.toLowerCase() || window.navigator.language.toLowerCase();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let t = {
		form: function(word) {
		if (lang === 'en-gb') {
			return this[word][lang]
		} else {
			return word

		}
	},
	"Sign Up": {
		"en-gb": "Regístrate"
	},
	"First Name": {
		"en-gb": "Nombre de Pila"
	},
	"Last Name": {
		"en-gb": "Apellido"
	},
	"Email": {
		"en-gb": "Correo Electrónico"
	},
	"Password": {
		"en-gb": "Contraseña"
	},
	"Confirm": {
		"en-gb": "Confirmar"
	},
	"Title": {
		"en-gb": "Título"
	},
	"Company": {
		"en-gb": "Empresa"
	} 

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
