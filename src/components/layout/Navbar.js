import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import kerasTfLogo from '../images/kerasTfSmall.png';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar bg-header'>
      <h1>
        <img className='navbarIcon' src={kerasTfLogo} alt='kears/tf' />
        <label> </label>
        {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Keras/TF AI</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Keras/Tensorflow AI',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
