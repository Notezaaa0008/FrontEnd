import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import NavigationBarContainer from './containers/navigationBar/NavigationBarContainer';
import FooterContainer from './containers/footer/FooterContainer';
import HomepageContainer from './containers/homepage/homepageContainer';
import TrackingContainer from './containers/tracking/TrackingContainer';
import CreateOrderByAdminContainer from './containers/createOrderByAdmin/CreatrOrderByAdminContainer';
import AdminPageContainer from './containers/adminPage/AdminPageContainer';
import ProfileContainer from './containers/profile/ProfileContainer';
import AboutUsContainer from './containers/aboutUs/AboutUsContainer';

const privateRoutes = [
  {
    path: '/',
    component: HomepageContainer
  },
  {
    path: '/profile',
    component: ProfileContainer
  },
  {
    path: '/admin',
    component: AdminPageContainer
  },
  {
    path: '/create-order-admin',
    component: CreateOrderByAdminContainer
  },
  {
    path: '/tracking',
    component: TrackingContainer
  },
  {
    path: '/about',
    component: AboutUsContainer
  },
];

const publicRoutes = [
  {
    path: '/',
    component: HomepageContainer
  },
  {
    path: '/about',
    component: AboutUsContainer
  },
  {
    path: '/tracking',
    component: TrackingContainer
  }
];


function App() {
  const isAuthenticated = useSelector((state) => state.authenticated.isAuthenticated);

  return (
    <BrowserRouter>
      <div >
        <NavigationBarContainer />
        <div>
          <Switch>
            {isAuthenticated && privateRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
            {!isAuthenticated && publicRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
            <Redirect to="/" />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
