import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useFetchGetMethod } from "../hooks/useFetchGetmethod";
import { api_url_course_make } from "../utils/ischool-utils";
import SpinnerInline from "./SpinnerInline";
import WidgetUniversalArticleObjDisplay from './WidgetUniversalArticleObjDisplay';

// Component that fetching courses based on courseID

const WidgetCoursesItemAjax = (props) => {
  const courseID = props.courseID;
  const api_url = api_url_course_make(courseID);
  const [fetching, data, failed] = useFetchGetMethod(api_url); // custom hook

  let jsxSpinner = (
    <div>
      <i>courseID: {courseID}</i>
      <SpinnerInline />
    </div>
  );

  let jsxContent = null;
  if (fetching === false) {
    jsxSpinner = null;
    if (failed === true) {
      jsxContent = (
        <div>
          <i>courseID: {courseID}</i>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      );
    } else {
      // display data
      if (data !== null) {
        jsxContent = (
          <WidgetUniversalArticleObjDisplay data={data} />
        );
      }
    }
  }

  return (
    <div className="arr-courses-item">
      {jsxContent}
      {jsxSpinner}
    </div>
  );
};

export default WidgetCoursesItemAjax;