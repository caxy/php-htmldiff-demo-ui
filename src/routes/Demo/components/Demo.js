import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export const Demo = () => (
  <div class="demo">
    <h2>Input</h2>
    <Grid fluid>
      <Row>
        <Col xs={12} md={6}>
          <TextField
            floatingLabelText="Old HTML"
            multiLine={true}
            rows={6}
            fullWidth={true}
          />
        </Col>
        <Col xs={12} md={6}>
          <TextField
            floatingLabelText="New HTML"
            multiLine={true}
            rows={6}
            fullWidth={true}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Demo;
