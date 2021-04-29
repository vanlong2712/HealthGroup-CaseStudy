import React from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "./services/queryClient";
import RootRouter from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  );
}

export default App;
