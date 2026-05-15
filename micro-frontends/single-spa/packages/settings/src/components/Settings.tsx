import React, { useCallback, useEffect, useRef, useState } from "react";

// 1. Taki moduł nie istnieje w package.json, ładowany jest poprzez mechanizm
//    module federation. Typy dla tego modułu zadeklarowane są w remoteTypes.d.ts
// 2. Eksportowany pubsub jest SINGLETONem (każdy importujący na poziomie webpacka będzie miał
//    dostęp do tej samej instancji), dlatego osadzanie pubsuba na window nie jest potrzebne.
import { pubsub } from "@anf-mfe/pubsub";

import Panel from "./Panel";
import classes from "./Settings.module.css";

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

const SettingsForm = (props: { settings?: Settings | null, setSettings: (s: Settings) => void }) => {
  const { settings, setSettings } = props;

  // Poniższe 5 linijek są czysto UX-owe - zapewniają że przy pierwszym renderze
  // przycisk toggle nie jest animowany
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <dl className={classes.settingsForm}>
      <div className={classes.settingsFormRow}>
        <dt>Wyświetlaj koszty</dt>
        <dd>
          <button
            className={[
              classes.settingsFormToggle,
              settings?.displayCosts && classes.settingsFormToggleActive,
              isMounted && classes.settingsFormToggleIsMounted,
            ].filter(Boolean).join(' ')}
            onClick={() => setSettings({ displayCosts: !settings?.displayCosts })}
            aria-label="Zmień"
          ></button>
        </dd>
      </div>
      <div className={classes.settingsFormRow}>
        <dt>
          Próg kosztów
          <small>Pokazuj tylko wyniki z kosztami równymi lub większymi</small>
        </dt>
        <dd>
          <input
            className={classes.settingsFormInput}
            type="number"
            min={0}
            value={settings?.minCostValue || ''}
            onChange={(event) => setSettings({ minCostValue: +event.target.value })}
          /> $
        </dd>
      </div>
      <div className={classes.settingsFormRow}>
        <dt>Sortuj wyniki wg. kosztów</dt>
        <dd>
          <select
            className={classes.settingsFormInput}
            value={settings?.costSortOrder || ''}
            onChange={(event) => setSettings({ costSortOrder: event.target.value as Settings['costSortOrder'] })}
          >
            <option value="">Brak</option>
            <option value="asc">Rosnąco</option>
            <option value="desc">Malejąco</option>
          </select>
        </dd>
      </div>
    </dl>
  );
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    return pubsub.subscribe((event) => {
      console.log('Settings changed', event.message);
      if (event.type === 'settingsChange') {
        setSettings(event.message);
      }
    });
  }, []);

  const updateSettings = useCallback((change: Settings) => {
    setSettings(change);
    pubsub.notify('settingsChange', { ...settings, ...change });
  }, [settings]);

  return (
    <Panel title="Ustawienia" icon="React">
      <SettingsForm settings={settings} setSettings={updateSettings} />
    </Panel>
  );
}

export default Settings;
