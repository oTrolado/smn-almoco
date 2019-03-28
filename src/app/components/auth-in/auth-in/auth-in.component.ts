import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-auth-in',
  templateUrl: './auth-in.component.html',
  styleUrls: ['./auth-in.component.css']
})
export class AuthInComponent implements OnInit {

  constructor(
  	private serv: AuthServiceService,
  	private snack: MatSnackBar
  	) { }

  public usuario: any = {};
  public logado:boolean = false;

  ngOnInit() {
 
  }
 
  login() {
  		if(this.usuario.user != "" &&
  			this.usuario.senha){

  			let retorno: any;
  			retorno = this.serv.logar(this.usuario.user, this.usuario.senha);
  			retorno.subscribe(res => {
  					this.logado = true;
  					this.usuario = res;
  					this.snack.open('Logado com sucesso ' + this.usuario.nome, 'Fechar', { duration: 2000 });
  					console.log(this.usuario);
  					console.log(res);
  				}, 
  				erro => { 
  					this.snack.open('Erro tente de novo mais tarde', 'Fechar', { duration: 2000 });
  					console.error(erro);
  				}
  			);

  		} else {
  			this.snack.open('Você não preencheu tudo :(', 'Fechar', { duration: 2000 });;
  		}
  		
	}
 
	singin() {
		
		if (this.usuario.nome != null &&
			this.usuario.user != null &&
			this.usuario.email != null &&
			this.usuario.senha != null){

			console.log('singin');

			let retorno: any =this.serv.cadastrar(this.usuario);
			retorno.subscribe(
				() => {
					this.snack.open('Agora você esta cadastrado :)' + this.usuario.nome, 'Fechar', { duration: 2000 });
					this.usuario.user = null;
					this.usuario.nome = null;
					this.usuario.senha = null;
					this.usuario.email = null;
				},
				erro => {
					this.snack.open('Erro tente de novo mais tarde', 'Fechar', { duration: 2000 });
					console.log(erro);
				}
			);
	  			
		} else {
			this.snack.open('Você não preencheu tudo :(', 'Fechar', { duration: 2000, panelClass: 'snackbar' });
		}
	}
 
}