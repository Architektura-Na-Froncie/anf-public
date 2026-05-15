import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';

import { EmployeesComponent } from "./employees.component";
import { PanelModule } from "../components/panel/panel.module";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PanelModule,
  ],
  declarations: [
    EmployeesComponent,
  ],
  exports: [
    EmployeesComponent,
  ],
})
export class EmployeesModule {
  constructor(injector: Injector) {
    const customEmployees = createCustomElement(EmployeesComponent, { injector: injector });
    customElements.define('app-employees', customEmployees);
  }
}
