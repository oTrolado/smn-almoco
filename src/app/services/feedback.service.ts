import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(
  	private http: HttpClient
  	) { }

  salvar(sugestao){
  	return this.http.post('cardapio-smn.herokuapp.com/sugestao', sugestao);
  }

  listar(){
  	return this.http.get('cardapio-smn.herokuapp.com/sugestao');
  }

  deletar(id: String){
  	return this.http.delete('cardapio-smn.herokuapp.com/sugestao' + id);
  }
}
