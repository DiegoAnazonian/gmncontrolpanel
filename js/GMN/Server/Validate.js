/*
* Funcion validate
*
* 
*/

function valServ(_var){ //Verifica si el servidor ingresado cumple con las condiciones básicas
	if(_var.length > 7){
		if(_var.substr(0,7) == "http://"){ //Debe empezar necesariamente con http://
			return("OK");
		}else{
			return("El servidor ingresado no existe")		
		}
	}else{
		return("El campo servidor es obligatorio");
	}
}

function valPort(_port){ //Verifica si el puerto ingresado es válido, 4 digitos numericos.

	if(_port.length > 0){
		if(_port.length < 5){
			if(esNumCxC(_port) == "OK"){
				return("OK");
			}else{
				return("El puerto ingresado no existe (!= #)")		
			}
		}else{
			return("El puerto ingresado no existe (+ 4)");
		}
	}else{
		return("Ingrese un puerto");
	}
}

function valPass(_pass){ //Verifica si la pass ingresada es alfanumerica
	if(_pass.length > 0){
		if(esAlfNumCxC(_pass) == "OK"){
			return("OK");
		}else{
			return("La contraseña ingresada debe ser alfanumerica")		
		}
	}else{
		return("Ingrese una contraseña");
	}
}

function esNumCxC(_cadena){ //Es num Char x Char, llama a esNum tantas veces como chares tenga
	for(var i=0; i < _cadena.length; i++){
		if(esNum(_cadena.charAt(i)) != "OK") return(1);
	}
	return("OK");
}

function esNum(_campo){ //Verifica si el char ingresado es un número o no
	switch(_campo){
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			return("OK");
		break;
		default:
			return(1);
		break;
	}
}

function esAlfNumCxC(_cadena){ //idem esNumCxC pero llamando a esAlfNum
	for(var i=0; i < _cadena.length; i++){
		if(esAlfNum(_cadena.charAt(i).toLowerCase()) != "OK") return(1);
	}
	return("OK");
}

function esAlfNum(_campo){ //idem esNum verificando si es alfanumérico
	switch(_campo){
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case 'a':
		case 'b':
		case 'c':
		case 'd':
		case 'e':
		case 'f':
		case 'g':
		case 'h':
		case 'i':
		case 'j':
		case 'k':
		case 'l':
		case 'm':
		case 'n':
		case 'o':
		case 'p':
		case 'q':
		case 'r':
		case 's':
		case 't':
		case 'u':
		case 'v':
		case 'w':
		case 'x':
		case 'y':
		case 'z':
			return("OK");
		break;
		default:
			return(1);
		break;
	}
}