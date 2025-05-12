import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HotelDashboardComponent } from './hotel-dashboard/hotel-dashboard.component';
import { FlightDashboardComponent } from './flight-dashboard/flight-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    AdminDashboardComponent,
    HotelDashboardComponent,
    FlightDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    CustomerDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Chart.register(...registerables);
  }
}
