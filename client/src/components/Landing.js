import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Korea Town
      </h1>
      Buy Korean things!
      <li><Link to="/merchantSignup">Become a merchant!</Link></li>
      <li><Link to="/merchantSignin">Trader login</Link></li>
    </div>
  );
};

export default Landing;
