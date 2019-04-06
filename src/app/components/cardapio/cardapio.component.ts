import { Component, OnInit } from '@angular/core';
import { CardapioService } from '../../services/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  constructor(private cardServ: CardapioService) { }

  public cardapios: any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

  ngOnInit() {
  	this.listar();
  }

  listar(){
  	let retorno: any;
  	retorno = this.cardServ.listar();
  	retorno.subscribe( res => {
  			this.cardapios = res;

  			this.cardapios = this.cardapios.map(cardapio => ({
  				...cardapio,
  				nome_dia_da_semana: this.dias[new Date(cardapio.data).getDay()],
  				dia_da_semana: new Date(cardapio.data).getDay(),
  				data: new Date(cardapio.data).toLocaleDateString(),
  				escolha: cardapio.pratoPrincipal,
  				check: false
  			})).sort((a, b) => {
		  				if(a.dia_da_semana > b.dia_da_semana) {
		  					return 1;
		  				}
		  				if(a.dia_da_semana < b.dia_da_semana) {
		  					return -1;
		  				}
		  				return 0;
  			});
  			console.log(this.cardapios);
  		},
  		erro => {
  			console.log(erro);
		 });
  }

  confirma(){
  	console.log(this.cardapios);
  	this.cardapios.map((cardapio) =>{
  		if(cardapio.check == true){
  			console.log("Desistiu de amloçar na "+ cardapio.nome_dia_da_semana);

  		} else if( cardapio.escolha != cardapio.pratoPrincipal){
  			console.log("Realizando troca para "+ cardapio.nome_dia_da_semana);

  		}
  	});
  }
}
