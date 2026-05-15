import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { EmployeeList } from "./components/EmployeeList";

import './root.component.css';

const queryClient = new QueryClient()

export default function Root(props) {
  // 🔥 test error boundary:
  // throw new Error('kaboom')

  return (<>
    <QueryClientProvider client={queryClient}>
      <div className="rootComponent">
        <EmployeeList />
      </div>
    </QueryClientProvider>
  </>);
}
