import { js_utils } from "../utils/js-utils";
import WidgetUniversalArrayOfStringsDisplay from "./WidgetUniversalArrayOfStringsDisplay";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";
import WidgetUniversalTableArrayOfObjectsDisplay from "./WidgetUniversalTableArrayOfObjectsDisplay";

const WidgetOnlyEmploymentDisplay = (props) => {

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let item = {};
  if (js_utils.is_object(props.data)) {
    item = props.data;
  }


  let jsx = {};

  // 1
  let jsxTemp1 = item.introduction.content.map((item, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={item} />
    );
  });
  jsx.introduction = (
    <>
      <h2>{item.introduction.title}</h2>
      {jsxTemp1}
    </>
  );

  // 2
  let jsxTemp2 = (
    <WidgetUniversalTableArrayOfObjectsDisplay data={item.degreeStatistics.statistics} />
  );
  jsx.degreeStatistics = (
    <>
      <h2>{item.degreeStatistics.title}</h2>
      {jsxTemp2}
    </>
  );

  // 3
  let jsxTemp3 = (
    <WidgetUniversalArrayOfStringsDisplay data={item.employers.employerNames} />
  );
  jsx.employers = (
    <>
      <h2>{item.employers.title}</h2>
      {jsxTemp3}
    </>
  );

  // 4
  let jsxTemp4 = (
    <WidgetUniversalArrayOfStringsDisplay data={item.careers.careerNames} />
  );
  jsx.careers = (
    <>
      <h2>{item.careers.title}</h2>
      {jsxTemp4}
    </>
  );

  // 5
  let jsxTemp5 = (
    <WidgetUniversalTableArrayOfObjectsDisplay data={item.coopTable.coopInformation} />
  );
  jsx.coopTable = (
    <>
      <h2>{item.coopTable.title}</h2>
      {jsxTemp5}
    </>
  );

  // 6
  let jsxTemp6 = (
    <WidgetUniversalTableArrayOfObjectsDisplay data={item.employmentTable.professionalEmploymentInformation} />
  );
  jsx.employmentTable = (
    <>
      <h2>{item.employmentTable.title}</h2>
      {jsxTemp6}
    </>
  );


  return (
    <div className="page-content" >
      <h1>Employment</h1>
      {jsx.introduction}
      {jsx.degreeStatistics}
      {jsx.employers}
      {jsx.careers}
      {jsx.coopTable}
      {jsx.employmentTable}
    </div>
  );
};

export default WidgetOnlyEmploymentDisplay;