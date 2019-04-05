import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SMN';

  mostrarMenu: boolean = false;
  usuario: any = {};

  constructor(
    private authService: AuthServiceService, 
    private authIn: AuthInComponent
    
    ){  }

  ngOnInit(){
  	this.authService.mostrarMenuEmitter.subscribe(
  		res => {
        this.mostrarMenu = res;
        this.usuario = this.authService.getUser();
      }
	);
  }

  logOut(){
    this.authIn.logOut();
  }
}
