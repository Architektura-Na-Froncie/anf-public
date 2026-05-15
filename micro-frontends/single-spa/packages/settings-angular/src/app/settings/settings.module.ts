import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SettingsComponent } from "./settings.component";
import { PanelModule } from "../panel/panel.module";


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
}
