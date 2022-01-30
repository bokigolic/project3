import { useExpandOnlyOneCollapsible } from "../hooks/useExpandOnlyOneCollapsible";
import Collapsible from "./Collapsible";
import WidgetCoursesItemAjax from "./WidgetCoursesItemAjax";

const WidgetOnlyCoursesDisplay = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let arr = [];
  if (Array.isArray(props.data)) {
    arr = props.data;
  }

  let jsxArr = null;
  jsxArr = arr.map((item, index) => {
    const k = index;
    const title = item.degreeName + ' degree';
    let jsxCourses = item.courses.map((id, index) => {
      return (
        <WidgetCoursesItemAjax key={index} courseID={id} />
      );
    });
    return (
      <Collapsible key={k} title={title} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <h3>Courses offered by the {item.degreeName} degree. </h3>
        <h4>Semester: {item.semester}</h4>
        <div className="indent">
          {jsxCourses}
        </div>
      </Collapsible>
    );
  });


  return (
    <div className="page-content" >
      <h1>Courses</h1>
      {jsxArr}
    </div>
  );
};

export default WidgetOnlyCoursesDisplay;