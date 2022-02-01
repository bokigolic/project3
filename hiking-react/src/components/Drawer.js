import { connect } from 'react-redux';
import { actionDrawerClose } from '../redux/actions';
import Nav from './Nav';

const Drawer = (props) => {
  const dispatch = props.dispatch;

  const _click_close = () => {
    dispatch(actionDrawerClose());
  };

  return (
    <div className="drawer text-nowrap">
      <div className="drawer-close" onClick={_click_close}>×</div>
      <div className="pad">
        <Nav />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    drawer_opened: state.drawer_opened
  };
}
export default connect(mapStateToProps)(Drawer);
