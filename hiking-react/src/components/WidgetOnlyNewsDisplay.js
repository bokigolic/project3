import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";

const WidgetOnlyNewsDisplay = (props) => {

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let arr = [];
  if (Array.isArray(props.data.year)) {
    arr = props.data.year;
  }
  let arr2 = [];
  if (Array.isArray(props.data.older)) {
    arr2 = props.data.older;
  }

  let jsxYear = null;
  let jsxOlder = null;

  jsxYear = arr.map((item, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={item} apicrumbs={props.apicrumbs} />
    );
  });

  jsxOlder = arr2.map((item, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={item} apicrumbs={props.apicrumbs} />
    );
  });

  return (
    <div className="page-content" >
      <h1>News</h1>
      {jsxYear}
      <h2>More than a year old</h2>
      {jsxOlder}
    </div>
  );
};

export default WidgetOnlyNewsDisplay;