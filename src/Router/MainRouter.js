import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../Components/Login";
import Posts from "../Components/Posts";

const MainRouter = () => (
 <Switch>
   <Route path="/signin" exact component={Login} />
   <PrivateRoute path="/" exact component={Posts} />
   {/* <PrivateRoute path="/:id" exact component={Post} /> */}
 </Switch>
);

export default MainRouter;