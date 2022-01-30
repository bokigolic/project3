import { apicrumbs_string_make } from "../utils/ischool-utils";

// displaying API path

const ApicrumbsDisplay = (props) => {
  let apicrumbs_string = apicrumbs_string_make(props.apicrumbs);
  return (
    <div className="dev-apicrumbs-display">apicrumbs: <b>{apicrumbs_string}</b></div>
  );
};

export default ApicrumbsDisplay;