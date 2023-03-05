import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";

import ShowAllSpots from "./components/ShowAllSpots/index.js";
import ShowSpot from "./components/ShowSpot/index.js";
import CreateSpot from "./components/CreateSpot/index.js";
import ManageSpots from "./components/ManageSpots/index.js";
import ManageImages from "./components/ManageImages/index.js";
import ManageAccount from "./components/ManageAccount/index.js";

import { fetchSpots } from './store/spots.js';

const App = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => Object.values(state.spots));

  const [totalSpots, setTotalSpots] = useState(0);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(fetchSpots());
  }, []);

  useEffect(() => {
    setTotalSpots(allSpots.length);
  }, [allSpots]);

  return (
    <div>
      <Navigation />

        <Switch>

          <Route exact path='/'>
            <ShowAllSpots spots={allSpots} totalSpots={totalSpots} />
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
    </div>
  );
};

export default App;