import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, AboutUsPage, Events, ContactUs, CategoryDetailPage } from '../pages';
import PostViewPage from '../pages/PostViewPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/about-us" component={AboutUsPage} />
      <Route
        exact
        path="/category/:categoryName"
        component={CategoryDetailPage}
      />
      <Route
        exact
        path="/category/:categoryName/:id"
        component={PostViewPage}
      />
      <Route exact path="/events" component={Events} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

export default Routes;
