import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import EmployeeList from "./components/EmployeeList";
import Panel from "./components/Panel";

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Panel title="Pracownicy" icon="React">
      <EmployeeList />
    </Panel>
  </QueryClientProvider>
);

export default App;
