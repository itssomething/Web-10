import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="container">
          <div className="row">
            <form className="col-sm-3 search_form">
              <input type="text" name="s" placeholder="Enter your search..." className="form-control" />
              <span className="glyphicon glyphicon-search"></span>
            </form>
            <div className="col-sm-6 text-center site_logo">
              <img src="img/logo.png" alt="TechKids Hot Girls Logo" />
              HOT GIRLS
              </div>
            <div className="col-sm-3 profile_group">
              <div className="profile_wrapper">
                <button><span className="glyphicon glyphicon-camera"></span></button>
                <button><a href="/logout"><span className="glyphicon glyphicon-menu-hamburger"></span></a></button>
                <span className="username"></span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;