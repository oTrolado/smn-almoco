import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './../../../services/feedback.service';
import { ProgressService } from './../../../services/progress.service';


@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  constructor(
  	private feedbackS: FeedbackService,
  	private progress: ProgressService
  	) { }

  feedbacks: any = {};

  ngOnInit() {
  	this.progress.onProgress();
  	let retorno: any = this.feedbackS.listar();
  	retorno.subscribe(res => {
  		this.feedbacks = res;
  		console.log(this.feedbacks);
  		this.progress.offProgress();
  	}, erro => {
  		console.log(erro);
  		this.progress.offProgress();
  	});
  }

  filtrar(feedback, tipo){
  	if(feedback.tipo == tipo){
  		return true;
  	} return false;
  }

  contador(tipo){
  	let contador:number = this.feedbacks.filter(feedback => feedback.tipo == tipo).length
  	return contador;
  }
}
