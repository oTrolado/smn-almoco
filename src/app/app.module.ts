import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';

import { AuthInComponent } from './components/auth-in/auth-in/auth-in.component';
import { AuthServiceService } from './services/auth-service.service';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { AuthGuard } from './guards/auth.guard';
import { CardapioService} from './services/cardapio.service';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ImadminGuard } from './guards/imadmin.guard';
import { AlterarCardapioComponent } from './components/adm/alterar-cardapio/alterar-cardapio.component';
import { TrocasComponent } from './components/adm/trocas/trocas.component';
import { FeedbacksComponent } from './components/adm/feedbacks/feedbacks.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthInComponent,
    CardapioComponent,
    FeedbackComponent,
    AlterarCardapioComponent,
    TrocasComponent,
    FeedbacksComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatBadgeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthServiceService,
    AuthGuard,
    ImadminGuard,
    CardapioService,
    AuthInComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
