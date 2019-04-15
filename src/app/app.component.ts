import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';
import { ProgressService } from './services/progress.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SMN';
  progress: boolean = false;
  mostrarMenu: boolean = false;
  admin: boolean = false;
  usuario: any = {};

  constructor(
    private authService: AuthServiceService, 
    private authIn: AuthInComponent,
    private progressServ: ProgressService    
    ){  }

  ngOnInit(){
  	this.authService.mostrarMenuEmitter.subscribe(
  		res => {
        this.mostrarMenu = res;
        this.usuario = this.authService.getUser();
      }
	  );
    this.progressServ.progressEmitter.subscribe(res => {
      this.progress = res;
    });


  }

  logOut(){
    this.authIn.logOut();
  }

}
