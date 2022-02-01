import { useExpandOnlyOneCollapsible } from "../hooks/useExpandOnlyOneCollapsible";
import Collapsible from "./Collapsible";
import WidgetUniversalArrayOfStringsDisplay from "./WidgetUniversalArrayOfStringsDisplay";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";

const WidgetOnlyResearchDisplay = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();
  const [expandedKeys2, handleExpandClick2] = useExpandOnlyOneCollapsible();

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let arr = [];
  let arr2 = [];
  if (props.data && Array.isArray(props.data.byInterestArea)) {
    arr = props.data.byInterestArea;
  }
  if (props.data && Array.isArray(props.data.byFaculty)) {
    arr2 = props.data.byFaculty;
  }

  let jsxArr = null;
  let jsxArr2 = null;

  jsxArr = arr.map((item, index) => {
    const k = index;
    const article_data = {
      areaName: item.areaName,
      facultyName: item.facultyName,
      username: item.username
    };
    const title = item.areaName;
    return (
      <Collapsible key={k} title={title} level={3} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <WidgetUniversalArticleObjDisplay data={article_data} />
        <h4>Citations:</h4>
        <WidgetUniversalArrayOfStringsDisplay data={item.citations} />
      </Collapsible>
    );
  });

  jsxArr2 = arr2.map((item, index) => {
    const k = index;
    const article_data = {
      areaName: item.areaName,
      facultyName: item.facultyName,
      username: item.username
    };
    const title = item.facultyName;
    return (
      <Collapsible key={k} title={title} level={3} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <WidgetUniversalArticleObjDisplay data={article_data} />
        <h4>Citations:</h4>
        <WidgetUniversalArrayOfStringsDisplay data={item.citations} />
      </Collapsible>
    );
  });


  return (
    <div className="page-content" >
      <h1>Research</h1>

      <Collapsible key={1} title={'Research by interest area'} expanded={expandedKeys2['byInterestArea']} handleClick={(e) => { handleExpandClick2('byInterestArea') }} >
        <div className="indent">
          {jsxArr}
        </div>
      </Collapsible>
      <Collapsible key={2} title={'Research by faculty'} expanded={expandedKeys2['byFaculty']} handleClick={(e) => { handleExpandClick2('byFaculty') }} >
        <div className="indent">
          {jsxArr2}
        </div>
      </Collapsible>

    </div>
  );
};

export default WidgetOnlyResearchDisplay;