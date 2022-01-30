import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import UniversalContentAjax from "./UniversalContentAjax";
import Footer from "./Footer";
import PageDev from "./PageDev";
import Drawer from "./Drawer";
import { actionDrawerToggle } from "../redux/actions";

// displaying layoutof website

const Website = (props) => {
  const dispatch = props.dispatch;
  // const dispatch = props.dispatch;
  const route_key = props.route_key;

  let jsxBody = null;
  if (route_key === 'DEV') {
    jsxBody = (
      <PageDev />
    );
  } else {
    const apikey = route_key;
    jsxBody = (
      <UniversalContentAjax key={apikey} apikey={apikey} freshness={props.route_freshness} />
    );
  }

  let cl_dev_mode = '';
  if (props.dev_mode === true) {
    cl_dev_mode = ' dev-mode';
  }

  let cl_drawer = '';
  if (props.drawer_opened === true) {
    cl_drawer = ' drawer-opened';
  }

  const _click_hamburger = () => {
    dispatch(actionDrawerToggle());
  };

  return (
    <>
      <div className={"wrapper " + cl_dev_mode + cl_drawer}>
        <Drawer />
        <header className="header">
          <div className="fix-drawer-push"></div>
          <div className="menu-icon" onClick={_click_hamburger}><FontAwesomeIcon icon={faBars} /></div>
          <div className="logo-title">iSchool React App</div>
          <div className="flex-1"></div>
        </header>
        <div className="main">
          <div className="fix-header-push"></div>
          <div className="centering-widget">
            <div className="flex-1"></div>
            <div className="main-content">
              {jsxBody}
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        <Footer />
        <a href="#" className="btn-scroll-to-top"><FontAwesomeIcon icon={faAngleDoubleUp} /></a>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    route_key: state.route_key,
    route_freshness: state.route_freshness,
    drawer_opened: state.drawer_opened,
    dev_mode: state.dev_mode
  };
}
export default connect(mapStateToProps)(Website);