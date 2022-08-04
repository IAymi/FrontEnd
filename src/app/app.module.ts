import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ExchangeRatesModule } from './dashboard/exchange-rates/exchange-rates.module';
import { AddProjectComponent } from './project-page/add-project/add-project.component';
// import { ExchangeRatesComponent } from './dashboard/exchange-rates/exchange-rates.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuBarComponent,
    DashboardComponent,
    ProjectPageComponent,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExchangeRatesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
