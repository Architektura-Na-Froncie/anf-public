import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { createCustomElement } from '@angular/elements';

import { SettingsComponent } from "./settings.component";
import { PanelModule } from "../components/panel/panel.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule {
  constructor(injector: Injector) {
    const customSettings = createCustomElement(SettingsComponent, { injector: injector });
    customElements.define('app-settings', customSettings);
  }
}
