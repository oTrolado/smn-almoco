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
  	}, erro => {
  		console.log(erro);
  	});

  	let retornoTrocas: any = this.trocaS.listarTodos();
  	retornoTrocas.subscribe(res => {
  		this.trocas = res;
  		this.progress.offProgress();
  	}, erro => {
  		console.log(erro);
  		this.progress.offProgress();
  	});
  }

  trocaFiltro(id){
  	return this.trocas.filter( troca => troca.cardapio._id === id);
  }

  contador(cardapio, opcao){
  	let contador: number = this.trocas.filter(troca => troca.cardapio._id == cardapio._id && troca.pratoPrincipal == opcao).length;
  	return contador;
  }

}
