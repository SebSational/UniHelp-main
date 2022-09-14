const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
	nombres: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
	usuario: false,
	nombres: false,
	apellidos: false,
	email: false,
	contraseña: false
}

const validarformulario = (e) => {
	switch(e.target.name){
		case "username":
			validar(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombres":
			validar(expresiones.nombres, e.target, 'nombres');
		break;
		case "apellidos":
			validar(expresiones.nombres, e.target, 'apellidos');
		break;
		case "email":
			validar(expresiones.correo, e.target, 'email');
		break;
		case "contraseña":
			validar(expresiones.password, e.target, 'contraseña');
			validarPassword();
		break;
		case "contraseña2":
			validarPassword();
		break;
	}

}
const validar = (exp,input,id) =>{
	if(exp.test(input.value)){
		document.getElementById(`${id}`).classList.remove('controls_incorrecto');
		document.getElementById(`${id}Error`).classList.remove('activarMensaje');
		document.getElementById(`${id}Error`).classList.add('error');
		campos[id]=true;
	}else{
		document.getElementById(`${id}`).classList.add('controls_incorrecto');
		document.getElementById(`${id}Error`).classList.add('activarMensaje');
		document.getElementById(`${id}Error`).classList.remove('error');
		campos[id]=false;
	}
}
const validarPassword =() =>{
	const inputPassword = document.getElementById('contraseña') 
	const inputPassword2 = document.getElementById('contraseña2') 
	if(inputPassword.value!==inputPassword2.value){
		document.getElementById('contraseña2').classList.add('controls_incorrecto');
		document.getElementById('contraseña2Error').classList.add('activarMensaje');
		document.getElementById('contraseña2Error').classList.remove('error');
		campos['contraseña']=false;
	}else{
		document.getElementById('contraseña2').classList.remove('controls_incorrecto');
		document.getElementById('contraseña2Error').classList.remove('activarMensaje');
		document.getElementById('contraseña2Error').classList.add('error');
		campos['contraseña']=true;
	}

}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarformulario);
	input.addEventListener('blur', validarformulario);
})

formulario.addEventListener('submit',(e) => {
	const term = document.getElementById('term')
	if(campos.usuario && campos.nombres && campos.apellidos && campos.email && campos.contraseña && term.checked){
		formulario.reset();
		document.getElementById('correcto').classList.add('activarMensajeCorrecto');
	}
	else{
		document.getElementById('incorrecto').classList.add('activarMensaje');
	}
	e.preventDefault();
})
