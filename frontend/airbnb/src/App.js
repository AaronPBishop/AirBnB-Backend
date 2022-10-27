import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import LoginFormPage from "./components/LoginFormPage/index.js";
import SignupFormPage from "./components/SignupFormPage/index.js";
import Navigation from "./components/Navigation";

import ShowAllSpots from "./components/ShowAllSpots/index.js";
import ShowSpot from "./components/ShowSpot/index.js";
import CreateSpot from "./components/CreateSpot/index.js";
import ManageSpots from "./components/ManageSpots/index.js";
import ManageImages from "./components/ManageImages/index.js";

const App = () => {
  const dispatch = useDispatch();
  const currSpotId = useSelector(state => state.spots.currSpotId);
  const [isLoaded, setIsLoaded] = useState(false);
  
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

          <Route path='/create-spot'>
            <CreateSpot/>
          </Route>

          <Route path='/manage-listings'>
            <ManageSpots />
          </Route>

          <Route path='/manage-photos/:spotId'>
            <ManageImages />
          </Route>

          <Route path='/spots/:spotId'>
            <ShowSpot />
          </Route>

          <Route path='/edit-spot/:spotId'>
            <CreateSpot id={currSpotId}/>
          </Route>
          
        </Switch>
      )}
    </div>
  );
};

export default App;