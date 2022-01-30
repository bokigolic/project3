import { useExpandOnlyOneCollapsible } from "../hooks/useExpandOnlyOneCollapsible";
import Collapsible from "./Collapsible";
import WidgetCoursesItemAjax from "./WidgetCoursesItemAjax";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";

const WidgetOnlyMinorsDisplay = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let arr = [];
  if (props.data && Array.isArray(props.data.UgMinors)) {
    arr = props.data.UgMinors;
  }

  let jsxArr = null;
  jsxArr = arr.map((item, index) => {
    const k = index;
    const article_data = {
      name: item.name,
      title: item.title,
      description: item.description
    };

    const title = item.name;
    let jsxCourses = item.courses.map((id, index) => {
      return (
        <WidgetCoursesItemAjax key={index} courseID={id} />
      );
    });
    return (
      <Collapsible key={k} title={title} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <WidgetUniversalArticleObjDisplay data={article_data} />
        <h4>Courses:</h4>
        <div className="indent">
          {jsxCourses}
        </div>
      </Collapsible>
    );
  });


  return (
    <div className="page-content" >
      <h1>Minors</h1>
      {jsxArr}
    </div>
  );
};

export default WidgetOnlyMinorsDisplay;