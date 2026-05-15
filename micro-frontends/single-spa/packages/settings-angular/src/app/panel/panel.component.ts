import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  @Input()
  panelTitle: string = '';

  @Input()
  icon?: string;

  @Input()
  iconHelp?: string;

  @Input()
  iconBadge?: string;
}
