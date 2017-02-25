import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export const Header = ({auth, handleLogout}) => (
  <AppBar
    title="caxy/php-htmldiff"
    iconElementRight={<FlatButton
      href="https://github.com/caxy/php-htmldiff"
      target="_blank"
      label="Github"
      secondary={true}
      icon={<FontIcon className="fa fa-github" />}
    />}
  />
  // <div>
  //   <h1>Caxy Front End Starter Kit</h1>
  //   <IndexLink to='/' activeClassName='route--active'>
  //     Home
  //   </IndexLink>
  //   {' · '}
  //   <Link to='/counter' activeClassName='route--active'>
  //     Counter
  //   </Link>
  //   {auth.isAuthenticated ? (
  //     <div>
  //       {auth.username}
  //       <a href="#" onClick={handleLogout}>Logout</a>
  //     </div>
  //   ) : ''}
  // </div>
);

Header.propTypes = {
  auth: React.PropTypes.object,
  handleLogout: React.PropTypes.func
};

export default Header;
