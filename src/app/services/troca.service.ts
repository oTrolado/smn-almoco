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
  	console.log('atualizar');
  	return this.http.put('http://cardapio-smn.herokuapp.com/troca/', troca);
  }


  listar(user){
  	return this.http.post('http://cardapio-smn.herokuapp.com/troca/user', user);	
  	console.log('listar');
  }

  listarTodos(){
    return this.http.get('http://cardapio-smn.herokuapp.com/troca/');
  }

  trocar(troca: any, trocas:any){

  	let check:boolean = false;
  		console.log('trocar ' + trocas)

  		let pedidos = trocas;
  		console.log(pedidos);
  		pedidos.map(pedido => {
  			if(pedido.cardapio == troca.cardapio){
  				console.log('Atualizar');
  				check = true;
  				troca = {
  					...troca,
  					_id: pedido._id
  				}
  			} 
  		});
  		if(check == false){
  			console.log('Criar')
  			return this.criar(troca);
  			
  		} else {
  			console.log(troca);
  			return this.atualizar(troca);
  		}
  
  }
  
}
