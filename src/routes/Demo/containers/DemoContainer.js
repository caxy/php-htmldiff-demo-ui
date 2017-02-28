import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { FORM_NAME_INPUT_FORM } from '../components/InputForm/InputForm';
import { fetchHtmlDiff, setHtmlOld, setHtmlNew, selectDemo } from '../modules/demo';
import Demo from '../components/Demo';

const mapDispatchToProps = {
  onInputSubmit: fetchHtmlDiff,
  submitInputForm: () => dispatch => {
    dispatch(submit(FORM_NAME_INPUT_FORM));
  },
  onHtmlOldChange: (e) => dispatch => {
    dispatch(setHtmlOld(e.target.value));
  },
  onHtmlNewChange: (e) => dispatch => {
    dispatch(setHtmlNew(e.target.value));
  },
  onDemoChange: (e, index, value) => dispatch => {
    dispatch(selectDemo(value));
  }
};

const mapStateToProps = (state) => ({
  htmlOld: state.demo.htmlOld,
  htmlNew: state.demo.htmlNew,
  htmlDiff: state.demo.htmlDiff,
  selectedDemo: state.demo.selectedDemo,
  demos: state.demo.demos
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
