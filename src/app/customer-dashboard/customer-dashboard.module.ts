import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { SpinWinComponent } from './spin-win/scratch-win.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    SpinWinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    CustomerDashboardComponent
  ]
})
export class CustomerDashboardModule { }
