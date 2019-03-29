import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { 
  	
  }

  private autenticado: boolean = false;

  	logar(user: String, usuario){
  		console.log('logar', usuario);
  		return this.http.post('http://localhost:3000/usuario/' + user, {usuario});
  		
  	}
  	
 
  	cadastrar(usuario){
  		console.log('cadastrar', usuario);
  		return this.http.post('http://localhost:3000/usuario/', usuario);

  	} 

  	validar(logado: boolean){
  		console.log("Logado = " + logado);
  		this.autenticado = logado;
	}

	isAutenticado(){
		return this.autenticado;
	}
}