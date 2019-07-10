import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import BranchesPage from "./components/BranchesPage";
import ABGuidancePage from "./components/ab_guidance/ABGuidancePage";
import DocumentsPage from "./components/documents/DocumentsPage";
import GalleryPage from "./components/Gallery/GalleryPage";
import GalleriesPage from "./components/Gallery/GalleriesPage";
import ProductsPage from "./components/ProductsPage";
import PowerpointPage from "./components/powerpoint/PowerpointPage";
import TemplatesPage from "./components/TemplatesPage";
import BranchExamplePage from "./components/BranchExamplePage";
import Admin from "./components/admin/Admin";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* 1st Level Paths */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/ab_guidance" component={ABGuidancePage} />
        <Route exact path="/documents" component={DocumentsPage} />
        <Route exact path="/powerpoint" component={PowerpointPage} />
        <Route exact path="/gallery" component={GalleriesPage} />
        <Route exact path="/gallery/:id" component={GalleryPage} />
        <Route exact path="/products" component={ProductsPage} />
        {/* <Route exact path="/templates" component={TemplatesPage} />
        <Route exact path="/branch" component={BranchExamplePage} /> */}
        <Route path="/admin" component={Admin} />

        {/*Branches Pages Paths */}
        <Route exact path="/branches/:id" component={BranchesPage} />
        {/* Create a path for each branch page */}
        {/* Have here a component that passes props with the keyword: emek
      to a new component that would be generic for all the branches 
      and then would pull from the database  
      Then to pull Emek, use "this.props.route.something"
      https://github.com/ReactTraining/react-router/issues/4105
      */}

        {/* Admin Pages: */}
        {/* All admin access pages that require authentication: */}

        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
