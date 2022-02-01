import { connect } from "react-redux";
import { actionRouteSet } from "../redux/actions";
import { nav_keys } from "../utils/ischool-utils";
import NavOption from "./NavOption";

const Nav = (props) => {
  const dispatch = props.dispatch;
  const route_key = props.route_key;

  const _click_nav = (api_key) => {
    dispatch(actionRouteSet(api_key));
  };

  const nav_keys_prepared = [...nav_keys, 'DEV'];

  let jsxNavOptions = nav_keys_prepared.map((api_key) => {
    return (
      <NavOption
        key={api_key}
        active={api_key === route_key}
        handleClick={(e) => { _click_nav(api_key) }}
        title={api_key}
      />
    );
  });

  return (
    <>
      <nav>
        {jsxNavOptions}
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    route_key: state.route_key
  };
}
export default connect(mapStateToProps)(Nav);