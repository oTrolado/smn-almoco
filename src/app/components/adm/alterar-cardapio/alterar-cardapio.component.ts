import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CardapioService } from './../../../services/cardapio.service';
import { ProgressService } from './../../../services/progress.service';

@Component({
  selector: 'app-alterar-cardapio',
  templateUrl: './alterar-cardapio.component.html',
  styleUrls: ['./alterar-cardapio.component.css']
})
export class AlterarCardapioComponent implements OnInit {
  private cardapios:any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];


  constructor(
  	private cardapioS: CardapioService,
  	private progress: ProgressService,
  	private snack: MatSnackBar
  ) { }

  ngOnInit() {
  	this.progress.onProgress();
  	let retorno: any = this.cardapioS.listar();
  	retorno.subscribe(res => {
  		this.cardapios = res;
  		this.progress.offProgress();
  		this.cardapios = this.cardapios.map(cardapio => ({
  			...cardapio,
  			nome_dia_da_semana: this.dias[new Date(cardapio.data).getDay()]
  		}));
  	}, erro =>{
  		console.log(erro);
  		this.progress.offProgress();
  	});
  }

  confirma(cardapio:any){
  	this.progress.onProgress();
  	let retorno: any = this.cardapioS.alterar(cardapio);
  	retorno.subscribe(res => {
  		this.progress.offProgress();
  		this.snack.open('Cardápio da '+ cardapio.nome_dia_da_semana +' atualizado', 'Fechar', { duration: 3000 });
  	}, erro => {
  		console.log(erro);
  	});
  }
}
