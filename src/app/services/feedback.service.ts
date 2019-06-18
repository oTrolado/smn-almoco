import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(
  	private http: HttpClient
  	) { }

  salvar(sugestao: any){
  	return this.http.post('http://gaia-smn.herokuapp.com/feedback', sugestao);
  }

  listar(){
  	return this.http.get('http://gaia-smn.herokuapp.com/feedback');
  }

  deletar(id: String){
  	return this.http.delete('http://gaia-smn.herokuapp.com/feedback' + id);
  }
}
