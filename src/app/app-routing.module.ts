import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards/auth.guard';
import { ImadminGuard } from './guards/imadmin.guard';
import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AlterarCardapioComponent } from './components/adm/alterar-cardapio/alterar-cardapio.component';
import { TrocasComponent } from './components/adm/trocas/trocas.component';
import { FeedbacksComponent } from './components/adm/feedbacks/feedbacks.component';
import { CadastroComponent } from './components/adm/cadastro/cadastro.component';

const routes: Routes = [
	{ path: '', component: AuthInComponent },
	{ path: 'cardapio', component: CardapioComponent, canActivate: [AuthGuard] },
	{ path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
	{ path: 'cardapios', component: AlterarCardapioComponent, canActivate: [ImadminGuard]},
	{ path: 'trocas', component: TrocasComponent, canActivate: [ImadminGuard]},
	{ path: 'feedbacks', component: FeedbacksComponent, canActivate: [ImadminGuard]},
	{ path: 'usuario', component: CadastroComponent, canActivate: [ImadminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 