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

  // 🔥 iframe'y nie dopasowują swoich rozmiarów do treści, więc trzeba ręcznie
  // powiadomić shella jaką wysokość powinien nadać ramce osadzającej ten mikrofront.
  useEffect(() => {
    window.parent?.postMessage({ type: 'updateIframeHeight', height: document.body.offsetHeight }, '*');
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

// Poniższa funkcja pomocnicza służy do wysłania komunikatu do shella z prośbą o zwrócenie
// aktualnego stanu ustawień, i oczekuje na odpowiedź.
function fetchSettingsValue(): Promise<Settings> {
  return new Promise((resolve, reject) => {
    const listener = (message: MessageEvent) => {
      if (message.data?.type === 'settingsValue') {
        window.removeEventListener('message', listener);
        resolve(message.data.data);
      }
    };
    window.addEventListener('message', listener, false);
    window.parent.postMessage({ type: 'sendSettingsValue' }, '*');

    setTimeout(() => reject('timeout'), 1000);
  });
}

// Wrapper służący do załadowania początkowego stanu ustawień, i nasłuchiwania na ich zmiany.
// Ponieważ komunikacja przez postMessage jest jednokierunkowa i asynchroniczna, musimy się
// nieco bardziej postarać, żeby dostać komunikację synchroniczną (czyli wysyłamy żądanie
// i czekamy na odpowiedź).
const EmployeeListWithSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchSettingsValue().then((s) => mounted && setSettings(s), () => mounted && setSettings({}));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.type === 'settingsValue') {
        setSettings({ ...event.data.data });
      }
    };

    window.addEventListener("message", listener, false);

    return () => {
      window.removeEventListener("message", listener);
    }
  }, []);

  if (!settings) {
    return <>Loading...</>;
  }

  return <EmployeeList settings={settings} />
}

export default EmployeeListWithSettings;
