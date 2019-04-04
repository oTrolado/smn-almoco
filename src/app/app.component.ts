import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SMN';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthServiceService, ){  }

  ngOnInit(){
  	this.authService.mostrarMenuEmitter.subscribe(
  		res => this.mostrarMenu = res
	);
  }
}
