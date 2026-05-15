import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';

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
    { provide: APP_BASE_HREF, useValue: "/settings-angular" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
