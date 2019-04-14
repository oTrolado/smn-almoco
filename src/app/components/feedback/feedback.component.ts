import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './../../services/feedback.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private sugestao: any = {};
  
  constructor(private feedServ: FeedbackService, private snack: MatSnackBar) { }

  ngOnInit() {
  }

  enviar(){
  	let retorno:any = this.feedServ.salvar(this.sugestao);
  	retorno.subscribe(res => {
  		this.snack.open('Agredecemos seu feedback ;)', 'Fechar', { duration: 3000 });

  	}, erro => {
  		if(erro.status == 201){
  			this.snack.open('Agredecemos seu feedback ;)', 'Fechar', { duration: 3000 });
  		} else{
  			this.snack.open('Aconteceu algum erro com a conexão ;)', 'Fechar', { duration: 3000 });
  		}
  	})
  }

}
