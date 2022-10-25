import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createSpot } from './store/spotsReducer.js';
import * as sessionActions from "./store/session";

import LoginFormPage from "./components/LoginFormPage/index.js";
import SignupFormPage from "./components/SignupFormPage/index.js";
import Navigation from "./components/Navigation";

import ShowAllSpots from "./components/ShowAllSpots/index.js";
import ShowSpot from "./components/ShowSpot/index.js";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
      const makeFetch = async () => {
        const fetchReq = await fetch(`/api/spots`);
        const fetchJSON = await fetchReq.json();

        const data = [fetchJSON];
        data.forEach(spot => spot.Spots.forEach((obj => dispatch(createSpot(obj)))));
      };

      makeFetch();
  }, []);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>

      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <ShowAllSpots />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/spots/:spotId'>
            <ShowSpot />
          </Route>
          
        </Switch>
      )}
    </div>
  );
};

export default App;