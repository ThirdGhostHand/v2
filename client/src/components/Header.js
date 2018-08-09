import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

import { getCart } from '../actions';

class Header extends Component {
  componentDidMount(){
    console.log(this.props.auth)
    this.props.getCart();
  }
  componentDidUpdate(){
    console.log("auth equal:", this.props.auth)
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <div>
           <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><a href="/auth/google">Login With Google</a></li>
        </div>;
      default:
        if(this.props.auth.type === "user"){
          return [
            <li key="1"><Link to="/ClientStore">Shop</Link></li>,
            <li key="2"><Payments /></li>,
            <li key="3" style={{ margin: '0 10px' }}>
              Credits: {this.props.auth.credits}
            </li>,
            <li key="4" style={{ margin: '0 10px' }}>
              <Link to="/cart">Cart</Link>
              {(this.props.totalQty > 0)?( // if # of items in cart is > 0
                <p>{this.props.totalQty}</p>):('')}
            </li>,
            <li key="5"><a href="/api/logout">Logout</a></li>
          ];
        };
        if(this.props.auth.type === "merchant"){  
          return (
            [
              <li key="1"><Link to="/merchantStore">Manage Shop</Link></li>,
              <li key="2"><Payments /></li>,
              <li key="3"><a href="/api/logout">Logout</a></li>
            ]
          );
        }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/' : '/'}
            className="left brand-logo"
          >
            Korea Town
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { 
    auth: state.auth,
    totalQty: state.cart.totalQty };
}

export default connect(mapStateToProps, { getCart })(Header);

