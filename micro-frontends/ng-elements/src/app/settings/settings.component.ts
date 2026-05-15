import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  // Mapowanie atrybutów webcomponentu na inputy angularowe - input o nazwie
  // w postaci camel-case jest mapowany na atrybut dash-case:
  // @Input() inputValue będzie odpowiadał atrybutowi input-value
  @Input()
  set minCostValue(val: string | number | undefined) {
    this._minCostValue = +val! || undefined;

    // 🔥 Po każdej zmianie atrybutu webcomponentu trzeba wymusić detekcję zmian, w przeciwnym
    // razie angular w trybie developerskim rzuca ExpressionChangedAfterItHasBeenCheckedError.
    // Powiązany issue: https://github.com/angular/angular/issues/30207
    // W skrócie:
    // input-value="234" działa ok - błąd nie jest rzucany, input jest ustawiany
    // [inputValue]="234", [attr.input-value]="256", inputValue="{{ 256 }}" - we wszystkich
    // przypadkach rzucany jest błąd, przy czym wartość inputu jest ustawiany poprawnie.
    this.cdRef.detectChanges();
  }
  get minCostValue() { return this._minCostValue; };
  private _minCostValue?: number;

  @Input()
  set displayCosts(val: string | boolean | undefined) {
    // Pamiętaj że inputy mogą być przekazana zarówno jako string (przez atrybuty)
    // jak i bezpośrednio (przez property webcomponentu). Obie sytuacje trzeba obsłużyć
    if (val === 'false' || val === '0') {
      val = false;
    }
    this._displayCosts = !!val;
    this.cdRef.detectChanges();
  }
  get displayCosts() { return this._displayCosts };
  private _displayCosts: boolean = false;

  @Input()
  set costSortOrder(val: string | undefined) {
    this._costSortOrder = val as Settings['costSortOrder'] || '';
    this.cdRef.detectChanges();
  }
  get costSortOrder() { return this._costSortOrder };
  private _costSortOrder?: string = '';

  @Output()
  readonly settingsChange = new EventEmitter<Settings>();

  constructor(
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  onChangeSettings(change: Settings) {
    const newSettings = {
      displayCosts: this._displayCosts,
      minCostValue: this._minCostValue,
      costSortOrder: this._costSortOrder as Settings['costSortOrder'],
      ...change
    };
    this.settingsChange.emit(newSettings);
  }
}
