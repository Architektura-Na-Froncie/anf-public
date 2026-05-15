import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeesModule } from './employees/employees.module';

import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SettingsModule,
    EmployeesModule,
  ],
  entryComponents: [
    SettingsComponent,
    EmployeesComponent,
  ],
  providers: [],
})
export class AppModule {
  ngDoBootstrap(): void {
  }
}
