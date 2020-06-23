import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import './BackButton.scss'


export const BackButton = () => {
  return (
    <NavLink
      to={'/'}
      className="backbtn"
    >
      <Icon className="backbtn__icon" style={{ fontSize: 14 }} >arrow_back_ios</Icon>
      <span className="backbtn__icon">Back</span>
    </NavLink>
  );
};
