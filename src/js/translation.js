// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var lang = navigator.language.toLowerCase();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let t = {
		form: function(word) {
		if (lang === "en-gb") {
			return word
		} else {
			return this[lang][word]
		}
	},
	//left this translation so you could test it.
	"en-us":{
		"Sign Up": "Regístrate",
		"First Name": "Nombre de Pila",
		"Last Name": "Apellido",
		"Email":"Correo Electrónico",
		"Password": "Contraseña",
		"Confirm":"Confirmar",
		"Title": "Título",
		"Company":"Empresa"
	},
	"es-mx":{
		"Sign Up": "Regístrate",
		"First Name": "Nombre de Pila",
		"Last Name": "Apellido",
		"Email":"Correo Electrónico",
		"Password": "Contraseña",
		"Confirm":"Confirmar",
		"Title": "Título",
		"Company":"Empresa"
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default t;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -