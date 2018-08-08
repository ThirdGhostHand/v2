import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import MerchantSignin from './auth/MerchantSignin';
import MerchantSignup from './auth/MerchantSignup';
import MerchantStore from './market/MerchantStore';
import ClientStore from './market/ClientStore';
import AddItem from './market/ItemNew';
import Cart from './market/Cart';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/ClientStore" component={ClientStore}/>
            <Route path="/merchantSignin" component={MerchantSignin} />
            <Route path="/merchantSignup" component={MerchantSignup} />
            <Route path="/merchantStore" component={MerchantStore}/>
            <Route path="/addItem" component={AddItem}/>
            <Route path="/cart" component={Cart}/>
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
