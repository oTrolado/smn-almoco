import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
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

    usuario: any = {};

    ngOnInit() {
        if (localStorage.gaiasmnUser) {
            this.usuario = JSON.parse(localStorage.gaiasmnUser);
            this.snack.open('Logado com sucesso ' + this.usuario.nome, 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
            this.serv.validar(true, this.usuario);
            this.router.navigate(['cardapio']);
        }
    }

    preenchido(value) {
        if (value != '' && value != null) {
            return true;
        }
        return false;
    }

    validaLogin() {
        if (this.preenchido(this.usuario.user)) {
            if (this.preenchido(this.usuario.senha)) {
                this.snack.open('Logando... ;)', 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
                return true;
            }
            this.snack.open('Você não preencheu a senha :(', 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
            return false;
        }
        this.snack.open('Você não preencheu seu usuario :(', 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
        return false;
    }


    login() {
        if (this.validaLogin()) {
            this.progress.onProgress();
            let retorno: any;
            retorno = this.serv.logar(this.usuario);
            retorno.subscribe(res => {
                this.usuario = res;
                this.usuario.senha = undefined;
                this.progress.offProgress();
                this.snack.open('Logado com sucesso ' + this.usuario.nome, 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
                this.serv.validar(true, this.usuario);
                this.progress.offProgress();
                localStorage.setItem('gaiasmnUser', JSON.stringify(this.usuario));
                this.router.navigate(['cardapio']);
            },
                erro => {
                    this.progress.offProgress();
                    this.snack.open('Erro tente de novo mais tarde', 'Fechar', { duration: 3000, panelClass: ['default-snackbar'] });
                    console.error(erro);
                    this.usuario.senha = "";
                }
            );

        }
    }

    public getUsuario() {
        return this.usuario;
    }

    public logOut() {
        this.usuario = {};
        this.serv.validar(false, this.usuario);
        localStorage.removeItem('gaiasmnUser');
        this.router.navigate(['']);
    }

}
