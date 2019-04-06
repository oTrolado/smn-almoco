import { Component, OnInit } from '@angular/core';
import { CardapioService } from '../../services/cardapio.service';
import { AuthServiceService } from './../../services/auth-service.service';
import { TrocaService } from './../../services/troca.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  constructor(
  	private cardServ: CardapioService,
  	private authServ: AuthServiceService,
  	private trocaServ: TrocaService,
  	private snack: MatSnackBar
  	) { }

  public cardapios: any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
  private usuario: any = this.authServ.getUser();

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
  	let retorno: any;
  	console.log(this.cardapios);
  	this.cardapios.map((cardapio) =>{
  		if(cardapio.check == true){
  			
  			let troca: any = {
  				user: this.usuario._id,
  				cardapio: cardapio._id,
  				pratoPrincipal: "desistiu"
  			};

  			retorno = this.trocaServ.trocar(troca);


  		} else if( cardapio.escolha != cardapio.pratoPrincipal){
  			
  			let troca: any = {
  				user: this.usuario._id,
  				cardapio: cardapio._id,
  				pratoPrincipal: cardapio.escolha
  			}; 
  			retorno = this.trocaServ.trocar(troca);

  		} else { return }

  		retorno.subscribe(res => {
  			console.log(cardapio.nome_dia_da_semana + ' atualisado');
  		},
  		erro => {
  			console.log(erro);
  			if(erro.status == 201){
  				console.log(cardapio.nome_dia_da_semana + ' atualisado');		
  			} else {
  				this.snack.open('Erro ao atualizar ' + cardapio.nome_dia_da_semana, 'Fechar', { duration: 3000 });
  			}		
  		});
  	});
  }
}
