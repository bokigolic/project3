import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

// widget for collapsing or expanding content

const Collapsible = (props) => {

  let cl_opened = '';
  if (props.expanded === true) {
    cl_opened = ' opened';
  } else {
    cl_opened = ' closed';
  }

  let jsxTitle = (
    <h2>{props.title}</h2>
  );
  if (props.level === 3) {
    jsxTitle = (
      <h3>{props.title}</h3>
    );
  }

  return (
    <>
      <div className={"widget-collapsible " + cl_opened}>
        <div className="triangle" onClick={props.handleClick}>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
        <div className="widget-collapsible-header" onClick={props.handleClick}>
          {jsxTitle}
        </div>
        <div className="widget-collapsible-body">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Collapsible;