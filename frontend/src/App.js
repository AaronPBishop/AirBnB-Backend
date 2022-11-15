import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";

import ShowAllSpots from "./components/ShowAllSpots/index.js";
import ShowSpot from "./components/ShowSpot/index.js";
import CreateSpot from "./components/CreateSpot/index.js";
import ManageSpots from "./components/ManageSpots/index.js";
import ManageImages from "./components/ManageImages/index.js";
import ManageAccount from "./components/ManageAccount/index.js";

const App = () => {
  const dispatch = useDispatch();
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
            <ShowAllSpots type='show-all' />
          </Route>

          <Route path='/create-spot'>
            <CreateSpot/>
          </Route>

          <Route path='/manage-listings'>
            <ManageSpots />
          </Route>

          <Route path='/manage-account'>
            <ManageAccount />
          </Route>

          <Route exact path='/:city'>
            <ShowAllSpots type='city' />
          </Route>

          <Route path='/manage-photos/spots/:spotId'>
            <ManageImages type='spot' />
          </Route>

          <Route path='/manage-photos/reviews/:reviewId'>
            <ManageImages type='review' />
          </Route>

          <Route path='/spots/:spotId'>
            <ShowSpot />
          </Route>

          <Route path='/edit-spot/:spotId'>
            <CreateSpot type='edit' />
          </Route>
          
        </Switch>
      )}
    </div>
  );
};

export default App;