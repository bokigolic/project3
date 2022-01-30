import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";

const WidgetOnlyAboutDisplay = (props) => {

  let jsxContent = (
    <WidgetUniversalArticleObjDisplay data={props.data} />
  );

  return (
    <div className="page-content" >
      <h1>About</h1>
      {jsxContent}
    </div>
  );
};

export default WidgetOnlyAboutDisplay;