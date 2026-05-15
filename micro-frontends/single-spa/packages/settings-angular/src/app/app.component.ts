import { Component, OnInit } from '@angular/core';
import { pubsub } from '@anf-mfe/pubsub';

interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  settings: Settings = {};

  private unsubscribe?: () => void;

  ngOnInit() {
    this.unsubscribe = pubsub.subscribe((event) => {
      if (event.type === 'settingsChange') {
        this.settings = { ...event.message };
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  onSettingsChange($event: Settings) {
    pubsub.notify('settingsChange', { ...this.settings, ...$event });
  }
}
