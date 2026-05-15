import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  settings = {
    displayCosts: false,
    minCostValue: 500,
    costSortOrder: undefined,
  };

  onSettingsChange(e: any) {
    console.log('onSettingsChange', e.detail);
    this.settings = { ...this.settings, ...e.detail };
  }
}
