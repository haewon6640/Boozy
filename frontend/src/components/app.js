import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import HomePageContainer from "./home/home_page_container";
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import BarCartContainer from './profile/bar_cart_container';
import RecipeIndexContainer from "./recipes/recipe_index_container";
import CreateRecipeContainer from './forms/create_recipe_container';
import RecipeShowContainer from './recipes/recipe_show_container'
import EditRecipeContainer from "./forms/edit_recipe_container";
import Footer from './footer/footer';
import '../styles/app.scss'
const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/recipes/new" component={CreateRecipeContainer} />
      <Route exact path="/recipes/:id" component={RecipeShowContainer} />
      <Route exact path="/recipes/:id/edit" component={EditRecipeContainer} />
      <Route path="/recipes" component={RecipeIndexContainer} />s
      <ProtectedRoute exact path="/profile" component={BarCartContainer} />
    </Switch>
    <Footer />
  </div>
);

export default App;