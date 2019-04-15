import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { CanActivate, 
		 ActivatedRouteSnapshot, 
		 RouterStateSnapshot, 
		 Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ImadminGuard implements CanActivate{

  constructor(
  	private router : Router,
  	private auth: AuthServiceService
  	) { }
  canActivate(
  	route: ActivatedRouteSnapshot,
  	state: RouterStateSnapshot
  ): boolean {

  	if(this.auth.isAutenticado()){
  		let user:any = this.auth.getUser();
  		if(user.admim == 'true'){
  			return true;
  		} else {
  			this.router.navigate(['cardapio']);
  			return false;
  		}
  	} else {
  		this.router.navigate(['']);
  		return false;
  	}
  }
}
