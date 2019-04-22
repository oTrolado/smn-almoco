import { Component, OnInit } from '@angular/core';
import { CardapioService } from './../../../services/cardapio.service';
import { TrocaService } from './../../../services/troca.service';
import { ProgressService } from './../../../services/progress.service';

@Component({
  selector: 'app-trocas',
  templateUrl: './trocas.component.html',
  styleUrls: ['./trocas.component.css']
})
export class TrocasComponent implements OnInit {

  constructor(
  	private cardapioS: CardapioService,
  	private trocaS: TrocaService,
  	private progress: ProgressService
  ) { }

  private cardapios: any = {};
  private trocas: any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];


  ngOnInit() {
  	this.progress.onProgress();
  	let retornoCardapios: any = this.cardapioS.listar();
  	retornoCardapios.subscribe(res => {
  		this.cardapios = res;
  		this.cardapios = this.cardapios.map(cardapio => ({
  			...cardapio,
  			nome_dia_da_semana: this.dias[new Date(cardapio.data).getDay()]
  		}))
  		console.log(this.cardapios);
  	}, erro => {
  		console.log(erro);
  	});

  	let retornoTrocas: any = this.trocaS.listarTodos();
  	retornoTrocas.subscribe(res => {
  		this.trocas = res;
  		console.log(this.trocas);
  		this.progress.offProgress();
  	}, erro => {
  		console.log(erro);
  		this.progress.offProgress();
  	});
  }

  trocaFiltro(id){
  	return this.trocas.filter( troca => troca.cardapio._id === id);
  }

}
