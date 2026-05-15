import React from "react";
import classes from "./SettingsForm.module.css";

export interface Settings {
  displayCosts?: boolean;
  minCostValue?: number;
  costSortOrder?: 'asc' | 'desc';
}

const SettingsForm = (props: { settings?: Settings | null, setSettings: (s: Settings) => void }) => {
  const { settings, setSettings } = props;

  return (
    <dl className={classes.settingsForm}>
      <div className={classes.settingsFormRow}>
        <dt>Wyświetlaj koszty</dt>
        <dd>
          <button
            className={[
              classes.settingsFormToggle,
              settings?.displayCosts && classes.settingsFormToggleActive
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

export default SettingsForm;
