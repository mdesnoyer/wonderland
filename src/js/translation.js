var lang = navigator.language.toLowerCase();

let t = {
	translatorCheck: function () {
		if (lang === "en-us") {
			this.library = "default"
		}else{
			this.library = lang
		}
	},
	library: "",
	"en-gb":{
		"Sign Up": "Regístrate",
		"First Name": "Nombre de Pila",
		"Last Name": "Apellido",
		"Email":"Correo Electrónico",
		"Password": "Contraseña",
		"Confirm":"Contraseña",
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
	},
	form: function(word) {
		if (this.library === "default") {
			return word
		}else {
			return this[this.library][word]
		}

	}
}

export default t;
