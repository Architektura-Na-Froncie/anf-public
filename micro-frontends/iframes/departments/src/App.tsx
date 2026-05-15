import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import DepartmentList from "./components/DepartmentList";
import Panel from "./components/Panel";

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Panel title="Wydziały" icon="React">
      <DepartmentList />
    </Panel>
  </QueryClientProvider>
);

export default App;
