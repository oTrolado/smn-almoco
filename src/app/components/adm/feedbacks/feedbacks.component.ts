import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './../../../services/feedback.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  constructor(private feedbackS: FeedbackService) { }

  private feedbacks: any = {};

  ngOnInit() {
  	let retorno: any = this.feedbackS.listar();
  	retorno.subscribe(res => {
  		this.feedbacks = res;
  		console.log(this.feedbacks);
  	}, erro => {
  		console.log(erro);
  	});
  }

  filtrar(feedback, tipo){
  	if(feedback.tipo == tipo){
  		return true;
  	} return false;
  }
}
