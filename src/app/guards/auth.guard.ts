import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
  	private authService : AuthServiceService,
  	private router : Router
  	) { }


  canActivate(
  	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
	) :  boolean {

  	if(this.authService.isAutenticado()){
  		return true;
  	}

  	this.router.navigate(['']);

  	return false;

  }
}
