import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import classes from "./DepartmentList.module.css";

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

export interface Department {
  id: number;
  name: string;
  operatingCosts: number;
}

const DepartmentList = (props: { settings?: Settings, isWebComponent?: boolean }) => {
  const { isLoading, error, data } = useQuery('departments', (): Promise<Department[]> => {
    return fetch('http://localhost:3000/departments').then(res => res.json());
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

  let dataToDisplay: Department[];

  if (minCostValue) {
    dataToDisplay = (data || []).filter((dept) => dept.operatingCosts >= minCostValue!);
  } else {
    dataToDisplay = (data || []).slice();
  }

  if (costSortOrder) {
    dataToDisplay.sort((a, b) => costSortOrder === 'desc' ? (b.operatingCosts - a.operatingCosts) : (a.operatingCosts - b.operatingCosts));
  }

  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <thead className={classes.tableHeader}>
          <tr>
            <th>Nazwa</th>
            {!!displayCosts && <th>Koszty operacyjne</th>}
          </tr>
        </thead>
        <tbody className={classes.tableContent}>
          {dataToDisplay.map(e => (
            <tr key={e.id}>
              <td>{`${e.name}`}</td>
              {!!displayCosts && <td>{e.operatingCosts}$</td>}
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
const DepartmentListWithSettings = () => {
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

  return <DepartmentList settings={settings} />
}

export default DepartmentListWithSettings;
