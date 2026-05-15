import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';

// 1. Taki moduł nie istnieje w package.json, ładowany jest dynamicznie (w runtime, a nie na etapie budowania)
//    poprzez mechanizm module federation. Typy dla tego modułu zadeklarowane są w remoteTypes.d.ts
// 2. Eksportowany pubsub jest SINGLETONem (każdy importujący na poziomie webpacka będzie miał
//    dostęp do tej samej instancji), dlatego osadzanie pubsuba na window nie jest potrzebne.
import { pubsub } from '@anf-mfe/pubsub';

import classes from './EmployeeList.module.css';
import Panel from "./Panel";

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

const EmployeeList = (props: { settings?: Settings, isWebComponent?: boolean }) => {
  const { isLoading, error, data } = useQuery('employees', (): Promise<Employee[]> => {
    return fetch('http://localhost:3000/employees').then(res => res.json());
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>An error has occurred: {(error as Error).message}</>;
  }

  const { settings } = props;
  const { minCostValue, costSortOrder, displayCosts } = settings || {};

  let dataToDisplay: Employee[];

  if (minCostValue) {
    dataToDisplay = (data || []).filter((employee) => employee.salary >= minCostValue!);
  } else {
    dataToDisplay = (data || []).slice();
  }

  if (costSortOrder) {
    dataToDisplay.sort((a, b) => costSortOrder === 'desc' ? (b.salary - a.salary) : (a.salary - b.salary));
  }

  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <thead className={classes.tableHeader}>
          <tr>
            <th>Imię i nazwisko</th>
            <th>Stanowisko</th>
            {!!displayCosts && <th>Koszty</th>}
          </tr>
        </thead>
        <tbody className={classes.tableContent}>
          {dataToDisplay.map(e => (
            <tr key={e.id}>
              <td>{`${e.firstName} ${e.lastName}`}</td>
              <td>{e.title}</td>
              {!!displayCosts && <td>{e.salary}$</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmployeeListConnected = () => {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    // Pubsub działa jak BehaviorSubject - po zasubskrybowaniu dostajemy aktualną
    // wartość. Dzięki temu możemy się zsynchronizować z aktualnym stanem ustawień.
    return pubsub.subscribe((event) => {
      if (event.type === 'settingsChange') {
        setSettings(event.message);
      }
    });
  }, []);

  return (
    <Panel title="Pracownicy" icon="React">
      <EmployeeList settings={settings} />
    </Panel>
  );
}

export default EmployeeListConnected;
