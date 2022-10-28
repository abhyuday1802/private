/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Ticket from "./ticket";
const ReportsRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/ticket`} />
    <Route path={`${match.url}/ticket`} component={Ticket} />
  </Switch>
);

export default ReportsRoute;
