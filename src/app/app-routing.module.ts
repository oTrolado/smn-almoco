import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';

import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';


const routes: Routes = [
	{ path: '', component: AuthInComponent },
	{ path: 'cardapio', component: CardapioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 