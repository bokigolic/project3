import { connect } from "react-redux";
import { actionDevModeToggle } from "../redux/actions";
import TestAjaxAll from "./TestAjaxAll";

// componentthat helpduringdevelopment

const PageDev = (props) => {
  const dispatch = props.dispatch;

  const _click_dev = () => {
    dispatch(actionDevModeToggle());
  };

  let jsxDevMode = (
    <div onClick={_click_dev} className={'dev-mode-btn'}>ENABLE DEV MODE</div>
  );
  let cl_dev_mode_active = '';
  if (props.dev_mode === true) {
    cl_dev_mode_active = 'dev-mode-active';
    jsxDevMode = (
      <div onClick={_click_dev} className={'dev-mode-btn'}>DISABLE DEV MODE</div>
    );
  }

  return (
    <>
      <div className="page-home">
        <h1>iSchool React App DEV PAGE</h1>
        <h2>DEV MODE</h2>
        <div className={cl_dev_mode_active}>{jsxDevMode}</div>
        <h2>Info</h2>
        <p>
          <a
            className=""
            href="http://www.ist.rit.edu/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IST Site API Reference
          </a>
        </p>
        <p>
          <a
            className=""
            href="https://www.rit.edu/computing/school-of-information"
            target="_blank"
            rel="noopener noreferrer"
          >
            School of Information
          </a>
        </p>
        <p>
          <a
            className=""
            href="http://ist.rit.edu/api/degrees/undergraduate/degreeName=cit"
            target="_blank"
            rel="noopener noreferrer"
          >
            api example 1
          </a>
        </p>
        <p>
          <a
            className=""
            href="http://ist.rit.edu/api/employment/coopTable/coopInformation/employer=Skyvo"
            target="_blank"
            rel="noopener noreferrer"
          >
            api example 2
          </a>
        </p>


        <h2>TEST ALL API-s</h2>
        <TestAjaxAll freshness={props.route_freshness} />

      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    route_key: state.route_key,
    route_freshness: state.route_freshness,
    dev_mode: state.dev_mode
  };
}
export default connect(mapStateToProps)(PageDev);