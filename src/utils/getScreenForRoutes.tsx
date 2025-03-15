import { Route } from 'react-router-dom';
import { ControllerCreate } from '../screens/ControllerCreate';
import { ControllerDetails } from '../screens/ControllerDetails';
import { ControllerEdit } from '../screens/ControllerEdit';
import { ControllerList } from '../screens/ControllerList';
import { Screen } from '../types/Screen';
import React from 'react';
import { StoreData } from "./storeData";

export function getScreenForRoutes() {
  const screens = Object.entries(StoreData.screens);
  return (
    <>
      {screens.map(([key, screenData]) => {
        let routePath = `/${screenData.crud.controller}`;
        const screen: Screen = {
          key,
          controller: screenData.crud.controller,
        };
        return (
          <React.Fragment key={'index'}>
            <Route
              path={routePath + '/create'}
              element={<ControllerCreate screen={screen} />}
            />
            <Route
              path={routePath + '/details/:id'}
              element={<ControllerDetails screen={screen} />}
            />
            <Route
              path={routePath + '/edit/:id'}
              element={<ControllerEdit screen={screen} />}
            />
            <Route
              path={routePath}
              element={<ControllerList screen={screen} />}
            />
          </React.Fragment>
        );
      })}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </>
  );
}
