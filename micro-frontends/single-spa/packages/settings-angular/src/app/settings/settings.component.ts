import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @Input()
  set settings(val: Settings) {
    this.displayCosts = val?.displayCosts;
    this.minCostValue = +val?.minCostValue! || undefined;
    this.costSortOrder = val?.costSortOrder || '';
  }

  @Input()
  minCostValue?: number;

  @Input()
  displayCosts?: boolean;

  @Input()
  costSortOrder?: string = '';

  @Output()
  readonly settingsChange = new EventEmitter<Settings>();

  onChangeSettings(change: Settings) {
    const newSettings = {
      displayCosts: this.displayCosts,
      minCostValue: this.minCostValue,
      costSortOrder: this.costSortOrder as Settings['costSortOrder'],
      ...change
    };
    console.log('onChangeSettings', change);
    this.settingsChange.emit(newSettings);
  }
}
