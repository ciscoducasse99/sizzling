import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import store from "./store";
import { Provider } from "react-redux";

import { Route, BrowserRouter, Switch } from "react-router-dom";

const User = lazy(() => import("./components/Users/UserApp/index"));
const Users = lazy(() => import("./components/Users/index"));
const Host = lazy(() => import("./components/Host/index"));
const Loading = lazy(() => import("./components/Loading.js"));
const Entry = lazy(() => import("./components/Entry"));
const NoMatchPage = lazy(() => import("./components/NoMatchPage.js"));
const ConfirmLocation = lazy(() => import("./components/ConfirmLocation"));

const routes = (
  <Suspense fallback={() => <Loading />}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/users/:customer_id/menu"
            exact
            render={(props) => <User {...props} />}
          />
          <Route exact path="/" component={() => <Entry />} />
          <Route exact path="/host" component={() => <Host />} />
          <Route exact path="/users" component={() => <Users />} />
          <Route
            exact
            path="/users/:customer_id/confirm-location"
            component={() => <ConfirmLocation />}
          />

          <Route component={() => <NoMatchPage />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </Suspense>
);

ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
