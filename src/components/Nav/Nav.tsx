import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import { Menu } from 'semantic-ui-react';

const Nav = () => {
  return (
    <Menu
      className="Nav NavBar"
      inverted
      color="blue"
    >
      <Menu.Item className="Nav-Item">
        <img
          className="Nav-Logo"
          src="https://iev.aero/_nuxt/img/logo.c97e286.png"
          alt="Sikorsky Airport"
        />
      </Menu.Item>

      <Menu.Item
        className="Nav-Item"
        position="right"
        as={NavLink}
        name="home"
        to="/"
        exact
      />
      <Menu.Item
        className="Nav-Item"
        as={NavLink}
        name="flights"
        to="/flights"
        exact
      />
    </Menu>
  );
};

export default Nav;
