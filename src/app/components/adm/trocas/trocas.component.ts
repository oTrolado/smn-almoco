import { Component, OnInit } from '@angular/core';
import { CardapioService } from './../../../services/cardapio.service';
import { TrocaService } from './../../../services/troca.service';

@Component({
  selector: 'app-trocas',
  templateUrl: './trocas.component.html',
  styleUrls: ['./trocas.component.css']
})
export class TrocasComponent implements OnInit {

  constructor(
  	private cardapioS: CardapioService,
  	private trocaS: TrocaService
  ) { }

  private cardapios: any = {};
  private trocas: any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];


  ngOnInit() {
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
  	}, erro => {
  		console.log(erro);
  	});
  }

  filtrar(cardapio, troca, opcao){
  	if(troca.cardapio._id == cardapio._id){
		if(troca.pratoPrincipal == opcao){
			return true;
		}		
  	} return false;
  }

}
