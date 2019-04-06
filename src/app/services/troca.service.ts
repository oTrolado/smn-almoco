import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrocaService {

  constructor(private http: HttpClient) { }

  trocar(troca: any){
  	console.log(troca);	
  	return this.http.post('http://cardapio-smn.herokuapp.com/troca/', troca);
  }
  
}
