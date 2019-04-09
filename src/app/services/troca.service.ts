import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrocaService {

  constructor(private http: HttpClient) { }

  criar(troca: any){
  	console.log(troca);	
  	return this.http.post('http://cardapio-smn.herokuapp.com/troca/', troca);
 
  }

  atualizar(troca: any){
  	return this.http.put('http://cardapio-smn.herokuapp.com/troca/' + troca._id, troca);
  }


  listar(id: String){
  	return this.http.get('http://cardapio-smn.herokuapp.com/troca/' + id);	
  }

  trocar(troca: any){
  	let retorno:any = this.listar(troca.user);
  	let check:boolean = false;

  	retorno.subscribe(res => {
  		let pedidos = res;
  		pedidos.map(pedido => {
  			if(pedido.cardapio._id == troca.cardapio){
  				check = true;
  				return this.atualizar(troca);
  			}
  		});
  		if(check == false){
  			return this.criar(troca);
  		}
  	}, erro => {
  		console.log(erro);
  		return erro;
  	});
  }
  
}
