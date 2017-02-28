import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui';
import { Row, Col } from 'react-flexbox-grid';

export const FORM_NAME_INPUT_FORM = 'inputForm';

let InputForm = ({ onHtmlOldChange, onHtmlNewChange }) => (
  <form>
    <Row>
      <Col xs={12} md={6}>
        <Field
          name="htmlOld"
          component={TextField}
          floatingLabelText="Old HTML"
          multiLine={true}
          rows={6}
          rowsMax={10}
          fullWidth={true}
          onChange={onHtmlOldChange}
        />
      </Col>
      <Col xs={12} md={6}>
        <Field
          name="htmlNew"
          component={TextField}
          floatingLabelText="New HTML"
          multiLine={true}
          rows={6}
          rowsMax={10}
          fullWidth={true}
          onChange={onHtmlNewChange}
        />
      </Col>
    </Row>
  </form>
);

InputForm.propTypes = {
  onHtmlOldChange: React.PropTypes.func,
  onHtmlNewChange: React.PropTypes.func
};

InputForm = reduxForm({
  form: FORM_NAME_INPUT_FORM
})(InputForm);

export default InputForm;
