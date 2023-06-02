
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3">
      <div class="container-fluid">
      <img src="./assets/images/eggplantBox.png" alt="Box of Eggplants" id="headerimg"></img>
        <div class="navbar-brand" id="navbar">EggPlant Polls 
          <p className="m-0" id="wager">Wager your Eggplant currency on poll results!</p></div>
      </div>
      <ul>
        {Auth.loggedIn() ? (
          <>
          <ul><Link className="btn btn-lg btn-info m-2" to="/">
              Home
            </Link></ul>
            <ul><Link className="btn btn-lg btn-info m-2" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link></ul>
            <ul><Link className="btn btn-lg btn-light m-2" to="/farm">
              Farm
            </Link></ul>
            <ul><button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button></ul>
          </>
        ) : (
          <>
            <ul><Link className="btn btn-lg btn-info m-2" to="/">
              Home
            </Link></ul>
            <ul><Link className="btn btn-lg btn-info m-2" to="/login">
              Login
            </Link></ul>
            <ul><Link className="btn btn-lg btn-light m-2" to="/signup">
              Signup
            </Link></ul>

          </>
        )
        }
      </ul>

    </header>
  );
};

export default Header;
