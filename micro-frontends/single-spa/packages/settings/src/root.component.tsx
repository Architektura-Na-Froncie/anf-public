import React, { useEffect, useState } from "react";

// 1. Config single-spa ma ustawione orgname "@anf-mfe", i uzupełnia config webpacka o to,
//    że wszelkie pakiety wewn. "@anf-mfe" będą ładowane dynamicznie
// 2. Eksportowany pubsub jest SINGLETONem (każdy importujący na poziomie webpacka będzie miał
//    dostęp do tej samej instancji), dlatego osadzanie pubsuba na window nie jest potrzebne.
//    Czyli każdy mikrofrontend będzie miał ten sam pub-sub singleton. Ale jeśli uruchomimy
//    pojedynczy mikrofront w izolacji, to również doczyta sobie pub-sub singleton (zadziała
//    to dokładnie tak samo), tyle - że z drugiej strony nikt na tego pub-suba nie będzie
//    nasłuchiwał.
import { pubsub } from '@anf-mfe/pubsub';

import Settings from "./components/Settings";
import './root.component.css';

const Root = () => {
  return (
    <div className="rootComponent">
      <Settings />
    </div>
  );
}

export default Root;
