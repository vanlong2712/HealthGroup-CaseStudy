import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import CounterPage from "../pages/CounterPage";
import EmployeesPage from "../pages/EmployeesPage";

export default (props: any) => {
  return (
    <Router>
      <PublicLayout>
        <Switch>
          <Route path="/counter" exact={true}>
            <CounterPage />
          </Route>
          <Route path="/employees">
            <EmployeesPage />
          </Route>
        </Switch>
      </PublicLayout>
    </Router>
  );
};
