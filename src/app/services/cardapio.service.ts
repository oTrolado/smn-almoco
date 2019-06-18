import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) { }

  listar(){
	return this.http.get('http://gaia-smn.herokuapp.com/cardapio/');

  }

  alterar(cardapio: any){
		return this.http.put('http://gaia-smn.herokuapp.com/cardapio/', cardapio);  	
  }
}
