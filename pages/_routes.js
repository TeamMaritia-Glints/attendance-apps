import React from "react";
import { BrowserRouter, Switch, Route } from "next/router";

import Admin from "./admin";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/index">
          <Admin />
        </Route>
       
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;