import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import InputForm from './InputForm';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const Demo = ({
  onInputSubmit,
  submitInputForm,
  onHtmlOldChange,
  onHtmlNewChange,
  htmlDiff,
  htmlOld,
  htmlNew,
  selectedDemo,
  onDemoChange,
  demos
}) => (
  <div className="demo">
    <Paper zDepth={2}>
      <Toolbar>
        <ToolbarTitle text="HTML Input" />
        <ToolbarGroup>
          <DropDownMenu value={selectedDemo ? selectedDemo.id : null} onChange={onDemoChange}>
            <MenuItem value={null} primaryText="No Demo" />
            {demos.map(demo => <MenuItem key={demo.id} value={demo.id} primaryText={demo.name} />)}
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    </Paper>
    <Paper zDepth={1}>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <InputForm
              onSubmit={onInputSubmit}
              onHtmlOldChange={onHtmlOldChange}
              onHtmlNewChange={onHtmlNewChange}
              initialValues={{htmlOld, htmlNew}}
              enableReinitialize={true}
            />

            <RaisedButton label="Calculate Diff" onClick={submitInputForm} primary={true} />
          </Col>
        </Row>
      </Grid>
      <br/>
    </Paper>
    <Paper zDepth={0}>
      <Toolbar>
        <ToolbarTitle text="HTML Output" />
      </Toolbar>
    </Paper>
    <Paper zDepth={1}>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div dangerouslySetInnerHTML={{__html: htmlDiff}} />
          </Col>
        </Row>
      </Grid>
    </Paper>
  </div>
);

Demo.propTypes = {
  onInputSubmit: React.PropTypes.func.isRequired,
  submitInputForm: React.PropTypes.func.isRequired,
  onHtmlOldChange: React.PropTypes.func,
  onHtmlNewChange: React.PropTypes.func,
  htmlOld: React.PropTypes.string,
  htmlNew: React.PropTypes.string,
  htmlDiff: React.PropTypes.string,
  selectedDemo: React.PropTypes.object,
  onDemoChange: React.PropTypes.func,
  demos: React.PropTypes.array
}

export default Demo;
