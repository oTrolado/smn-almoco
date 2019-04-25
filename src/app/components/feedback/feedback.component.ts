import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './../../services/feedback.service';
import { MatSnackBar } from '@angular/material';
import { ProgressService } from './../../services/progress.service';
import { AuthServiceService } from './../../services/auth-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  sugestao: any = {};
  usuario: any = {};

  constructor(
    private feedServ: FeedbackService, 
    private snack: MatSnackBar,
    private progress: ProgressService,
    private auth: AuthServiceService
  ) { }

  ngOnInit() {
    this.usuario = this.auth.getUser();
  }

  validar(campo){
    if(campo == undefined || campo == ""){
      return false;
    } return true;
  }

  enviar(){
    
    if(this.validar(this.sugestao.tipo)){
      if(this.validar(this.sugestao.mensagem)){
        this.progress.onProgress();
        this.sugestao.user = this.usuario._id
        let retorno:any = this.feedServ.salvar(this.sugestao);
        retorno.subscribe(res => {
          this.snack.open('Agredecemos seu feedback ;) ' + this.usuario.nome, 'Fechar', { duration: 3000 });
          this.progress.offProgress();
        }, erro => {
          if(erro.status == 201){
            this.snack.open('Agredecemos seu feedback ' + this.usuario.nome, 'Fechar', { duration: 3000 });
            this.progress.offProgress();
          } else{
            this.snack.open('Aconteceu algum erro com a conexão :(', 'Fechar', { duration: 3000 });
            this.progress.offProgress();
          }
        });
        this.sugestao = {};
      } else {
        this.snack.open('Por favor escreva algo para nós', 'Fechar', { duration: 3000 });
      }
    } else {
      this.snack.open('Por favor selecione o tipo', 'Fechar', { duration: 3000 });
    }
  }
}
