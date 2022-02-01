import { _get_instruction, _get_my_apikey } from "../utils/ischool-utils";
import { js_utils } from "../utils/js-utils";
import UniversalContentObj from "./UniversalContentObj";
import UniversalContentArr from './UniversalContentArr';
import UniversalContentKeyVal from './UniversalContentKeyVal';
import WidgetCollapsibleObj from "./WidgetCollapsibleObj";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";
import WidgetUniversalTableArrayOfObjectsDisplay from "./WidgetUniversalTableArrayOfObjectsDisplay";
import WidgetUniversalArrayOfStringsDisplay from "./WidgetUniversalArrayOfStringsDisplay";
import WidgetCollapsibleArr from "./WidgetCollapsibleArr";
import WidgetOnlyNewsDisplay from "./WidgetOnlyNewsDisplay";
import WidgetOnlyPeopleDisplay from "./WidgetOnlyPeopleDisplay";
import WidgetOnlyAboutDisplay from "./WidgetOnlyAboutDisplay";
import WidgetOnlyCoursesDisplay from "./WidgetOnlyCoursesDisplay";
import WidgetOnlyMinorsDisplay from "./WidgetOnlyMinorsDisplay";
import WidgetOnlyResearchDisplay from "./WidgetOnlyResearchDisplay";
import WidgetOnlyEmploymentDisplay from "./WidgetOnlyEmploymentDisplay";
import WidgetOnlyResourcesDisplay from "./WidgetOnlyResourcesDisplay";
import WidgetOnlyDegreesDisplay from "./WidgetOnlyDegreesDisplay";

const UniversalContentRouter = (props) => {
  const apicrumbs = props.apicrumbs;
  const item = props.data;
  const _instructions = _get_instruction(apicrumbs);
  const _widget = _instructions._widget; // hat widget will be used for displaying this data
  const k = _get_my_apikey(apicrumbs);

  // display data

  let dev_mode_disabled = true;
  if (props.dev_mode === true) {
    dev_mode_disabled = false;
  }

  let jsxContent = null;

  if (item !== null) {
    //
    // console.log('*****')
    // console.log(apicrumbs)
    // console.log(k)
    // console.log(_widget)
    // console.log(item)
    if (_widget === 'COLLAPSIBLE' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetCollapsibleObj data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'COLLAPSIBLE_ARRAY' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetCollapsibleArr data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'UNI_ARTICLE' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetUniversalArticleObjDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'AOO_TABLE' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetUniversalTableArrayOfObjectsDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ARRAY_OF_STRINGS' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetUniversalArrayOfStringsDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_ABOUT' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyAboutDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_PEOPLE' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyPeopleDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_COURSES' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyCoursesDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_MINORS' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyMinorsDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_RESEARCH' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyResearchDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_NEWS' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyNewsDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_EMPLOYMENT' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyEmploymentDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_RESOURCES' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyResourcesDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );
    } else if (_widget === 'ONLY_DEGREES' && dev_mode_disabled) {
      jsxContent = (
        <div key={k} className="uni-content-smart">
          <p className="dev-info">WIDGET {_widget}</p>
          <WidgetOnlyDegreesDisplay data={item} apicrumbs={apicrumbs} />
        </div>
      );



    } else if (js_utils.is_object(item)) {
      jsxContent = (
        <div className="uni-content-obj-item">
          <h4>{k}</h4>
          <UniversalContentObj data={item} apicrumbs={apicrumbs} dev_mode={props.dev_mode} />
        </div>
      );
    } else if (js_utils.is_array(item)) {
      // arr content
      jsxContent = (
        <div className="uni-content-smart">
          <h4>{k}</h4>
          <UniversalContentArr arr={item} apicrumbs={apicrumbs} dev_mode={props.dev_mode} />
        </div>
      );
    } else if (js_utils.is_string(item) || js_utils.is_number(item)) {
      // string content
      jsxContent = (
        <UniversalContentKeyVal k={k} v={item} apicrumbs={apicrumbs} />
      );
    }
  }

  return (
    <>
      {jsxContent}
    </>
  );
}

export default UniversalContentRouter;