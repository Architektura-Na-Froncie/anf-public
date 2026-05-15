import { useEffect, useRef, useState } from 'react';
import SettingsForm, { Settings } from './components/SettingsForm';

import classes from './App.module.css';
import Panel from './components/Panel';

function hash() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

function App() {
  const [iframeSrc, setIframeSrc] = useState('/home.html');
  const [settings, setSettings] = useState<Settings>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activateChildApp = (e: React.MouseEvent, src: string) => {
    e.preventDefault();
    setIframeSrc(`${src}?${hash()}`);
  }

  const updateSettings = (update: Settings) => {
    const newSettings = {
      ...settings,
      ...update,
    };
    setSettings(newSettings);
    // post message to active child iframe
    iframeRef.current!.contentWindow!.postMessage({ type: 'settingsValue', data: newSettings }, '*');
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.type === 'sendSettingsValue') {
        iframeRef.current!.contentWindow!.postMessage({ type: 'settingsValue', data: settings }, '*');
      }

      if (event.data?.type === 'updateIframeHeight') {
        iframeRef.current!.style.height = event.data.height + 'px';
      }
    };

    window.addEventListener("message", listener, false);

    return () => {
      window.removeEventListener("message", listener);
    }
  });

  useEffect(() => {
    if ((window as any).iFrameResize) {
      (window as any).iFrameResize({ log: false }, iframeRef.current);
    }
  }, []);

  return <>
    <div className={classes.layout}>
      <h1 className={classes.layoutTitle}>Mikro-fronty w Iframe'ach</h1>
      <nav className={classes.layoutNav}>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={(e) => activateChildApp(e, '/home.html')}>Home</a>
        <a href="#" onClick={(e) => activateChildApp(e, '//localhost:3021')}>Pracownicy</a>
        <a href="#" onClick={(e) => activateChildApp(e, '//localhost:3022')}>Wydziały</a>
        {/* eslint-enable */}
      </nav>
      <div className={classes.layoutColumns}>
        <div className={classes.layoutColumn}>
          <iframe className={classes.contentIframe} name="content" src={iframeSrc} ref={iframeRef} title="Iframe z mikro-frontem" />
        </div>
        <div className={classes.layoutColumn}>
          <Panel title="Ustawienia" icon="React">
            <SettingsForm settings={settings} setSettings={updateSettings} />
          </Panel>
        </div>
      </div>
    </div>
  </>;
}

export default App;
