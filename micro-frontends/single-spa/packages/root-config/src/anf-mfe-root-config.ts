import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@anf-mfe/header",
  app: () => System.import("@anf-mfe/header"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});

window.addEventListener('single-spa:first-mount', () => {
  registerApplication({
    name: "@anf-mfe/employees",
    app: () => System.import("@anf-mfe/employees"),
    activeWhen: ["/employees"],
  });

  registerApplication({
    name: "@anf-mfe/settings",
    app: () => System.import("@anf-mfe/settings"),
    activeWhen: ["/settings"],
  });

  registerApplication({
    name: "settings-angular",
    app: () => System.import("settings-angular"),
    activeWhen: ["/settings-angular"],
  });
});
