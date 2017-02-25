import React from 'react';
import HeaderContainer from '../../containers/HeaderContainer';
import './CoreLayout.scss';
import '../../styles/core.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Col, Row} from 'react-flexbox-grid';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className='core-layout'>
      <HeaderContainer />
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
