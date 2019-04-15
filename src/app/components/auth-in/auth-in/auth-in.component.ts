import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProgressService } from '../../../services/progress.service';


@Component({
  selector: 'app-auth-in',
  templateUrl: './auth-in.component.html',
  styleUrls: ['./auth-in.component.css']
})
export class AuthInComponent implements OnInit {

  constructor(
  	private serv: AuthServiceService,
  	private snack: MatSnackBar,
  	private router: Router,
  	private progress: ProgressService
  	) { }

  private usuario: any = {};

  ngOnInit() {
 
  }

  preenchido(value) {
		if (value != '' && value != null) {
			return true;
		}
		return false;
	}

	isEmail(value) {
	  if (!/@/g.test(value)){
	    return false;
	  }
	  return true;
	};

  validaLogin() {
  	if(this.preenchido(this.usuario.user)){
  		if(this.preenchido(this.usuario.senha)){
  			this.snack.open('Logando... ;)', 'Fechar', { duration: 3000 });
  			return true;
  		}
  		this.snack.open('Você não preencheu a senha :(', 'Fechar', { duration: 3000 });
  		return false;
  	}
  	this.snack.open('Você não preencheu seu usuario :(', 'Fechar', { duration: 3000 });
  	return false;
  }

  validaCadastro(){
  	if(this.preenchido(this.usuario.user)){
	  	if(this.preenchido(this.usuario.nome)){
	  		if(this.preenchido(this.usuario.senha)){
	  			if(this.preenchido(this.usuario.user)){
	  				if(this.isEmail(this.usuario.email)){
	  					if(this.preenchido(this.usuario.senha)){
	  						if(this.preenchido(this.usuario.confirma) && 
	  						   this.usuario.confirma == this.usuario.senha){
	  							this.snack.open('Cadastrando... :)', 'Fechar', { duration: 3000 });
	  							return true;
	  						} 
	  						this.snack.open('Confirme a senha por favor ;)', 'Fechar', { duration: 3000 });
	  						return false;
	  					}
	  					this.snack.open('Você não fica seguro sem senha :(', 'Fechar', { duration: 3000 });
	  					return false;
	  				}
	  				this.snack.open('Coloque um email valido ;)', 'Fechar', { duration: 3000 });
	  				return false;
	  			}
	  			this.snack.open('Você não preencheu o email :(', 'Fechar', { duration: 3000 });
	  			return false;
	  		}
	  		this.snack.open('Você não preencheu a senha :(', 'Fechar', { duration: 3000 });
	  		return false;
	  	}
	  	this.snack.open('Hey qual seu nome???', 'Fechar', { duration: 3000 });
	  	return false;
  	}
  	this.snack.open('Você não preencheu seu usuario :(', 'Fechar', { duration: 3000 });
  	return false;	
  }
 
  login() {
  		if(this.validaLogin()){
  			this.progress.onProgress();
  			let retorno: any;
  			retorno = this.serv.logar(this.usuario);
  			retorno.subscribe(res => {
  					this.usuario = res;
  					this.progress.offProgress();
  					this.snack.open('Logado com sucesso ' + this.usuario.nome, 'Fechar', { duration: 3000 });
  					this.serv.validar(true, this.usuario);
  					this.progress.offProgress();	
  					this.router.navigate(['cardapio']);
  				}, 
  				erro => { 
  					this.progress.offProgress();
  					this.snack.open('Erro tente de novo mais tarde', 'Fechar', { duration: 3000 });
  					console.error(erro);
  					this.usuario.senha = "";
  				}
  			);

  		}   		
	}
 
	singin() {
		
		if (this.validaCadastro()){

			this.progress.onProgress();
			let retorno: any = this.serv.cadastrar(this.usuario);
			retorno.subscribe(res => {
					this.progress.offProgress();
					this.snack.open('Agora você esta cadastrado :)' + this.usuario.nome, 'Fechar', { duration: 3000 });
					this.login();
				},
				erro => {
					if(erro.status == 201){
						this.progress.offProgress();
						this.snack.open('Agora você esta cadastrado :)' + this.usuario.nome, 'Fechar', { duration: 3000 });
						this.login();
					} else {
						this.progress.offProgress();
						this.snack.open('Erro tente de novo mais tarde :(', 'Fechar', { duration: 3000 });						
					}

				}
			);
	  			
		}
	}

	public getUsuario(){
		return this.usuario;
	}

	public logOut(){
		this.usuario = {};
		this.serv.validar(false, this.usuario);	
		this.router.navigate(['']);
	}
 
}
