import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useFetchGetMethod } from "../hooks/useFetchGetmethod";
import { api_url_make } from "../utils/ischool-utils";
import SpinnerInline from "./SpinnerInline";
import UniversalContentRouter from './UniversalContentRouter';

// universal componentfor fetching API data

const UniversalContentAjax = (props) => {
  const apikey = props.apikey;
  const apicrumbs = [apikey];
  const api_url = api_url_make([apikey]);

  const [fetching, data, failed] = useFetchGetMethod(api_url, props.freshness); // custom hook

  let jsxSpinner = (
    <SpinnerInline />
  );

  let jsxContent = null;
  if (fetching === false) {
    jsxSpinner = null;
    if (failed === true) {
      jsxContent = (
        <FontAwesomeIcon icon={faExclamationTriangle} />
      );
    } else {
      // display data
      // after data is fetched, router component will decide what component will display it
      jsxContent = (
        <UniversalContentRouter data={data} apicrumbs={apicrumbs} dev_mode={props.dev_mode} />
      );
    }
  }

  return (
    <div className="uni-content-ajax">
      <h4 className="dev-info">UniversalContentAjax - apikey: {apikey}</h4>
      {jsxContent}
      {jsxSpinner}
    </div>
  );
}

export default UniversalContentAjax;