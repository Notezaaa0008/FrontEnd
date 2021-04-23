import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBarContainer from './containers/navigationBar/NavigationBarContainer';
import FooterContainer from './containers/footer/FooterContainer';
import HomepageContainer from './containers/homepage/homepageContainer';
import TrackingContainer from './containers/tracking/TrackingContainer';
import CreateOrderByAdminContainer from './containers/createOrderByAdmin/CreatrOrderByAdminContainer';
import AdminPageContainer from './containers/adminPage/AdminPageContainer';
import ProfileContainer from './containers/profile/ProfileContainer';
import AboutUsContainer from './containers/aboutUs/AboutUsContainer';


function App() {
  return (
    <BrowserRouter>
      <div >
        <NavigationBarContainer />
        <div>
          <Switch>
            <Route exact path='/tracking' component={TrackingContainer} />
            <Route exact path='/create-order-admin' component={CreateOrderByAdminContainer} />
            <Route exact path='/admin' component={AdminPageContainer} />
            <Route exact path='/profile' component={ProfileContainer} />
            <Route exact path='/about' component={AboutUsContainer} />

            <Route exact path='/' component={HomepageContainer} />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
