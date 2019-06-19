import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { ProgressService } from '../../../services/progress.service';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuarioNovo: any = {};

  constructor(
    private serv: AuthServiceService,
  	private snack: MatSnackBar,
  	private progress: ProgressService
  ) { }

  ngOnInit() {
  }

  isEmail(value) {
	  if (!/^[a-z\d\S._-]+@+[a-z\d\S._-]+.+[a-z\S]$/gi.test(value))
	    return false;
	  
	  return true;
  };
  
  preenchido(value) {
		if (value != '' && value != null) {
			return true;
		}
		return false;
  }
  
  validaCadastro(){
  	if(this.preenchido(this.usuarioNovo.user)){
	  	if(this.preenchido(this.usuarioNovo.nome)){
	  		if(this.preenchido(this.usuarioNovo.senha)){
	  			if(this.preenchido(this.usuarioNovo.user)){
	  				if(this.isEmail(this.usuarioNovo.email)){
	  					if(this.preenchido(this.usuarioNovo.senha)){
	  						if(this.preenchido(this.usuarioNovo.confirma) && 
	  						   this.usuarioNovo.confirma == this.usuarioNovo.senha){
	  							this.snack.open('Cadastrando... :)', 'Fechar', { duration: 3000 });
	  							return true;
	  						} 
	  						this.snack.open('Confirme a senha por favor ;)', 'Fechar', { duration: 3000 });
	  						return false;
	  					}
	  					this.snack.open('Preciso de uma senha senha :(', 'Fechar', { duration: 3000 });
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
	  	this.snack.open('Hey qual o nome???', 'Fechar', { duration: 3000 });
	  	return false;
  	}
  	this.snack.open('Você não preencheu o usuario :(', 'Fechar', { duration: 3000 });
  	return false;	
  }

  singin() {
		
		if (this.validaCadastro()){

			this.progress.onProgress();
			let retorno: any = this.serv.cadastrar(this.usuarioNovo);
			retorno.subscribe(res => {
					this.progress.offProgress();
          this.snack.open('Usuário cadastrado com sucesso :)' + this.usuarioNovo.nome, 'Fechar', { duration: 3000 });
          this.usuarioNovo = {};
				},
				erro => {
					if(erro.status == 201){
						this.progress.offProgress();
            this.snack.open('Usuário cadastrado com sucesso :)' + this.usuarioNovo.nome, 'Fechar', { duration: 3000 });
            this.usuarioNovo = {};
					} else {
						this.progress.offProgress();
						this.snack.open('Erro tente de novo mais tarde :(', 'Fechar', { duration: 3000 });						
					}

				}
			);
	  			
		}
	}

}
