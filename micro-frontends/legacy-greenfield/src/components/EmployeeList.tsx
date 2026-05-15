import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import classes from "./EmployeeList.module.css";

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
    return window.PubSub.subscribe((event) => {
      if (event.type === 'settingsChange') {
        setSettings(event.message);
      }
    });
  }, []);

  return (
    <EmployeeList settings={settings} />
  );
}

export default EmployeeListConnected;
