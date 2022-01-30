import { useExpandOnlyOneCollapsible } from "../hooks/useExpandOnlyOneCollapsible";
import Collapsible from "./Collapsible";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";
import WidgetUniversalTableArrayOfObjectsDisplay from "./WidgetUniversalTableArrayOfObjectsDisplay";

const WidgetOnlyPeopleDisplay = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();

  const data = props.data;

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let data1 = {};
  let data2_1 = {};
  let data2_2 = {};

  if (data.title) {
    data1.title = data.title;
  }
  if (data.title) {
    data1.subTitle = data.subTitle;
  }

  if (data.faculty) {
    data2_1 = data.faculty;
  }
  if (data.staff) {
    data2_2 = data.staff;
  }

  return (
    <div className="page-content" >
      <h1>People</h1>
      <WidgetUniversalArticleObjDisplay data={data1} />

      <Collapsible key={1} title={'Faculty'} expanded={expandedKeys['faculty']} handleClick={(e) => { handleExpandClick('faculty') }} >
        <WidgetUniversalTableArrayOfObjectsDisplay data={data2_1} />
      </Collapsible>
      <Collapsible key={2} title={'Staff'} expanded={expandedKeys['staff']} handleClick={(e) => { handleExpandClick('staff') }} >
        <WidgetUniversalTableArrayOfObjectsDisplay data={data2_2} />
      </Collapsible>

    </div>
  );
}

export default WidgetOnlyPeopleDisplay;