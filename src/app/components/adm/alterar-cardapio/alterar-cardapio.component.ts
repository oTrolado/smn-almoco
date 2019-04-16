import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CardapioService } from './../../../services/cardapio.service';
import { ProgressService } from './../../../services/progress.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
//Object.keys(obj).filter(item => obj[item] == "")

@Component({
  selector: 'app-alterar-cardapio',
  templateUrl: './alterar-cardapio.component.html',
  styleUrls: ['./alterar-cardapio.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-br'}]
})
export class AlterarCardapioComponent implements OnInit {
  private cardapios:any = {};
  private dias: any = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];


  constructor(
  	private cardapioS: CardapioService,
  	private progress: ProgressService,
	private snack: MatSnackBar,
	private adapter: DateAdapter<any>  
	) { }

  ngOnInit() {
	this.adapter.setLocale('pt-br');
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
	let teste: boolean = true;
	console.log(cardapio);
	if(cardapio.nome_dia_da_semana == this.dias[new Date(cardapio.data).getDay()]){
		
		Object.keys(cardapio).filter(item => cardapio[item] === '').map(item => {
			teste = false;
			console.log(item);
			this.snack.open(item + ' está vazio', 'Fechar', { duration: 3000 })
		});

		if(teste){
			this.progress.onProgress();
			let retorno: any = this.cardapioS.alterar(cardapio);
			retorno.subscribe(res => {
				this.progress.offProgress();
				this.snack.open('Cardápio da '+ cardapio.nome_dia_da_semana +' atualizado', 'Fechar', { duration: 3000 });
			}, erro => {
				this.progress.offProgress();
				console.log(erro);
			});
		}
	} else {
		this.snack.open('A data não é uma '+ cardapio.nome_dia_da_semana, 'Fechar', { duration: 3000 });
	}
  }
}
