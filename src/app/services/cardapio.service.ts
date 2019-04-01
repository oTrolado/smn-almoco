import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) { }

  listar(){
  	console.log("Lintando os cardapios");
	return this.http.get('http://cardapio-smn.herokuapp.com/carcapio/');

  }

  alterar(cardapio: any){
  		console.log("Editando cardapio");
		return this.http.put('http://cardapio-smn.herokuapp.com/carcapio/' + cardapio.id, cardapio);  	
  }
}
