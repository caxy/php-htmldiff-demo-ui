import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { ToolbarGroup } from 'material-ui/Toolbar';

const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};

export const Header = ({auth, handleLogout}) => (
  <AppBar
    title="caxy/php-htmldiff"
  >
    <ToolbarGroup>
      {/*<FlatButton
        href="/"
        label="Home"
        style={buttonStyle}
      />
      <FlatButton
        href="/demo"
        label="Demo"
        style={buttonStyle}
      />
      <FlatButton
        href="/compare"
        label="Compare"
        style={buttonStyle}
      />*/}
      <FlatButton
        href="https://github.com/caxy/php-htmldiff"
        target="_blank"
        label="Github"
        style={buttonStyle}
        icon={<FontIcon className="fa fa-github" />}
      />
    </ToolbarGroup>
  </AppBar>
);

Header.propTypes = {
  auth: React.PropTypes.object,
  handleLogout: React.PropTypes.func
};

export default Header;
