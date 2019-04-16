import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) { }

  listar(){
	return this.http.get('http://cardapio-smn.herokuapp.com/cardapio/');

  }

  alterar(cardapio: any){
  		console.log(cardapio);
		return this.http.put('http://cardapio-smn.herokuapp.com/cardapio/', cardapio);  	
  }
}
