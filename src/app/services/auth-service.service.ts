import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { 
  	
  }

  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuario: any = {};
  private autenticado: boolean = false;

  	logar(usuario){
  		return this.http.post('http://cardapio-smn.herokuapp.com/usuario/' + usuario.user, usuario);
  		
  	}
  	
 
  	cadastrar(usuario){
  		return this.http.post('http://cardapio-smn.herokuapp.com/usuario/', usuario);

  	} 

  	validar(logado: boolean, usuario){
  		this.autenticado = logado;
      if(this.autenticado == true){
        this.usuario = usuario;
        this.mostrarMenuEmitter.emit(true);
      } else {
        this.mostrarMenuEmitter.emit(false);
      }
	}

	isAutenticado(){
		return this.autenticado;
	}

  getUser(){
    return this.usuario;
  }
}