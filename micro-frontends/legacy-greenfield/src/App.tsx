import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";

import EmployeeList from "./components/EmployeeList";
import Panel from './components/Panel';

const queryClient = new QueryClient()

function App(props: { isWebComponent?: boolean }) {
  const { isWebComponent } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <Panel
        title="Pracownicy"
        icon="React"
        iconHelp={isWebComponent ? "React + WebComponent" : "React"}
        iconBadge={isWebComponent ? "WC" : ""}
      >
        <EmployeeList />
      </Panel>
    </QueryClientProvider>
  );
}

export default App;
