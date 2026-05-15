import React, { useState } from 'react'

import { Button } from 'ui/atoms';

const getScript = function(url: string) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
}

function setCookie(key: any, value: any, expiry: any) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

declare const google: any
export const GoogleTranslate = () => {
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    (window as any).googleTranslateElementInit = function googleTranslateElementInit() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: true}, 'google_translate_element');
      setCookie('googtrans', '/en/es',1);
    }
  
    if (!loaded){
      getScript("//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit")
      setLoaded(true)
    }
  }

  return <>
    <div id="google_translate_element"></div>
    {!loaded && <Button variant="PRIMARY"
      data-testid="btn-google-translate"
      onClick={load}
    >load & translate</Button>}
  </>
}