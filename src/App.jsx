import React from "react";
import { MainPage } from "./MainPage";
import { ComparePage } from "./ComparePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./Routes";
import { RequestState, useMendixTemplateInfo } from "./hooks";
import { TemplateDataProvider } from "./TemplateDataProvider";
import { ErrorStatusText, LoadingView } from "./components";

export default function App() {
  const { state, error, versions, releases } = useMendixTemplateInfo();

  return (
    <>
      {state === RequestState.loading && <LoadingView />}
      {state === RequestState.complete && error && (
        <ErrorStatusText>{error}</ErrorStatusText>
      )}
      {state === RequestState.complete && !error && (
        <TemplateDataProvider
          value={{
            versions,
            releases,
          }}
        >
          <HashRouter>
            <Switch>
              <Route path={Routes.compare}>
                <ComparePage />
              </Route>
              <Route path={Routes.home}>
                <MainPage />
              </Route>
            </Switch>
          </HashRouter>
        </TemplateDataProvider>
      )}
    </>
  );
}
