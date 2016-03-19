var lang = navigator.language;

let t = {	
	
	// lang: "en-US",
	translatorCheck: function () {
		if (lang === "en-US") {
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
		"Confirm":"Contraseña",
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

	// signUp: {
	// 	"en":"Sign Up",
	// 	"es": "Regístrate",
	// 	"fr": "S'inscrire"
	// },
	// firstName:{
	// 	"en": "First Name",
	// 	"es": "Nombre de Pila",
	// 	"fr": "Prénom"
	// },
	// lastName:{
	// 	"en-US": "Last Name",
	// 	"es": "Apellido",
	// 	"fr": "Nom de Famille"
	// },
	// email:{
	// 	"en":"Email",
	// 	"es": "Correo Electrónico",
	// 	"fr": "Email"
	// }, 
	// password:{
	// 	"en":"Password",
	// 	"es": "Contraseña",
	// 	"fr": "Mot de Passe"
	// },
	// confirm:{
	// 	"en":"Confirm",
	// 	"es": "Contraseña",
	// 	"fr": "Confirmer"
	// },
	// title:{
	// 	"en":"Title",
	// 	"es": "Título",
	// 	"fr": "Titre"
	// },
	// company:{
	// 	"en":"Company",
	// 	"es": "Empresa",
	// 	"fr": "Compagnie"
	// }