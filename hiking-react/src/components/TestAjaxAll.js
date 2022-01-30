import { api_root_keys } from "../utils/ischool-utils";
import UniversalContentAjax from "./UniversalContentAjax";

// Fetch allAPI-s and display fetched data using universal widgets

const TestAjaxAll = (props) => {
  let jsxContent = api_root_keys.map((apikey) => {
    const apicrumbs = [apikey];
    return (
      <UniversalContentAjax key={apikey} apikey={apikey} apicrumbs={apicrumbs} freshness={props.freshness} dev_mode={true} />
    );
  });

  return (
    <div className="test-ajax-all" >
      {jsxContent}
    </div >
  );
}

export default TestAjaxAll;