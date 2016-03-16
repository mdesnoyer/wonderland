// var lang = navigator.language;

let translator = {	
	lang: navigator.language.substring(0,2) || navigator.userLanguage.substring(0,2),
	signUp: {
		"en":"Sign Up",
		"es": "Regístrate",
		"fr": "S'inscrire"
	},
	firstName:{
		"en": "First Name",
		"es": "Nombre de Pila",
		"fr": "Prénom"
	},
	lastName:{
		"en-US": "Last Name",
		"es": "Apellido",
		"fr": "Nom de Famille"
	},
	email:{
		"en":"Email",
		"es": "Correo Electrónico",
		"fr": "Email"
	}, 
	password:{
		"en":"Password",
		"es": "Contraseña",
		"fr": "Mot de Passe"
	},
	confirm:{
		"en":"Confirm",
		"es": "Contraseña",
		"fr": "Confirmer"
	},
	title:{
		"en":"Title",
		"es": "Título",
		"fr": "Titre"
	},
	company:{
		"en":"Company",
		"es": "Empresa",
		"fr": "Compagnie"
	} 
}

export default translator; 