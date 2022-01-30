import { useExpandOnlyOneCollapsible } from "../hooks/useExpandOnlyOneCollapsible";
import Collapsible from "./Collapsible";
import WidgetUniversalArrayOfStringsDisplay from "./WidgetUniversalArrayOfStringsDisplay";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";

const WidgetOnlyDegreesDisplay = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();
  const [expandedKeys2, handleExpandClick2] = useExpandOnlyOneCollapsible();

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let arr = [];
  let arr2 = [];
  if (props.data && Array.isArray(props.data.undergraduate)) {
    arr = props.data.undergraduate;
  }
  if (props.data && Array.isArray(props.data.graduate)) {
    arr2 = props.data.graduate;
  }

  let jsxArr = null;
  let jsxArr2 = null;

  jsxArr = arr.map((item, index) => {
    const k = index;
    const article_data = {
      // title: item.title,
      degreeName: item.degreeName,
      description: item.description
    };
    const title = item.title;
    return (
      <Collapsible key={k} title={title} level={3} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <WidgetUniversalArticleObjDisplay data={article_data} />
        <h4>Concentrations:</h4>
        <WidgetUniversalArrayOfStringsDisplay data={item.concentrations} />
      </Collapsible>
    );
  });

  jsxArr2 = arr2.map((item, index) => {
    const k = index;
    let article_data = {
      // title: item.title,
      degreeName: item.degreeName,
      description: item.description
    };
    let title = item.title;
    let sub_arr_title = 'Concentrations';
    let sub_arr_key = 'concentrations';
    if (Array.isArray(item.availableCertificates)) {
      sub_arr_title = 'Available Certificates';
      sub_arr_key = 'availableCertificates';
      article_data = {
        degreeName: item.degreeName
      };
      // title = item.degreeName;
      title = 'Graduate Advanced Certificates';
    }
    return (
      <Collapsible key={k} title={title} level={3} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        <WidgetUniversalArticleObjDisplay data={article_data} />
        <h4>{sub_arr_title}:</h4>
        <WidgetUniversalArrayOfStringsDisplay data={item[sub_arr_key]} />
      </Collapsible>
    );
  });


  return (
    <div className="page-content" >
      <h1>Degrees</h1>

      <Collapsible key={1} title={'Undergraduate'} expanded={expandedKeys2['undergraduate']} handleClick={(e) => { handleExpandClick2('undergraduate') }} >
        <div className="indent">
          {jsxArr}
        </div>
      </Collapsible>
      <Collapsible key={2} title={'Graduate'} expanded={expandedKeys2['graduate']} handleClick={(e) => { handleExpandClick2('graduate') }} >
        <div className="indent">
          {jsxArr2}
        </div>
      </Collapsible>

    </div>
  );
};

export default WidgetOnlyDegreesDisplay;