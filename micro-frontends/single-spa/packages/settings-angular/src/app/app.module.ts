import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';

declare const WEBPACK_APP_BASE_HREF: string;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SettingsModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: WEBPACK_APP_BASE_HREF },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
