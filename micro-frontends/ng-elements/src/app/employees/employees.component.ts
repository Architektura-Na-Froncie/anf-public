import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  salary: number;
}

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @Input()
  set settings(value: Settings) {
    this._settings = { ...value };
    this.cdRef.detectChanges(); // https://github.com/angular/angular/issues/30207
  }
  get settings() {
    return this._settings;
  }
  private _settings: any;

  get canDisplayData(): boolean {
    return !!this.data;
  }

  private data?: Employee[];
  dataToDisplay?: Employee[];

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.httpClient.get<Employee[]>('http://localhost:3000/employees').subscribe((data) => {
      this.data = data;
      this.applySettings();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['settings']) {
      this.applySettings();
    }
  }

  private applySettings() {
    const { minCostValue, costSortOrder } = this.settings || {};
    const data = this.data;
    let dataToDisplay;

    if (minCostValue) {
      dataToDisplay = (data || []).filter((employee) => employee.salary >= minCostValue);
    } else {
      dataToDisplay = (data || []).slice();
    }

    if (costSortOrder) {
      dataToDisplay.sort((a, b) => costSortOrder === 'desc' ? (b.salary - a.salary) : (a.salary - b.salary));
    }

    this.dataToDisplay = dataToDisplay;
  }
}
